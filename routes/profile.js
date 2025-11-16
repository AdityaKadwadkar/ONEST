const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

// Return logged-in user profile
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        return res.json({ success: true, user });

    } catch (err) {
        console.error("Profile fetch error:", err);
        return res.status(500).json({ success: false, error: "Server error" });
    }
});

module.exports = router;
