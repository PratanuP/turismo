// framework lib
const express = require("express");
// domain
const cors = require("cors");
// database
const mongoose = require("mongoose");

// key
const { MONGO_URI, PORT } = require("./config");

// initialize express app
const app = express();

// middle wares and parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
const connectOptions = { useUnifiedTopology: true, useNewUrlParser: true };

mongoose.connect(MONGO_URI, connectOptions).catch((err) => console.log(err));
mongoose.connection.once("open", () => console.log("Mongodb Connected"));

// all page routes
const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
