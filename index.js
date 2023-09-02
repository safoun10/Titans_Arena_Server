const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// varify authorization for user
const varifyJWT = (req, res, next) =>{
  const authorization = req.headers.authorization;


  if(!authorization){
    return res.status(401).send({error: true, message: 'unauthorization access'})
  }

  // bearer token
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decode)=>{
    if (error) {
      console.log("error");
      return res.status(401).send({error: true, message: 'unauthorization access'})
    }

    req.decode = decode;
    next();
  })
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@techtitans.gvuoct6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version+926
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server    (optional starting in v4.7)
    client.connect();
    // Send a ping to confirm a successful connection

    const allGames = client.db("titanArena").collection("games");
    const usersCollection = client.db("titanArena").collection("users");
    const blogsCollection = client.db("titanArena").collection("blogs");
    const newsleterCollection = client.db("titanArena").collection("newsleter");

// send the jwt access token secret
    app.post("/jwt", (res, req)=>{
      const user = res.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
      res.send(token);
    })

     // Warning: use verifyJWT before using verifyAdmin
     const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email }
      const user = await usersCollection.findOne(query);
      if (user?.role !== 'admin') {
        return res.status(403).send({ error: true, message: 'forbidden message' });
      }
      next();
    }

    // Nabil brach
    app.get("/games", async (req, res) => {
      let query = {};
      if (req.query?.category === "All Games") {
        const result = await allGames.find().toArray();
        res.send(result);
        return;
      }
      if (req.query?.category) {
        query = { category: req.query.category };
      }
      const result = await allGames.find(query).toArray();
      res.send(result);
    });

    app.get("/searchGames", async (req, res) => {
      // console.log(req.query.search)
      const search = req.query.search;
      const query = { title: { $regex: search, $options: "i" } };
      const result = await allGames.find(query).toArray();
      res.send(result);
    });

    // AlaminHasan Branch
    app.get("/games/:id", async (req, res) => {
      const id = req.params.id;
      const result = await allGames.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    //rakib01110 branch
    app.get("/users", async (req, res) => {
      const user = await usersCollection.find().toArray();
      res.send(user);
    });
    app.post("/users", async (req, res) => {
      const users = req.body;

      const queary = { email: users.email };
      const existingEmail = await usersCollection.findOne(queary);
      console.log("existing User", existingEmail);
      if (existingEmail) {
        return res.send({ message: "user allready added" });
      }
      const result = await usersCollection.insertOne(users);
      res.send(result);
    });

    // Here is saiful Islam code
    // get all the blogs from database
    app.get("/blogs", async (req, res) => {
      const result = await blogsCollection.find().toArray();
      res.send(result);
    });

    // get a single blog
    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const result = await blogsCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // search blogs api created
    app.get("/searchblogs", async (req, res) => {
      const search = req.query.search;
      const query = { title: { $regex: search, $options: "i" } };
      const result = await blogsCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/blog", async(req, res)=>{
      const blog = req.body;
      const result = await blogsCollection.insertOne(blog);
      res.send(result)
    })

    app.post("/newsletter", async(req, res)=>{
      const email = req.body;
      const result = await newsleterCollection.insertOne(email);
      res.send(result)
    })

    app.get("/", (req, res) => {
      res.send("TitanArena is runing");
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch((error) => {
  console.error("Error during server startup:", error);
});

app.listen(port, (req, res) => {
  console.log("Titans Arena is sitting on port", port);
});
