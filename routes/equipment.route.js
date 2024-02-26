const equipmentCtl = require("../controllers/equipment.control");
const { validate, validateParamsId } = require("../services/validate.service");
const router = require("express").Router();
const { addEquipment } = require("../validations/equipment.validate");
const {
  authorizeAdmin,
  authorizeUser,
} = require("../services/authenticate.service");

router
  .route("/")
  .post(authorizeAdmin, validate(addEquipment), equipmentCtl.addEquipment);

router
  .route("/:id")
  .get(validateParamsId,equipmentCtl.getAllEquipmentes)
  .delete(validateParamsId,authorizeAdmin, equipmentCtl.deleteEquipment)
  .patch(validateParamsId,authorizeAdmin, equipmentCtl.updateEquipment);

module.exports = router;
