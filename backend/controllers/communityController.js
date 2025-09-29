const Post = require('../models/postModel');
const User = require('../models/userModel');
const Connection = require('../models/connectionModel');

// Get all posts with filters
const getPosts = async (req, res) => {
  try {
    const { 
      category, 
      state, 
      district, 
      tags, 
      search, 
      page = 1, 
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (state) filter['location.state'] = state;
    if (district) filter['location.district'] = district;
    if (tags) filter.tags = { $in: tags.split(',') };
    if (search) {
      filter.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const posts = await Post.find(filter)
      .populate('author', 'fullName role avatar location isVerified')
      .populate('comments.author', 'fullName role avatar')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Post.countDocuments(filter);

    res.json({
      posts,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, category, tags, location, images } = req.body;
    
    const post = new Post({
      title,
      content,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      location,
      images: images || [],
      author: req.user.id
    });

    await post.save();
    await post.populate('author', 'fullName role avatar location isVerified');

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single post by ID
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'fullName role avatar location isVerified specialization experience')
      .populate('comments.author', 'fullName role avatar isVerified');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like/Unlike a post
const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(req.user.id);
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    res.json({ likes: post.likes.length, isLiked: likeIndex === -1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add comment to post
const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = {
      author: req.user.id,
      content,
      createdAt: new Date()
    };

    post.comments.push(comment);
    await post.save();
    await post.populate('comments.author', 'fullName role avatar isVerified');

    res.status(201).json(post.comments[post.comments.length - 1]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get experts/vets for networking
const getExperts = async (req, res) => {
  try {
    const { role, state, district, specialization, page = 1, limit = 10 } = req.query;
    
    const filter = {
      role: { $in: ['veterinarian', 'authority', 'expert'] }
    };
    
    if (role && role !== 'all') filter.role = role;
    if (state) filter['location.state'] = state;
    if (district) filter['location.district'] = district;
    if (specialization) filter.specialization = new RegExp(specialization, 'i');

    const skip = (page - 1) * limit;

    const experts = await User.find(filter)
      .select('fullName role bio location specialization experience isVerified avatar')
      .sort({ isVerified: -1, experience: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.json({
      experts,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send connection request
const sendConnectionRequest = async (req, res) => {
  try {
    const { recipientId, message } = req.body;
    
    if (recipientId === req.user.id) {
      return res.status(400).json({ message: 'Cannot connect to yourself' });
    }

    // Check if connection already exists
    const existingConnection = await Connection.findOne({
      $or: [
        { requester: req.user.id, recipient: recipientId },
        { requester: recipientId, recipient: req.user.id }
      ]
    });

    if (existingConnection) {
      return res.status(400).json({ message: 'Connection already exists' });
    }

    const connection = new Connection({
      requester: req.user.id,
      recipient: recipientId,
      message
    });

    await connection.save();
    await connection.populate('recipient', 'fullName role avatar');

    res.status(201).json(connection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user's connections
const getConnections = async (req, res) => {
  try {
    const { status = 'accepted' } = req.query;
    
    const connections = await Connection.find({
      $or: [
        { requester: req.user.id },
        { recipient: req.user.id }
      ],
      status
    })
    .populate('requester', 'fullName role avatar location isVerified')
    .populate('recipient', 'fullName role avatar location isVerified')
    .sort({ createdAt: -1 });

    // Format connections to show the other user
    const formattedConnections = connections.map(conn => {
      const otherUser = conn.requester._id.toString() === req.user.id 
        ? conn.recipient 
        : conn.requester;
      
      return {
        ...conn.toObject(),
        connectedUser: otherUser,
        isRequester: conn.requester._id.toString() === req.user.id
      };
    });

    res.json(formattedConnections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept/Reject connection request
const respondToConnection = async (req, res) => {
  try {
    const { connectionId, action } = req.body; // action: 'accept' or 'reject'
    
    const connection = await Connection.findById(connectionId);
    if (!connection) {
      return res.status(404).json({ message: 'Connection not found' });
    }

    if (connection.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    connection.status = action === 'accept' ? 'accepted' : 'rejected';
    await connection.save();

    res.json({ message: `Connection ${action}ed successfully` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  getPost,
  toggleLike,
  addComment,
  getExperts,
  sendConnectionRequest,
  getConnections,
  respondToConnection
};