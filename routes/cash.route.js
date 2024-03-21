const router = require("express").Router()
const cashCtl = require("../controllers/cash.control")
const { validate, validateParamsId } = require("../services/validate.service");
const { addCash ,updateCash } = require("../validations/cash.validate");
const { authorizeAdmin, authorizeUser, } = require("../services/authenticate.service");

router.post("/internal", authorizeUser, validate(addCash), cashCtl.addInternalCash)
router.post("/external", authorizeUser, validate(addCash), cashCtl.addExternalCash)

router.get("/internal", authorizeUser, cashCtl.getInternalCash)
router.get("/external", authorizeUser, cashCtl.getExternalCash)

router.route("/:id",)
    .patch(validateParamsId, authorizeUser, validate(updateCash), cashCtl.updateCash)
    .delete(validateParamsId, authorizeUser, cashCtl.deleteCash)

module.exports = router