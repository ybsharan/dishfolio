import express from 'express';
import {
  register,
  login,
  logout,
  getMyProfile,
  updateProfile,
  deleteProfile,
  allUsers,
} from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/new', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/profile', isAuthenticated, getMyProfile);

router
  .route('/:id')
  .put(isAuthenticated, updateProfile)
  .delete(isAuthenticated, deleteProfile);

router.get('/all', allUsers);

export default router;
