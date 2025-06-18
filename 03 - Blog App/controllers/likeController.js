const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.likePost = async (req, res) => {
	try {
		const { post, user } = req.body;

		const like = new Like({
			post,
			user,
		});

		const savedLike = await like.save();

		const updatedPost = await Post.findByIdAndUpdate(
			post,
			{ $push: { likes: savedLike._id } },
			{ new: true }
		)
			.populate("likes")
			.populate("comments")
			.exec();

		res.status(200).json({
			success: true,
			data: updatedPost,
		});
	} catch (err) {
		return res.status(400).json({
			error: "Error While Liking Post",
		});
	}
};

exports.unlikePost = async (req, res) => {
	try {
		const { post, like } = req.body;

		const deletedLike = await Like.findByIdAndDelete(like);

		const updatedPost = await Post.findByIdAndUpdate(
			post,
			{ $pull: { likes: deletedLike._id } },
			{ new: true }
		)
			.populate("likes")
			.populate("comments")
			.exec();

		res.status(200).json({
			success: true,
			data: updatedPost,
		});
	} catch (err) {
		return res.status(400).json({
			error: "Error While Unliking Post",
		});
	}
};
