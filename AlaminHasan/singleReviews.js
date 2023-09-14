const singleReviews = async (req, res, commentsCollection) => {
    const gameReviews = req.params.game_id;
    const query = { game_id: gameReviews };
    console.log(query);
    const result = await commentsCollection.find(query).toArray();
    res.send(result);
  };
  
  module.exports = { singleReviews };
  