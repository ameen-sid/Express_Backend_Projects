const mongoose = require("mongoose");

require("dotenv").config();

exports.connectDB = () => {
	mongoose
		.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Connected to Database");
		})
		.catch((error) => {
			console.log("Error in connecting to database");
			console.error(error);
			process.exit(1);
		});
};
