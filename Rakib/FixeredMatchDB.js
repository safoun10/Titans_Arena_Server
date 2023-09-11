const { ObjectId } = require("mongodb")

const FixeredMatchDB = async (req, res, espMatchfixeredCollection) => {

    const id = req.params.id
    const result = await espMatchfixeredCollection.findOne({ _id: new ObjectId(id) })
    res.send(result)

}

module.exports = { FixeredMatchDB }
// ------------------