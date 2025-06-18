const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");
const { auth, isStudent, isAdmin } = require("../middlewares/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);

// Protected Route for Student
router.get("/isStudent", auth, isStudent, (req, res) => {
	res.status(200).json({
		success: true,
		message: "Welcome to protected route for student",
	});
});

// Protected Route for Admin
router.get("/isAdmin", auth, isAdmin, (req, res) => {
	res.status(200).json({
		success: true,
		message: "Welcome to protected route for admin",
	});
});

module.exports = router;
