import express from 'express';
import multer from 'multer';
import path from 'path';
import auth from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// ✅ Use a subfolder for profile pics (keeps uploads organized)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/profiles/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ Get logged-in user's profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Public profile by userId
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('name email bio location profilePic');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Server error');
  }
});

// ✅ Update profile (with optional image upload)
router.put('/profile', auth, upload.single('profilePic'), async (req, res) => {
  try {
    const updates = {
      bio: req.body.bio,
      location: req.body.location,
    };

    if (req.file) {
      updates.profilePic = `/uploads/profiles/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select('-password');

    res.json(user);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
