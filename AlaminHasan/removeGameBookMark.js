const removeGameBookMark = async (req, res, usersCollection) => {
    try {
        const email = req.params.email;
        const data = req.body;
        const query = { email: email };
        const user = await usersCollection.findOne(query);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        if (!user.bookMarkGames || !user.bookMarkGames.includes(data._id)) {
          return res
            .status(400)
            .json({ message: "Game not found in bookmarks" });
        }

        const updateUserInfo = {
          $pull: {
            bookMarkGames: data._id,
          },
        };

        const result = await usersCollection.updateOne(query, updateUserInfo);
        return res.json({ message: "Game bookmark removed", result });
      } catch (error) {
        console.error("Error removing Game Bookmark:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
  };
  
  module.exports = { removeGameBookMark };
  