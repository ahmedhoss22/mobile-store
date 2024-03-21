const router = require("express").Router()
const additionCtl = require("../controllers/addition.control")
const { validate, validateParamsId } = require("../services/validate.service");
const { addAddition } = require("../validations/addition.validate");
const { authorizeAdmin, authorizeUser, } = require("../services/authenticate.service");

router.route("/")
    .post(authorizeUser, validate(addAddition), additionCtl.addAdditions)
    .get(authorizeUser, additionCtl.getAllAdditionses)

router.route("/:id",)
    .patch(validateParamsId, authorizeUser, additionCtl.updateAdditions)
    .delete(validateParamsId, authorizeUser, additionCtl.deleteAdditions)



module.exports = router