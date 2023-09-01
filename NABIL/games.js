const games = async (req, res, allGames) =>{
    let query = {};
    if (req.query?.category === "All Games") {
      const result = await allGames.find().toArray();
      res.send(result);
      return;
    }
    if (req.query?.category) {
      query = { category: req.query.category };
    }
    const result = await allGames.find(query).toArray();
    res.send(result);
}

module.exports = {games}