const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Make sure bcryptjs is imported

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Ensure passwords are at least 8 characters long for better security
    },
    role: {
      type: String,
      required: true,
      enum: [
        "commandant", 
        "administrator", 
        "store_head",
        "store_keeper"
      ],
    },
    permissions: {
      type: [String], // List of specific permissions for this user
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'users',  // Correct placement of collection name
  }
);

// Hash password before saving the user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    // Hash the password before saving it to the database
    this.password = await bcrypt.hash(this.password, 10); // 10 salt rounds
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware or handler
  }
});

// Method to compare password 
userSchema.methods.comparePassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

module.exports = mongoose.model('User', userSchema);
