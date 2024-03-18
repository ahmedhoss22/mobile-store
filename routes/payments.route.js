const {
  authorizeAdmin,
  authorizeUser,
} = require("../services/authenticate.service");
const { validate, validateParamsId } = require("../services/validate.service");
const paymentsCtl = require("../controllers/payments.control");
const router = require("express").Router();
const { addPayment } = require("../validations/payments.validate");

router
  .route("/")
  .post(authorizeUser, validate(addPayment), paymentsCtl.addPament)
  .get(authorizeUser, paymentsCtl.getPayments);

router
  .route("/:id")
  .patch(validateParamsId, paymentsCtl.updatePayments)
  .delete(validateParamsId, paymentsCtl.deletePayment);

module.exports = router;
