import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import DefaultAvatar from '../components/DefaultAvatar';

// Mock data for community features
const mockPosts = [
  {
    _id: '1',
    title: 'Best practices for poultry vaccination in monsoon season?',
    content: 'I am facing challenges with vaccination schedules during heavy rains. My chickens seem to get stressed and I\'m worried about the effectiveness. Any experienced farmers here who can share their monsoon vaccination strategies?',
    category: 'question',
    tags: ['vaccination', 'monsoon', 'poultry', 'health'],
    author: {
      _id: 'user1',
      fullName: 'Rajesh Kumar',
      role: 'farmer',
      avatar: null,
      isVerified: false,
      location: { state: 'Maharashtra', district: 'Pune' }
    },
    likes: ['user2', 'user3'],
    comments: [
      {
        _id: 'comment1',
        author: {
          fullName: 'Dr. Priya Sharma',
          role: 'veterinarian',
          avatar: null,
          isVerified: true
        },
        content: 'During monsoon, maintain dry vaccination areas and consider timing vaccines before rain forecasts. Also ensure proper ventilation.',
        createdAt: '2024-09-28T10:30:00Z'
      }
    ],
    createdAt: '2024-09-29T08:15:00Z',
    location: { state: 'Maharashtra', district: 'Pune' }
  },
  {
    _id: '2',
    title: 'Organic pest control methods that actually work',
    content: 'After years of trial and error, I\'ve found these organic methods to be most effective: Neem oil spray, companion planting with marigolds, and introducing beneficial insects. Here\'s my detailed experience...',
    category: 'blog',
    tags: ['organic', 'pest-control', 'sustainable', 'farming'],
    author: {
      _id: 'user4',
      fullName: 'Anita Desai',
      role: 'expert',
      avatar: null,
      isVerified: true,
      location: { state: 'Gujarat', district: 'Ahmedabad' }
    },
    likes: ['user1', 'user5', 'user6'],
    comments: [],
    createdAt: '2024-09-28T14:20:00Z',
    location: { state: 'Gujarat', district: 'Ahmedabad' }
  },
  {
    _id: '3',
    title: 'New Government Scheme for Small Farmers - Apply Now',
    content: 'The Ministry of Agriculture has launched a new subsidy scheme for small and marginal farmers. Eligible farmers can get up to ₹50,000 for farm equipment. Application deadline is October 15th, 2024.',
    category: 'announcement',
    tags: ['government', 'subsidy', 'scheme', 'deadline'],
    author: {
      _id: 'user7',
      fullName: 'Agricultural Officer Delhi',
      role: 'authority',
      avatar: null,
      isVerified: true,
      location: { state: 'Delhi', district: 'New Delhi' }
    },
    likes: ['user1', 'user2', 'user4', 'user8'],
    comments: [
      {
        _id: 'comment2',
        author: {
          fullName: 'Suresh Patel',
          role: 'farmer',
          avatar: null,
          isVerified: false
        },
        content: 'Thank you for sharing this! Where can I find the application form?',
        createdAt: '2024-09-28T16:45:00Z'
      }
    ],
    createdAt: '2024-09-28T12:00:00Z',
    location: { state: 'Delhi', district: 'New Delhi' }
  }
];

const mockExperts = [
  {
    _id: 'expert1',
    fullName: 'Dr. Priya Sharma',
    role: 'veterinarian',
    bio: 'Specialized in poultry and livestock health with 15+ years of experience. Available for consultations on animal diseases, vaccination schedules, and preventive care.',
    location: { state: 'Maharashtra', city: 'Pune' },
    specialization: 'Poultry Health & Diseases',
    experience: 15,
    isVerified: true,
    avatar: null
  },
  {
    _id: 'expert3',
    fullName: 'Agricultural Officer Rajasthan',
    role: 'authority',
    bio: 'Government agricultural extension officer. Helps farmers with government schemes, subsidies, and policy implementation. Expert in rural development programs.',
    location: { state: 'Rajasthan', city: 'Jaipur' },
    specialization: 'Government Schemes & Rural Development',
    experience: 12,
    isVerified: true,
    avatar: null
  },
  {
    _id: 'expert4',
    fullName: 'Dr. Lakshmi Nair',
    role: 'veterinarian',
    bio: 'Dairy cattle specialist with expertise in nutrition, breeding, and herd management. Conducted workshops across South India on modern dairy farming.',
    location: { state: 'Kerala', city: 'Kochi' },
    specialization: 'Dairy Cattle & Nutrition',
    experience: 18,
    isVerified: true,
    avatar: null
  }
];

const mockConnections = [
  {
    _id: 'conn1',
    status: 'pending',
    requester: { _id: 'expert1' },
    recipient: { _id: 'currentUser' },
    message: 'Hello! I saw your question about poultry vaccination. I\'d like to connect and help with any animal health queries.',
    connectedUser: {
      _id: 'expert1',
      fullName: 'Dr. Priya Sharma',
      role: 'veterinarian',
      avatar: null,
      isVerified: true,
      location: { state: 'Maharashtra' }
    },
    isRequester: false,
    createdAt: '2024-09-29T09:00:00Z'
  }
];

const CommunityPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState(mockPosts);
  const [experts, setExperts] = useState(mockExperts);
  const [connections, setConnections] = useState(mockConnections);
  const [loading, setLoading] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    state: '',
    role: 'all'
  });

  // Filter posts based on current filters
  const filterPosts = () => {
    let filteredPosts = [...mockPosts];
    
    if (filters.category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === filters.category);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.state) {
      filteredPosts = filteredPosts.filter(post => 
        post.location?.state?.toLowerCase().includes(filters.state.toLowerCase())
      );
    }
    
    return filteredPosts;
  };

  // Filter experts based on current filters
  const filterExperts = () => {
    let filteredExperts = [...mockExperts];
    
    if (filters.role !== 'all') {
      filteredExperts = filteredExperts.filter(expert => expert.role === filters.role);
    }
    
    if (filters.state) {
      filteredExperts = filteredExperts.filter(expert => 
        expert.location?.state?.toLowerCase().includes(filters.state.toLowerCase())
      );
    }
    
    return filteredExperts;
  };

  useEffect(() => {
    // Simulate loading when filters change
    setLoading(true);
    setTimeout(() => {
      if (activeTab === 'posts') {
        setPosts(filterPosts());
      } else if (activeTab === 'experts') {
        setExperts(filterExperts());
      }
      setLoading(false);
    }, 300);
  }, [activeTab, filters]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Hub</h1>
          <p className="text-gray-600">Connect with fellow farmers, experts, and authorities</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {[
                { id: 'posts', label: 'Community Posts', icon: '📝' },
                { id: 'experts', label: 'Find Experts', icon: '👨‍⚕️' },
                { id: 'connections', label: 'My Network', icon: '🤝' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <PostsTab
            posts={posts}
            filters={filters}
            setFilters={setFilters}
            showCreatePost={showCreatePost}
            setShowCreatePost={setShowCreatePost}
            onPostCreated={() => {}} // Mock function
            loading={loading}
          />
        )}

        {/* Experts Tab */}
        {activeTab === 'experts' && (
          <ExpertsTab
            experts={experts}
            filters={filters}
            setFilters={setFilters}
            loading={loading}
          />
        )}

        {/* Connections Tab */}
        {activeTab === 'connections' && (
          <ConnectionsTab
            connections={connections}
            onConnectionUpdate={() => {}} // Mock function
          />
        )}
      </div>
    </DashboardLayout>
  );
};

// Posts Tab Component
const PostsTab = ({ posts, filters, setFilters, showCreatePost, setShowCreatePost, onPostCreated, loading }) => {
  return (
    <div className="space-y-6">
      {/* Filters and Create Post */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search posts..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Categories</option>
            <option value="question">Questions</option>
            <option value="blog">Blog Posts</option>
            <option value="discussion">Discussions</option>
            <option value="announcement">Announcements</option>
          </select>
          <input
            type="text"
            placeholder="State (e.g., Maharashtra)"
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={() => setShowCreatePost(true)}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Create Post
          </button>
        </div>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
          {posts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No posts found. Be the first to share something!
            </div>
          )}
        </div>
      )}

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal
          onClose={() => setShowCreatePost(false)}
          onPostCreated={onPostCreated}
        />
      )}
    </div>
  );
};

