const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
	try {
		const { title, content } = req.body;

		const post = new Post({ title, content });

		const savedPost = await post.save();

		res.status(200).json({
			success: true,
			data: savedPost,
		});
	} catch (error) {
		return res.status(400).json({
			error: "Error While Creating Post",
		});
	}
};

exports.getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find();
		// .populate("likes")
		// .populate("comments")
		// .exec();

		res.status(200).json({
			success: true,
			data: posts,
		});
	} catch (error) {
		return res.status(400).json({
			error: "Error While Fetching Posts",
		});
	}
};
