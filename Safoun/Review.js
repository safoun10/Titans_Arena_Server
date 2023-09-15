const homeReview = async (req, res, homeReviewCollection) => {
    const result = await homeReviewCollection.find().toArray();
    res.send(result);
};

module.exports = { homeReview };