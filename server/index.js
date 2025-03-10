const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const mongodbStore = require("connect-mongodb-session");
const session = require("express-session");
const auth = require("./routes/handle");
const db = require("./data/database");

const MongoDBStore = mongodbStore(session);

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000", 
  credentials: true, 
};

app.use(cors(corsOptions));

console.log(app);

const sessionSecret = crypto.randomBytes(32).toString("hex");

const sessionStore = new MongoDBStore({
  uri: "mongodb://localhost/",
  databaseName: "gamezone",
  collection: "sessions",
});

sessionStore.on("error", (error) => {
  console.error("Session store error:", error);
});

app.use(
  session({
    secret: sessionSecret, // Key to secure session/session cookie
    resave: false, // Ensures that session is updated only if data changes
    saveUninitialized: true, // Saves session only if data is present
    store: sessionStore, // Store session in MongoDB
    cookie: {
      httpOnly: true, // Prevents JavaScript access to cookie
      secure: false,
      // sameSite: "None", // Required for cross-origin cookies
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);



app.use("/api", auth);

db.connectToDatabase().then(function () {
  app.listen(8080, () => {
    console.log("Server running on port 8080");
  });
});
