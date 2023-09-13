const { ObjectId } = require("mongodb");

const gameDetails = async (req, res, allGames) => {
  const id = req.params.id;
  const result = await allGames.findOne({
    _id: new ObjectId(id),
  });
  res.send(result);
};

module.exports = {gameDetails};