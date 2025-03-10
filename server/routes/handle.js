const express = require("express");
const mongodb = require("mongodb");
const bcrypt = require("bcryptjs");
const db = require("../data/database");

const router = express.Router();

const ObjectId = mongodb.ObjectId;

function isAuthenticated(req, res, next) {
  console.log("Session ID:", req.sessionID);
  console.log("Session Data:", req.session);
  console.log(req.session.user);

  if (!req.session || !req.session.user) {
    console.log("Unauthorized access: No session or user data found");
    return res.status(401).json({ message: "Unauthorized" });
  }

  next(); // Proceed if authenticated
}

router.post("/signup", async (req, res) => {
  const { username, email, password, avatarImg, points } = req.body;

  try {
    const existingEmail = await db
      .getDb()
      .collection("users")
      .findOne({ email: email });
    const existingUser = await db
      .getDb()
      .collection("users")
      .findOne({ username: username });
    if (existingEmail || existingUser) {
      return res.status(409).json({ message: "Account already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = {
      username: username,
      password: hashedPassword,
      email: email,
      avatarImg: avatarImg,
      points: points,
    };
    const result = await db.getDb().collection("users").insertOne(newUser);
    console.log(result);
    const leaderboardEntry = {
      userId: result.insertedId,
      username: username,
      points: points,
    };

    await db.getDb().collection("leaderboard").insertOne(leaderboardEntry);

    res
      .status(200)
      .json({ message: "Signup successful!" /*, redirect: "/" */ });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "Error during signup." });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await db
      .getDb()
      .collection("users")
      .findOne({ username: username });

    if (!existingUser) {
      return res.status(404).json({ message: "Account does not exist." });
    }

    const equalPasswords = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!equalPasswords) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    req.session.user = { id: existingUser._id }; 
    console.log("Session data after login:", req.session); 
    console.log("Session data after login:", req.session.user);

    req.session.save(function (err) {
      if (err) {
        console.error("Error saving session:", err);
        return res.status(500).json({ message: "Error saving session." });
      }
      res.status(200).json({
        message: "Login successful!",
        redirect: `/user/${existingUser._id}`, 
      });
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Error during login." });
  }
});

router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  // Validate if the userId is a valid ObjectId
  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID." }); 
  }

  try {
    const user = await db
      .getDb()
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      username: user.username,
      avatarImg: user.avatarImg,
      points: user.points,
    });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ message: "Error fetching user data." });
  }
});

router.get("/profile", isAuthenticated, async (req, res) => {
  console.log("Session data at /profile route:", req.session);
  console.log("Session User ID:", req.session.user?.id);

  const userId = req.session.user.id; 

  try {
    const user = await db
      .getDb()
      .collection("users")
      .findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.setHeader("Access-Control-Allow-Credentials", "true"); 
    res.status(200).json(user); 
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ message: "Error fetching user data." });
  }
});

router.put("/update-profile", async (req, res) => {
  const { username, email, avatarImg } = req.body;
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const existingUser = await db
      .getDb()
      .collection("users")
      .findOne({
        _id: { $ne: new ObjectId(userId) },
        $or: [{ username }, { email }],
      });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or email already exists." });
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (avatarImg) updateData.avatarImg = avatarImg;

    const userResult = await db
      .getDb()
      .collection("users")
      .updateOne({ _id: new ObjectId(userId) }, { $set: updateData });
    if (username) {
      await db
        .getDb()
        .collection("leaderboard")
        .updateOne(
          { userId: new ObjectId(userId) },
          { $set: { username } },
          { upsert: true }
        );
    }

    if (userResult.modifiedCount === 0) {
      return res
        .status(400)
        .json({ message: "No changes made to the profile." });
    }

    res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile." });
  }
});

router.get("/achievements", isAuthenticated, async (req, res) => {
  console.log("Session data at /profile route:", req.session);
  console.log("Session User ID:", req.session.user?.id);

  const userId = req.session.user.id; 

  try {
    const user = await db
      .getDb()
      .collection("users")
      .findOne(
        { _id: new ObjectId(userId) },
        { projection: { username: 1, points: 1 } }
      );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies) with response
    res.status(200).json(user); 
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ message: "Error fetching user data." });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboardData = await db
      .getDb()
      .collection("leaderboard")
      .find({})
      .sort({ points: -1 }) // Sort by points in descending order
      .toArray();

    const leaderboard = leaderboardData.map((entry) => ({
      userId: entry.userId,
      username: entry.username,
      points: entry.points,
    }));

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error.message);
    res.status(500).json({ message: "Error fetching leaderboard data." });
  }
});

router.post("/feedback", async (req, res) => {
  const { name, email, feedback } = req.body;
  try {
    const newFeedback = {
      name: name,
      email: email,
      feedback: feedback,
      submittedAt: new Date(),
    };
    await db.getDb().collection("feedback").insertOne(newFeedback);

    res.status(200).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("Error while submitting feedback:", error.message);
    res.status(500).json({ message: "Error while submitting feedback." });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction failed:", err);
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.status(200).json({ message: "Logged out successfully", redirect: "/" });
  });
});

router.get("/check-auth", isAuthenticated, (req, res) => {
  res.json({ message: "User is authenticated", user: req.session.user });
});

router.delete("/delete", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session?.user?.id; 
    if (!userId) {
      return res.status(401).json({ message: "User is unauthorized" });
    }

    
    const userObjectId = new ObjectId(userId);

    
    const userDeleteResult = await db
      .getDb()
      .collection("users")
      .deleteOne({ _id: userObjectId });

    
    const leaderboardDeleteResult = await db
      .getDb()
      .collection("leaderboard")
      .deleteOne({ userId: userId });

    if (
      userDeleteResult.deletedCount === 0 &&
      leaderboardDeleteResult.deletedCount === 0
    ) {
      return res
        .status(404)
        .json({ message: "User not found in the database" });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction failed:", err);
        return res.status(500).json({ message: "Failed to log out" });
      }
    });

    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({ message: "Error deleting user profile" });
  }
});

router.put("/update-points", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    const points = req.body.newPoints || req.body.points; 

    if (!userId) {
      return res.status(401).json({ message: "User is unauthorized" });
    }

    if (typeof points !== "number" || points < 0) {
      return res.status(400).json({ message: "Invalid points value" });
    }

    const userObjectId = new ObjectId(userId);

   
    const user = await db
      .getDb()
      .collection("users")
      .findOne({ _id: userObjectId });
    if (!user) {
      return res.status(404).json({ message: "User not found in the database" });
    }

    const currentPoints = user.points || 0; 
    const updatedPoints = currentPoints + points;

    
    const userUpdateResult = await db
      .getDb()
      .collection("users")
      .updateOne({ _id: userObjectId }, { $set: { points: updatedPoints } });

    const leaderboardUpdateResult = await db
      .getDb()
      .collection("leaderboard")
      .updateOne({ userId: userId }, { $set: { points: updatedPoints } });

    if (userUpdateResult.matchedCount === 0 || leaderboardUpdateResult.matchedCount === 0) {
      return res.status(404).json({ message: "User not found in the database" });
    }

    res.status(200).json({ message: "Points updated successfully" });
  } catch (error) {
    console.error("Error updating points:", error);
    res.status(500).json({ message: "Error updating points" });
  }
});


module.exports = router;
