const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const authMiddleware = require('../middlewares/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Posts routes
router.get('/posts', communityController.getPosts);
router.post('/posts', communityController.createPost);
router.get('/posts/:id', communityController.getPost);
router.post('/posts/:id/like', communityController.toggleLike);
router.post('/posts/:id/comments', communityController.addComment);

// Networking routes
router.get('/experts', communityController.getExperts);
router.post('/connections', communityController.sendConnectionRequest);
router.get('/connections', communityController.getConnections);
router.post('/connections/respond', communityController.respondToConnection);

module.exports = router;