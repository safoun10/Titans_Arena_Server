const GetComments = async (req, res, commentsCollection) =>{
    const result = await commentsCollection.find().toArray()
    res.send(result)
}

module.exports = {GetComments}