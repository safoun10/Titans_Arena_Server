const myEnrolledTournaments = async (req, res, usersCollection) => {
  try {
    const tournaments = await usersCollection.find({}, { _id: 1 }).toArray();
    const tournamentIds = tournaments.map((tournament) => tournament._id);
    res.json(tournamentIds);
  } catch (error) {
    console.error("Error fetching tournament IDs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { myEnrolledTournaments };
