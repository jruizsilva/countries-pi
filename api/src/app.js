const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const countriesRouter = require("./routes/countries.routes");
const activityRouter = require("./routes/activity.routes");

require("./db.js");

const server = express();

server.name = "API";

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  const allowedDomains = [
    "http://localhost:3000",
    "https://countries-pi-kappa.vercel.app/",
  ];
  const origin = req.headers.origin;
  if (allowedDomains.indexOf(origin) > -1) {
    res.header("Access-Control-Allow-Origin", origin); // update to match the domain you will make the request from
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Routes
server.get("/", (req, res) => res.send("hola"));
server.use("/countries", countriesRouter);
server.use("/activity", activityRouter);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  // console.error(err);
  res.status(status).send(message);
});

module.exports = server;
