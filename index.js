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
    const usersCollection = client.db("titanArena").collection("users");

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
