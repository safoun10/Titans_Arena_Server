const flipCardGames = async (req, res, flipGamesCollection) => {
  const result = await flipGamesCollection.find().toArray();
  res.send(result);
};

module.exports = { flipCardGames };
