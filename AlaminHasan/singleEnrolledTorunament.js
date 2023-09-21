const { ObjectId } = require("mongodb");

const singleEnrolledTournament = async (req, res, tournamentsCollection) => {
  const id = req.params.id;
  const result = await tournamentsCollection.findOne({
    _id: new ObjectId(id),
  });
  res.send(result);
};

module.exports = { singleEnrolledTournament };
