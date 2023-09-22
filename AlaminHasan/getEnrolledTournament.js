const getEnrolledTournament = async (req, res, usersCollection) => {
  try {
    const email = req.params.email;
    const query = { email: email };
    const user = await usersCollection.findOne(query);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ enrolledTournamentsId: user.enrolledTournamentsId });
  } catch (error) {
    console.error("Error fetching enrolledTournamentsId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getEnrolledTournament };
