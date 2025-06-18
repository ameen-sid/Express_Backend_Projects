const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post", // reference to the post model
	},
	user: {
		type: String,
		require: true,
	},
	content: {
		type: String,
		require: true,
	},
});

module.exports = mongoose.model("Comment", commentSchema);
