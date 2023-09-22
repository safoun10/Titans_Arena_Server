const removeBlogBookMark = async (req, res, usersCollection) => {
  try {
    const email = req.params.email;
    const blogIdToRemove = req.body.blogIdToRemove;

    const query = { email: email };
    const user = await usersCollection.findOne(query);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.bookMarkBlog && user.bookMarkBlog.includes(blogIdToRemove)) {
      const updateUserInfo = {
        $pull: {
          bookMarkBlog: blogIdToRemove,
        },
      };

      const result = await usersCollection.updateOne(query, updateUserInfo);
      res.json({ message: "Blog bookmark removed", result });
    } else {
      res.status(400).json({ message: "Blog not found in bookmarks" });
    }
  } catch (error) {
    console.error("Error removing Blog Bookmark:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { removeBlogBookMark };
