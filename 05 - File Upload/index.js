// create app
const express = require("express");
const app = express();

// find PORT
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// add middlewares
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// connect to db
const db = require("./config/database");
db.connectDB();

// connect to cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// api route mount
const routes = require("./routes/fileUpload");
app.use("/api/v1/upload", routes);

// activate server
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`);
});

// default route
app.get("/", (req, res) => {
	res.send("This is Home Page");
});
