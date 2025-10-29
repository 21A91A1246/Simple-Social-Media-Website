import express from 'express';
import multer from 'multer';
import path from 'path';
import auth from '../middleware/authMiddleware.js';
import Post from '../models/Post.js';

const router = express.Router();

// ✅ Setup multer for post images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/posts/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

/** Create post */
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Text required' });

    const imageUrl = req.file ? `/uploads/posts/${req.file.filename}` : null;

    const post = new Post({
      user: req.user.id,
      userName: req.user.name,
      text,
      imageUrl,
    });

    await post.save();
    res.json(post);
  } catch (e) {
    console.error('Error creating post:', e);
    res.status(500).send('Server error');
  }
});

/** Get all posts (with user info populated) */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name profilePic') // Fetch user details
      .sort({ createdAt: -1 });

    // Format posts for frontend
    const formattedPosts = posts.map((p) => ({
      _id: p._id,
      text: p.text,
      imageUrl: p.imageUrl ? p.imageUrl : null,
      createdAt: p.createdAt,
      likes: p.likes || [],
      likeCount: p.likes?.length || 0,
      liked:  false,
      comments: p.comments || [],
      overlayText: p.overlayText || '',
      userId: p.user?._id, // user id
      userName: p.user?.name || 'Unknown User',
      profilePic: p.user?.profilePic
        ? `http://localhost:5000${p.user.profilePic}`
        : null,
    }));

    res.json(formattedPosts);
  } catch (e) {
    console.error('Error fetching posts:', e);
    res.status(500).send('Server error');
  }
});


/** ✅ Get posts created by logged-in user */
router.get('/my-posts', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (e) {
    console.error('Error fetching user posts:', e);
    res.status(500).send('Server error');
  }
});

/** Edit post */
router.put('/edit/:id', auth, async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    if (text) post.text = text;
    if (imageUrl !== undefined) post.imageUrl = imageUrl;

    await post.save();
    res.json({ message: 'Post updated successfully', post });
  } catch (e) {
    console.error('Error updating post:', e);
    res.status(500).send('Server error');
  }
});

/** Delete post */
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (e) {
    console.error('Error deleting post:', e);
    res.status(500).send('Server error');
  }
});

/** ✅ Get liked posts (keep before /:id/like too!) */
router.get('/liked/me', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const likedPosts = await Post.find({ likes: userId }).sort({ createdAt: -1 });
    res.json(likedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/** ✅ Toggle like (must come last to avoid conflicts) */
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.user.id;
    const alreadyLiked = post.likes.some(id => id.toString() === userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({
      success: true,
      liked: !alreadyLiked,
      likeCount: post.likes.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
