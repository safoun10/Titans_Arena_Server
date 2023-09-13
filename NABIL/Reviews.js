const Reviews = async (req, res, reviewsCollection) =>{
    const reviews = req.body
    const result = await reviewsCollection.insertOne(reviews)
    res.send(result)

}

module.exports = {Reviews}