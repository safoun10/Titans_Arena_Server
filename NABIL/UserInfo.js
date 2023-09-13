const { ObjectId } = require("mongodb");

const UserInfo = async (req, res, usersCollection) => {
  const email = req.params.email;
  const query = { email: email };
  const user = await usersCollection.findOne(query);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const userInfo = user;
  console.log(userInfo);

  res.send({ userInfo });
};

module.exports = { UserInfo };
