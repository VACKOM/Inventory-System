const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const rolePermissions = require('../../config/rolePermission');


const register = async (req, res) => {
  const { username, password, role } = req.body;
  const permissions = rolePermissions[role];
  
  // Validate input
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  try {
    // Check if user already exists..
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }



    // Create new user
    const user = new User({
      username,
      password,
      role,
      permissions: permissions,
     
    });
    await user.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);  // Log the error for debugging purposes
    res.status(500).json({ message: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Username Invalid' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'password invalid' });
    }

    // Create JWT token, including the user's role, permissions, centerId, and bacentaId
    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role, 
        permissions: user.permissions
        
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } // Token expires in 1 hour
    );
    
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

module.exports = { register, login };

