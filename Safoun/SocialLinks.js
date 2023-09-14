const socialLinks = async (req, res, socialLinksCollection) => {
    const result = await socialLinksCollection.find().toArray();
    res.send(result);
};

module.exports = { socialLinks };