const myComments = async (req, res, commentsCollection) => {
  const email = req.params.user_email;
  const query = { user_email: email };
  console.log(query)
  const result = await commentsCollection.find(query).toArray();
  res.send(result );
};

module.exports = { myComments };
