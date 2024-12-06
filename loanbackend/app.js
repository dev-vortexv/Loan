const express = require("express");

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const {fileURLToPath} = require("url");
const dirname = require("path");
const path = require("path");

const connectDB = require("./db/connectdb");

const cors = require("cors");

//Setup Express App
const app = express();

// Set up CORS
app.use(cors());

//Set Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  const allowedOrigins = ["*"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//Load Routes

const mainRoutes = require("./routes/mainRoutes");

app.use("/api", mainRoutes);

//const _filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(_filename);
// Serve static files from the correct directory
app.use(
  "/uploads/borrowersDocuments",
  express.static(path.join(__dirname, "/uploads/borrowersDocuments"))
);

// Get port from environment and store in Express.
const port = process.env.PORT || "4000";
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

//Database Connection
const DATABASE_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
connectDB(DATABASE_URL, DB_NAME);
