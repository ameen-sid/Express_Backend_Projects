const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const routes = require("./routes/auth");
app.use("/api/v1", routes);

app.listen(PORT, () => {
	console.log(`Server Started at ${PORT}`);
});

const dbConnect = require("./config/database");
dbConnect();

app.get("/", (req, res) => {
	res.send("This is Home Page Baby");
});
