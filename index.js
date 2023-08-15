const express = require("express");
const app = express();
const cors = require("cors");
// const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env
.DB_PASS}@techtitans.gvuoct6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server    (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection


        const allData = client.db('titanArena').collection('games')

      

        // Nabil brach
        // My brach

            app.get("/Games", async (req, res)=>{
                let query = {}
                if (req.query?.category === "All Games") {
                    const result = await allData.find().toArray()
                    res.send(result)
                    return
                }
                if (req.query?.category) {
                    query = { category: req.query.category };
                  }
                  const result = await allData.find(query).toArray();
                  res.send(result);
            })


        // saiful bhi bra


        app.get("/", (req, res) => {
            res.send("TitanArena is runing");
        });

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, (req, res) => {
    console.log("Titans Arena is sitting on port", port);
});