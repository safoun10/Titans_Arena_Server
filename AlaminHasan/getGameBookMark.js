const getGameBookMark = async (req, res, usersCollection) => {
    try {
        const email = req.params.email;
        const query = { email: email };
        const user = await usersCollection.findOne(query);
        if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json({ bookMarkGames: user.bookMarkGames });
      } catch (error) {
        console.error("Error fetching Get Bookmark games:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
  };
  
  module.exports = { getGameBookMark };
  