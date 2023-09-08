const { ObjectId } = require("mongodb");

const UserInfo = async (req, res, usersCollection) => {
  const email = req.params.email;
//   console.log(email)

  // Convert the userId string to ObjectId
  const query = {email : email}
//   console.log(query)
  

  // Find the user document by ObjectId
  const user = await usersCollection.findOne(query);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Assuming your user document has a 'role' field, you can access it
  const userAllInfo = user;
  console.log(userAllInfo)

  // Respond with the user's role
  res.send({userAllInfo});
};

module.exports = {  UserInfo };
