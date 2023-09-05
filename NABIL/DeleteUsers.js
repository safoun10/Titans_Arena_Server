const { ObjectId } = require("mongodb");

const DeleteUsers = async (req, res, usersCollection) =>{
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await usersCollection.deleteOne(query);
    res.send(result);
}

module.exports = {DeleteUsers}