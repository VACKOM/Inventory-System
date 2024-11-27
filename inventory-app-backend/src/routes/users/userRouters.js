const express = require("express");
const { authenticate, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();

// Only Commandant can access this route
router.get("/commandant", authenticate, authorize(['commandant']), (req, res) => {
    res.json({ message: "Welcome to Commandant Dashboard" });
});

// Only  Administrator and Commandant can access this route
router.get("/administrator", authenticate, authorize(['commandant', 'administrator']), (req, res) => {
    res.json({ message: "Welcome to Administrator Dashboard" });
});

// Only  Head of Stores, Administrator and Commandant can access this route
router.get("/store_head", authenticate, authorize(['commandant', 'administrator','store_head']), (req, res) => {
    res.json({ message: "Welcome to Head of Stores Dashboard" });
});

// Only  Store Kepper, Head of Stores, Administrator and Commandant can access this route
router.get("/store_keeper", authenticate, authorize(['commandant', 'administrator','store_head','store_keeper']), (req, res) => {
    res.json({ message: "Welcome to Store Keepers Dashboard" });
});


module.exports = router;
