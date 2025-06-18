const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
	mongoose
		.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Connect is Successfull");
		})
		.catch((error) => {
			console.log("issue in connection");
			console.error(error);
			// iska matlab homework me tha
			process.exit(1);
		});
};

module.exports = dbConnect;
