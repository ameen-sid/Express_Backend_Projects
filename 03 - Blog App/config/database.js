const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
	mongoose
		.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Database Connected Successfully");
		})
		.catch((error) => {
			console.error(error);
			console.log("Error while connecting to the database!");
			process.exit(1);
		});
};

module.exports = dbConnect;
