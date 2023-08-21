const express = require("express");
const app = express();
const cors = require("cors");
// const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@techtitans.gvuoct6.mongodb.net/?retryWrites=true&w=majority`;

// const uri = "mongodb://0.0.0.0:27017/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    const blogsCollection = client.db("titanArena").collection("blogs");

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
      const query = { title: { $regex: search } };
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

    // Here is saiful Islam code
    app.get("/blogs", async (req, res)=>{
      const result = await blogsCollection.find().toArray();
      res.send(result);
    })

    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const result = await blogsCollection.findOne({
        _id: new ObjectId(id),
      });
      console.log(result);
      res.send(result);
    });


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
run().catch(console.dir);

app.listen(port, (req, res) => {
  console.log("Titans Arena is sitting on port", port);
});
