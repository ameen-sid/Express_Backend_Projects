const express = require("express");
const app = express();

// load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware to parse json request
app.use(express.json());

// import routes
const routes = require("./routes/blog");

// mount the API route
app.use("/api/v1", routes);

// start the server
app.listen(PORT, () => {
	console.log(`Server started at ${PORT}`);
});

// connect to the database
const dbConnect = require("./config/database");
dbConnect();

// default route
app.get("/", (req, res) => {
	res.send("<h1> This is Home Page </h1>");
});
