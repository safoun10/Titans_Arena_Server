const enrollTournaments = async (req, res, usersCollection) => {
  const email = req.params.email;
  const data = req.body;
  const query = { email: email };
  const updateUserInfo = {
    $set: {
      enrollTournament: data.name,
    },
  };
  const result = await usersCollection.updateOne(query, updateUserInfo);
  res.send(result);
};

module.exports = { enrollTournaments };