// Experts Tab Component
const ExpertsTab = ({ experts, filters, setFilters, loading }) => {
  const sendConnectionRequest = (expertId) => {
    // Mock connection request
    alert(`Connection request sent to expert ${expertId}! (This is a demo)`);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Experts</option>
            <option value="veterinarian">Veterinarians</option>
            <option value="authority">Government Authorities</option>
            <option value="expert">Agricultural Experts</option>
          </select>
          <input
            type="text"
            placeholder="State (e.g., Maharashtra)"
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Experts Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <ExpertCard
              key={expert._id}
              expert={expert}
              onConnect={() => sendConnectionRequest(expert._id)}
            />
          ))}
          {experts.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No experts found with the current filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Connections Tab Component
const ConnectionsTab = ({ connections, onConnectionUpdate }) => {
  const respondToConnection = (connectionId, action) => {
    // Mock connection response
    alert(`${action === 'accept' ? 'Accepted' : 'Declined'} connection request! (This is a demo)`);
    // In real app, this would update the connections state
  };

  const pendingConnections = connections.filter(c => c.status === 'pending' && !c.isRequester);
  const acceptedConnections = connections.filter(c => c.status === 'accepted');

  return (
    <div className="space-y-6">
      {/* Pending Requests */}
      {pendingConnections.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Pending Connection Requests</h3>
          <div className="space-y-4">
            {pendingConnections.map((connection) => (
              <div key={connection._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  {connection.connectedUser.avatar ? (
                    <img
                      src={connection.connectedUser.avatar}
                      alt={connection.connectedUser.fullName}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <DefaultAvatar name={connection.connectedUser.fullName} size={48} />
                  )}
                  <div>
                    <h4 className="font-medium">{connection.connectedUser.fullName}</h4>
                    <p className="text-sm text-gray-600 capitalize">{connection.connectedUser.role}</p>
                    {connection.message && (
                      <p className="text-sm text-gray-500 mt-1">"{connection.message}"</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => respondToConnection(connection._id, 'accept')}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => respondToConnection(connection._id, 'reject')}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accepted Connections */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">My Network ({acceptedConnections.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {acceptedConnections.map((connection) => (
            <div key={connection._id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={connection.connectedUser.avatar || '/default-avatar.png'}
                  alt={connection.connectedUser.fullName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{connection.connectedUser.fullName}</h4>
                  <p className="text-sm text-gray-600 capitalize">{connection.connectedUser.role}</p>
                  {connection.connectedUser.location?.state && (
                    <p className="text-xs text-gray-500">{connection.connectedUser.location.state}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {acceptedConnections.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No connections yet. Start networking by connecting with experts!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Individual Components
const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);

  const toggleLike = () => {
    // Mock like functionality
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      question: 'bg-blue-100 text-blue-800',
      blog: 'bg-green-100 text-green-800',
      discussion: 'bg-purple-100 text-purple-800',
      announcement: 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {post.author?.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author?.fullName}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <DefaultAvatar name={post.author?.fullName} size={40} />
          )}
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-medium">{post.author?.fullName}</h4>
              {post.author?.isVerified && (
                <span className="text-blue-500">✓</span>
              )}
            </div>
            <p className="text-sm text-gray-600 capitalize">{post.author?.role}</p>
            <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-700 mb-3">{post.content}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLike}
            className={`flex items-center space-x-1 text-sm ${
              liked ? 'text-red-600' : 'text-gray-600'
            } hover:text-red-600 transition-colors`}
          >
            <span>{liked ? '❤️' : '🤍'}</span>
            <span>{likes}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-teal-600 transition-colors"
          >
            <span>💬</span>
            <span>{post.comments?.length || 0}</span>
          </button>
        </div>
        {post.location?.state && (
          <span className="text-xs text-gray-500">📍 {post.location.state}</span>
        )}
      </div>

      {/* Comments */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="space-y-3">
            {post.comments?.map((comment, index) => (
              <div key={index} className="flex space-x-3">
                {comment.author?.avatar ? (
                  <img
                    src={comment.author.avatar}
                    alt={comment.author?.fullName}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <DefaultAvatar name={comment.author?.fullName} size={32} />
                )}
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{comment.author?.fullName}</span>
                      <span className="text-xs text-gray-500">{comment.author?.role}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{new Date(comment.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ExpertCard = ({ expert, onConnect }) => {
  const getRoleIcon = (role) => {
    const icons = {
      veterinarian: '👨‍⚕️',
      authority: '🏛️',
      expert: '🌾'
    };
    return icons[role] || '👤';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-4 mb-4">
        {expert.avatar ? (
          <img
            src={expert.avatar}
            alt={expert.fullName}
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <DefaultAvatar name={expert.fullName} size={64} />
        )}
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">{expert.fullName}</h3>
            {expert.isVerified && <span className="text-blue-500">✓</span>}
          </div>
          <p className="text-sm text-gray-600 flex items-center">
            <span className="mr-1">{getRoleIcon(expert.role)}</span>
            {expert.role.charAt(0).toUpperCase() + expert.role.slice(1)}
          </p>
          {expert.experience && (
            <p className="text-xs text-gray-500">{expert.experience} years experience</p>
          )}
        </div>
      </div>

      {expert.specialization && (
        <p className="text-sm text-gray-700 mb-3">
          <strong>Specialization:</strong> {expert.specialization}
        </p>
      )}

      {expert.bio && (
        <p className="text-sm text-gray-600 mb-4">{expert.bio}</p>
      )}

      {expert.location && (
        <p className="text-xs text-gray-500 mb-4 flex items-center">
          <span className="mr-1">📍</span>
          {expert.location.city && `${expert.location.city}, `}
          {expert.location.state}
        </p>
      )}

      <button
        onClick={onConnect}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
      >
        Connect
      </button>
    </div>
  );
};

const CreatePostModal = ({ onClose, onPostCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'question',
    tags: '',
    location: { state: '', district: '' }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock post creation
    alert('Post created successfully! (This is a demo)');
    onClose();
    // In real app, this would add the post to the list
    if (onPostCreated) onPostCreated();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Create New Post</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="What's your post about?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="question">Question</option>
                <option value="blog">Blog Post</option>
                <option value="discussion">Discussion</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                required
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Share your thoughts, questions, or knowledge..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="e.g., poultry, disease, vaccination"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  value={formData.location.state}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    location: { ...formData.location, state: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Maharashtra"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                <input
                  type="text"
                  value={formData.location.district}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    location: { ...formData.location, district: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Pune"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;