const { ObjectId } = require("mongodb");

const MakeAdmin = async (req, res, usersCollection) =>{
    const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
}

module.exports = {MakeAdmin}