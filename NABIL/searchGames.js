const searchGames = async(req, res, allGames) =>{
    
        // console.log(req.query.search)
        const search = req.query.search;
        const query = { title: { $regex: search } };
        const result = await allGames.find(query).toArray();
        res.send(result);
      
}

module.exports = {searchGames}