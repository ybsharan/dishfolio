import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import { sendCookie } from '../utils/feature.js';
import ErrorHandler from '../middlewares/error.js';
import mongoose from 'mongoose';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select('+password');

    if (!user)
      return res.status(401).json({
        success: true,
        message: 'Invalid username or password',
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({
        success: true,
        message: 'Invalid username or Password',
      });
    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        success: false,
        message: 'User Already Exist',
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });
    sendCookie(user, res, 'Registered Sucessfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res
    .status(200)
    .cookie('token', '', { expires: new Date(Date.now()) })
    .json({
      success: true,
      user: req.user,
    });
};

export const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'You are Successfully logged out',
    user: req.user,
  });
};

export const deleteProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorHandler('User Not Found', 404));
    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Your profile has been deleted',
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    // Validate if the provided ID is a valid MongoDB ID
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Filter out properties other than name, email, and password from the updatedData
    const { name, email, password } = updatedData;
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

export const allUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred' });
  }
};
