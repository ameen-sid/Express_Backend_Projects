// import models
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

// bussiness Logic
exports.createComment = async (req, res) => {
	try {
		// fetch data from request's body
		const { post, user, content } = req.body;

		// create comment object for save()
		const comment = new Comment({ post, user, content });

		// save the new comment object to the database
		const savedComment = await comment.save();

		// Find the post by id and add the new comment to it's comment array
		const updatedPost = await Post.findByIdAndUpdate(
			post,
			{ $push: { comments: savedComment._id } },
			{ new: true }
		)
			.populate("comments")
			.exec();

		res.status(200).json({
			success: true,
			data: updatedPost,
		});
	} catch (err) {
		return res.status(400).json({
			error: "Error While Creating Comment",
		});
	}
};
