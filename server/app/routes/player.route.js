/* eslint-disable space-before-function-paren */
/* eslint-disable indent */

// our components
const PlayerController = require("../controllers/player.controller");

module.exports = function (app) {

  app.post("/api/v1/players", PlayerController.create);

  app.get("/api/v1/auth/players/:id", PlayerController.getOne);

  app.get("/api/v1/auth/players", PlayerController.getAll);

  app.delete("/api/v1/auth/players/:id", PlayerController.delete);

  app.get("/api/v1/auth/me", PlayerController.me);

  app.post("/api/v1/login", PlayerController.login);

  app.post("/api/v1/verify", PlayerController.verify);
};
