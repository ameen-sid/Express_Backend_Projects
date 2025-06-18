
// Server Instantiate
const express = require('express');
const app = express();

// used to parse req.body in express -> Put or Post
const bodyParser = require('body-parser');

// specifically parse JSON data & add it to the req.body object
app.use(bodyParser.json());

// activate the server on 3000 port
app.listen(8000, () => {
	console.log("Server is running on port no 8000");
});

// Routes
app.get('/', (req, res) => {
	res.send("Response Successfull");
});

app.post('/api/cars', (req, res) => {
	const {name, brand} = req.body;
	console.log(name);
	console.log(brand);
	res.send("Cars Submitted Successfully");
});


const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/myDatabase', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then( () => {console.log("Connected Succesfully")})
.catch( (error) => {console.log("Recieved an error",error)});