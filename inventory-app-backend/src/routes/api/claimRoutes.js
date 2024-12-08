const express = require("express");
const claimController = require("../../controllers/claimController");

const router = express.Router();

// Retrieve All Claims
router.get("/", claimController.getAllClaims);

// Retrieve One Claim
router.get("/:id", claimController.getClaimById);

// Create Claim
router.post("/", claimController.createClaim);

// Update Claim 
router.put("/:id", claimController.updateClaim);

// Delete Claim
router.delete("/:id", claimController.deleteClaim);

module.exports = router;