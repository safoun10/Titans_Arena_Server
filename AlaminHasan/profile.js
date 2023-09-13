const { ObjectId } = require("mongodb");

const profile = async (req, res, usersCollection) => {
  const id = req.params.id;
  const result = await usersCollection.findOne({
    _id: new ObjectId(id),
  });
  res.send(result);
};

module.exports = { profile };
