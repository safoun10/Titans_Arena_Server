const gameBookMark = async (req, res, usersCollection) => {
  const email = req.params.email;
  const data = req.body;
  const query = { email: email };
  const user = await usersCollection.findOne(query);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  if (user.bookMarkGames && user.bookMarkGames.includes(data._id)) {
    res.status(400).json({ message: "Already enrolled in the tournament" });
    return;
  }
  const updateUserInfo = {
    $push: {
      bookMarkGames: data._id,
    },
  };
  const result = await usersCollection.updateOne(query, updateUserInfo);
  res.send(result);
};

module.exports = { gameBookMark };
