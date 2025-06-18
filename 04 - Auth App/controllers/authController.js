const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
	try {
		// fetch data
		const { name, email, password, role } = req.body;

		// chech if user is exist or not
		const existUser = await User.findOne({ email });

		// if user is exist
		if (existUser) {
			console.log("User is alreay exist");
			return res.status(400).json({
				success: false,
				data: existUser,
				message: "User is already exist",
			});
		}

		let hashedPassword;
		try {
			hashedPassword = await bcrypt.hash(password, 10);
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Error in hashing password",
			});
		}

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			role,
		});

		return res.status(200).json({
			success: true,
			data: user,
			message: "User Created Successfully",
		});
	} catch (error) {
		console.log("Error in Signing up, Please try again later");
		return res.status(500).json({
			success: false,
			message: "Error in Signing up",
		});
	}
};

exports.login = async (req, res) => {
	try {
		// fetch data from req.body
		const { email, password } = req.body;

		// check all the fields are fill or not
		if (!email || !password) {
			return res.status(401).json({
				success: false,
				message: "Please fill all the fields",
			});
		}

		// find the email id in database
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(402).json({
				success: false,
				message: "Email not register, sign up first",
			});
		}

		// verify password and generate jwt token
		const payload = {
			email: user.email,
			id: user.id,
			role: user.role,
		};

		// error in await
		if (await bcrypt.compare(password, user.password)) {
			// password matched

			let token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "2h",
			});

			// user = user.toObject();
			user.token = token;
			user.password = undefined;

			const options = {
				expiresIn: new Date(Date.now + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};

			res.cookie("Token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: "User login Successfully",
			});
		} else {
			// password not matched
			return res.status(403).json({
				success: false,
				message: "Wrong Password",
			});
		}
	} catch (error) {
		console.log("Error in Login");
		console.error(error);
		return res.status(400).json({
			success: false,
			message: "Error in Login",
		});
	}
};
