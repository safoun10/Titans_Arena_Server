const getTournaments = async (req, res, tournamentsCollection) => {
  const result = await tournamentsCollection.find().toArray();
  res.send(result);
};

module.exports = { getTournaments };
