import express from "express"
import mongoose from "mongoose"
import cors from "cors"; // Import the CORS package
import { commmentsRoute } from "./routes/comment.js";
import { authRoute } from "./routes/user.js";
import { uploadVideoRoute } from "./routes/video.js";


const app = express();
app.use(express.json());
app.use(cors());

const dbName = "youtubeBackend";
mongoose.connect(`mongodb://localhost:27017/${dbName}`);

const db = mongoose.connection;
db.on("open", () => {
  console.log("db Connection successful");
});

db.on("error", () => {
  console.log("Connection is not successful");
});

app.listen(2100, () => {
  console.log("Server is running on port 2100");
});

app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: "No search query provided" });
    }

    // Case-insensitive search for titles matching the query
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(10);

    res.json({ videos });
  } catch (err) {
    res.status(500).json({ message: "Error fetching search results", error: err.message });
  }
});

uploadVideoRoute(app)
authRoute(app)
commmentsRoute(app)