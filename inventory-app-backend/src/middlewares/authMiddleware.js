const jwt = require('jsonwebtoken');

// Middleware to authenticate the user using JWT
const authenticate = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded user info to request
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Middleware to authorize user based on role and permissions
const authorize = (roles = [], permissions = []) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const userPermissions = req.user.permissions;

    // Check if the user's role is allowed
    if (roles.length > 0 && !roles.includes(userRole)) {
      return res.status(403).json({ message: 'Access forbidden. Insufficient permissions.' });
    }

    // Check if the user has the necessary permissions
    if (permissions.length > 0 && !permissions.some(permission => userPermissions.includes(permission))) {
      return res.status(403).json({ message: 'Access forbidden. Insufficient permissions.' });
    }

    next();
  };
};

module.exports = { authenticate, authorize };

