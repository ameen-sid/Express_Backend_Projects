// import the model
const Todo = require("../models/Todo");

// define route handler

exports.getTodo = async (req, res) => {
	try {
		// fetch all todo items from database
		const todos = await Todo.find({});

		// response
		res.status(200).json({
			success: true,
			data: todos,
			message: "Entire data fetched successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			error: error.message,
			message: "Server error",
		});
	}
};

exports.getTodoById = async (req, res) => {
	try {
		// extract todo item basis of id
		const id = req.params.id;
		const todo = await Todo.findById({ _id: id });

		// data for given id not found
		if (!todo) {
			return res.status(404).json({
				success: false,
				message: "No Data Found with given id",
			});
		}
		// data for given id found
		else {
			return res.status(200).json({
				success: true,
				data: todo,
				message: `Todo ${id} data successfully fetched`,
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			error: error.message,
			message: "Server error",
		});
	}
};
