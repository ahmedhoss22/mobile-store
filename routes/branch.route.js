const branchCtl = require("../controllers/branch.control");
const { validate, validateParamsId } = require("../services/validate.service");
const router = require("express").Router();
const { addStore } = require("../validations/branch.validate");
const {
  authorizeAdmin,
  authorizeUser,
} = require("../services/authenticate.service");

router
  .route("/")
  .post(authorizeAdmin, validate(addStore), branchCtl.addBranch)
  .get(branchCtl.getAllBranches);

router
  .route("/:id")
  .delete(authorizeAdmin, validateParamsId, branchCtl.deleteBranch)
  .patch(authorizeAdmin, validateParamsId, branchCtl.updateBranch);

module.exports = router;
