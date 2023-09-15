const addTournaments = async (req, res, tournamentsCollection) => {
  const tournament = req.body;
  const result = await tournamentsCollection.insertOne(tournament);
  res.send(result);
};

module.exports = { addTournaments };
