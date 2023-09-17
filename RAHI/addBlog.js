const addBlog = async (req, res, blogsCollection) => {
  const newBlog = req.body;
  console.log(newBlog);
  const result = await blogsCollection.insertOne(newBlog);
  res.send(result);
};
module.exports = { addBlog };
