const removeEnrolledTournament = async (req, res, usersCollection) => {
  const email = req.params.email;
  const tournamentIdToRemove = req.body.tournamentIdToRemove;

  const query = { email: email };
  const user = await usersCollection.findOne(query);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (
    user.enrolledTournamentsId &&
    user.enrolledTournamentsId.includes(tournamentIdToRemove)
  ) {
    const updateUserInfo = {
      $pull: {
        enrolledTournamentsId: tournamentIdToRemove,
      },
    };

    const result = await usersCollection.updateOne(query, updateUserInfo);
    res.json({ message: "Tournament removed from enrolled list", result });
  } else {
    res.status(400).json({ message: "Tournament not found in enrolled list" });
  }
};

module.exports = { removeEnrolledTournament };
