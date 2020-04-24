const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid email' });
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
});

userSchema.statics.findUser = async (id) => {
  const user = await User.findById(id);
  return user;
};

userSchema.statics.signupUser = async ({ email, password, username }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already taken');
  }

  const hash = await bcrypt.hash(password, 8);
  await User.create({
    email,
    password: hash,
    username,
  });

  const user = await User.findOne({ email });

  jwt.sign({ _id: user._id }, process.env.JWT_KEY);

  await user.save();

  return user;
};

userSchema.statics.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email not found');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid Password');
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

  return {
    token,
    user
  };
};

userSchema.statics.logoutUser = async (user) => {
  const loggedOutUser = await User.findById(user._id);
  if (!loggedOutUser) {
    throw new Error('User not found');
  }

  return { loggedOutUser };
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
