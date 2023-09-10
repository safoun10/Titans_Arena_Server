const editProfile = async (req, res, usersCollection) => {
  const email = req.params.email;
  const data = req.body;
  const query = { email: email };
  const updateUserInfo = {
    $set: {
      name: data.name || undefined,
      username: data.username || undefined,
      photoURL: data.photoURL || undefined,
      facebook: data.facebook || undefined,
      twitter: data.twitter || undefined,
      instagram: data.instagram || undefined,
      youtube: data.youtube || undefined,
      discord: data.discord || undefined,
      bio: data.bio || undefined,
      phoneNumber: data.phoneNumber || undefined,
    },
  };
  const result = await usersCollection.updateOne(query, updateUserInfo);
  res.send(result);
};

module.exports = { editProfile };
