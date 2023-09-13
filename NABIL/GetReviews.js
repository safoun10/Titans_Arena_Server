const GetReviews = async (req, res, reviewsCollection) =>{
    const result = await reviewsCollection.find().toArray()
    res.send(result)
}

module.exports = {GetReviews}