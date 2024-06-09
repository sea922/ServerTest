// third party components
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");
const moment = require("moment-timezone");

// our components
const config = require("./app/configs/general.config");
const {processTransactions} = require("./app/utils/kafka");

const app = express();

// init global variables
global.INFO = {};
global.INFO.anonymousId = 2;
global.INFO.rootPath = __dirname;
global.INFO.setting = {};

// log by using morgan
app.use(morgan("combined"));
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(
  bodyParser.json({
    limit: "5mb",
  })
);

// parse application/vnd.api+json as json
app.use(
  bodyParser.json({
    type: "application/vnd.api+json",
  })
);

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride("X-HTTP-Method-Override"));

const corsOption = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

// Public Location
app.use(express.static(global.INFO.rootPath + config.paths.public));

// Auth Middleware - This will check if the token is valid
app.all("/api/v1/auth/*", [require("./app/middlewares/auth.middelwares")]);

// Create App
const httpServer = require("http").createServer(app);

// Routes
require("./app/routes/index")(app); // initialize routes

// Models
// require("./app/databases/mongoDB/index"); // initialize models
require("./app/databases/postgreSQL/index"); // initialize models


processTransactions();

const Logger = require("./app/utils/logger.utils");

process.on("SIGINT", function () {
  Logger.info("SIGINT signal received.");
  // Stops the server from accepting new connections and finishes existing connections.
  httpServer.close(function (error) {
    if (error) {
      Logger.error("SERVER CLOSED", error);
      process.exit(1);
    }
  });
});

process.on("message", (msg) => {
  if (msg === "shutdown") {
    Logger.info("Closing all connections...");
    setTimeout(() => {
      Logger.info("Finished closing connections");
      process.exit(0);
    }, 1500);
  }
});

// Start App: http://IP_Address:port
const httpPort = parseInt(config.port);
httpServer.listen(httpPort, function () {
  Logger.info("HTTP API started to listening on port " + httpPort);
  process.send("ready");
});

Logger.info("============================================== Restart Server ===============================================");
Logger.info("Local timezone: " + moment.tz.guess());
Logger.info("Config timezone: " + config.timezone);
