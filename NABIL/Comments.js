const Comments = async (req, res, commentsCollection) =>{
    const comment = req.body
    const result = await commentsCollection.insertOne(comment)
    res.send(result)
}

module.exports = {Comments}