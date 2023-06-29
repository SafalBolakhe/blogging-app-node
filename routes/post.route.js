const router = require("express").Router();
const Post = require("../models/post.model");
const User = require("../models/user.model");
const verify = require("../verify");

router.get("/all", async (req, res) => {
  try {
    let posts;
    posts = await Post.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", verify, async (req, res) => {
  const id = req.payload.id;
  const postId = req.params.id;
  console.log(id);
  try {
    const username = await User.findById(id);
    if (username.role === "admin") {
      await Post.findByIdAndRemove(postId);
      res.status(200).json("Post Deleted");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/addpost", verify, async (req, res) => {
  try {
    id = req.payload.id;
    const username = await User.findById(id);
    console.log(username)
    if (username.role === "admin") {
      const newPost = new Post({
        author: username.username,
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        post_image: req.body.post_image,
        post_category: req.body.post_category,
      });
      //   console.log(newItem);
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } else {
      res.status(500).json("You do not have the privilege");
    }
  } catch (error) {
    console.error(error);
  }
});

router.put("/editpost/:id", verify, async (req, res) => {
  try {
    id = req.payload.id;
    const username = await User.findById(id);
    if (
      username.role === "admin" &&
      (await Item.find({ id: req.params.id }).count()) === 0
    ) {
      const newPost = new Post({
        author: username,
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        post_image: req.body.post_image,
        post_category: req.body.post_category,
      });
      //   console.log(newItem);
      const savedPost = await newItem.save();
      res.status(200).json(savedPost);
    } else {
      res.status(500).json("You do not have the privilege");
    }
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
