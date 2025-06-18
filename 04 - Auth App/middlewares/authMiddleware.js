const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
	try {
		// fetch token from request's body
		const token = req.body.token;
		// const token = req.cookie.token;

		// check token is exist or not
		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Token is missing",
			});
		}

		// verify the token
		try {
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);

			req.user = decode;
		} catch (error) {
			return res.status(401).json({
				success: false,
				message: "Token is invalid",
			});
		}

		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Something went wrong while verifying token",
		});
	}
};

exports.isStudent = (req, res, next) => {
	try {
		if (req.user.role !== "Student") {
			return res.status(401).json({
				success: false,
				message:
					"This is a protected route for student you can not access it",
			});
		}
		next();
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "User Role Not Matching",
		});
	}
};

exports.isAdmin = (req, res, next) => {
	try {
		if (req.user.role !== "Admin") {
			return res.status(401).json({
				success: false,
				message:
					"This is a protected route for admin you can't access it",
			});
		}
		next();
	} catch (errro) {
		return res.status(500).json({
			success: false,
			message: "User Role not matching",
		});
	}
};
