const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { games } = require("./NABIL/games");
const { searchGames } = require("./NABIL/searchGames");
const { DeleteUsers } = require("./NABIL/DeleteUsers");
const { MakeAdmin } = require("./NABIL/MakeAdmin");
const { FindAdmin } = require("./NABIL/FindAdmin");
const { UserInfo } = require("./NABIL/UserInfo");
const { gameDetails } = require("./AlaminHasan/gameDetails");
const { editProfile } = require("./AlaminHasan/editProfile");
const { profile } = require("./AlaminHasan/profile");
const { flipCardGames } = require("./RAHI/flipCardGames")


const { Comments } = require("./NABIL/Comments");
const { GetComments } = require("./NABIL/GetComments");
const { Reviews } = require("./NABIL/Reviews");
const { GetReviews } = require("./NABIL/GetReviews");
const port = process.env.PORT || 5000;
const { FixeredMatchDB } = require("./Rakib/FixeredMatchDB");
const { myComments } = require("./AlaminHasan/myComments");
// middleware
app.use(cors());
app.use(express.json());

// Verify JWT
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  // bearer token
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

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
    const commentsCollection = client.db("titanArena").collection("comments");
    const reviewsCollection = client.db("titanArena").collection("reviews");
    const socialLinksCollection = client.db("titanArena").collection("socialLinks");
    const teamMembersCollection = client.db("titanArena").collection("teamMembers");
    const homeReviewCollection = client.db("titanArena").collection("HomeReview");

    const espMatchfixeredCollection = client
      .db("titanArena")
      .collection("matchFixeredDb");
    const flipGamesCollection = client.db("titanArena").collection("flipCardGames");

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: "3h",
      });
      res.send({ token });
    });

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden message" });
      }
      next();
    };

    app.get("/games", async (req, res) => games(req, res, allGames));

    app.get("/searchGames", async (req, res) =>
      searchGames(req, res, allGames)
    );
    app.delete("/users/:id", async (req, res) =>
      DeleteUsers(req, res, usersCollection)
    );

    app.patch("/users/admin/:id", verifyJWT, async (req, res) =>
      MakeAdmin(req, res, usersCollection)
    );

    app.get("/users/admin/:email", verifyJWT, async (req, res) =>
      FindAdmin(req, res, usersCollection)
    );
    app.get("/userInfo/:email", async (req, res) =>
      UserInfo(req, res, usersCollection)
    );
    app.get("/comments", async (req, res) =>
      GetComments(req, res, commentsCollection)
    );
    app.post("/comments", async (req, res) =>
      Comments(req, res, commentsCollection)
    );
    app.get("/reviews", async (req, res) =>
      GetReviews(req, res, reviewsCollection)
    );
    app.post("/reviews", async (req, res) =>
      Reviews(req, res, reviewsCollection)
    );

    // AlaminHasan Branch

    app.get("/games/:id", async (req, res) => gameDetails(req, res, allGames));
    app.get("/userProfile/:id", async (req, res) => {
      profile(req, res, usersCollection);
    });

    app.patch("/usersInfo/:email", async (req, res) =>
      editProfile(req, res, usersCollection)
    );
    app.get("/myComments/:user_email", async (req, res) => {
      myComments(req, res, commentsCollection);
    });

    // Rakib01110 branch
    app.get("/users", verifyJWT, verifyAdmin, async (req, res) => {
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
    // --------------------------------------------------------------------------------------------------

    app.get("/espMatchFixered", async (req, res) => {
      const result = await espMatchfixeredCollection.find().toArray();
      res.send(result);
    });

    app.get("/espMatchFixered/:id", async (req, res) =>
      FixeredMatchDB(req, res, espMatchfixeredCollection)
    );

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
    // --------------------------------------------------------------------------------------------------
    // the codes of Rahi

    app.get("/flip-games", async (req, res) => {
      flipCardGames(req, res, flipGamesCollection)
    });

    // --------------------------------------------------------------------------------------------------
    // This is Safoun

    app.get("/social-links", async (req, res) => {
      flipCardGames(req, res, socialLinksCollection)
    });


    app.get("/team-members", async (req, res) => {
      flipCardGames(req, res, teamMembersCollection)
    });


    app.get("/home-review", async (req, res) => {
      flipCardGames(req, res, homeReviewCollection)
    });

    // --------------------------------------------------------------------------------------------------

    app.get("/", (req, res) => {
      res.send("Titans Arena Server is running");
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You are successfully connected to MongoDB!"
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
  console.log("Titans Arena is running on port", port);
});