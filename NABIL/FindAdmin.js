const FindAdmin = async (req, res, usersCollection) =>{
    const email = req.params.email;

    if (req.decoded.email !== email) {
      return res.send({ admin: false });
    }

    const query = { email: email };
    const user = await usersCollection.findOne(query);
    const result = { admin: user?.role === "admin" };
    res.send(result);
}

module.exports = {FindAdmin}