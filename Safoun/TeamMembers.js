const teamMembers = async (req, res, teamMembersCollection) => {
    const result = await teamMembersCollection.find().toArray();
    res.send(result);
};

module.exports = { teamMembers };