const singleGameComments = async (req, res, commentsCollection) => {
  const gameComment = req.params.game_id;
  const query = { game_id: gameComment };
  console.log(query);
  const result = await commentsCollection.find(query).toArray();
  res.send(result);
};

module.exports = { singleGameComments };
