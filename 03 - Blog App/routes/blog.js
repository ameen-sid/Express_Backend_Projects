const express = require("express");

const router = express.Router();

// import controllers
const { createPost, getAllPosts } = require("../controllers/postController");
const { createComment } = require("../controllers/commentController");
const { likePost, unlikePost } = require("../controllers/likeController");

// create mapping controllers to routes
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.post("/comments/create", createComment);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

module.exports = router;
