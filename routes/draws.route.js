const {
    authorizeAdmin,
    authorizeUser,
  } = require("../services/authenticate.service");
  const { validate, validateParamsId } = require("../services/validate.service");
  const drawsCtl = require("../controllers/draws.control");
  const router = require("express").Router();
  const { addDraws } = require("../validations/darws.validate");
  
  router
    .route("/")
    .post(authorizeUser, validate(addDraws), drawsCtl.addDraws)
    .get(authorizeUser, drawsCtl.getDraws);
  
  router
    .route("/:id")
    .patch(authorizeUser,validateParamsId, drawsCtl.updateDraws)
    .delete(authorizeUser,validateParamsId, drawsCtl.deleteDraws);
  
  module.exports = router;
  