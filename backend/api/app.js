const express = require("express");
const cors = require("cors");

const router = require("./routes");
const app = express();

app.use(cors()); // Cross Origin resource sharing middleware
app.use(express.json()); // to safe parse the data

app.use("/api/v1", router); // Standard procedure to structure the api routes

app.listen(3000, () => {
  console.log("server is up");
});
