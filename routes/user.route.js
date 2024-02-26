const express = require("express")
const router = express.Router()
const {authorizeUser ,authorizeAdmin} =require("../services/authenticate.service")
const userCtl =require("../controllers/user.control")
const {validate , validateParamsId} = require("../services/validate.service")

router.get("/data", authorizeUser , userCtl.getUserData)
router.get("/data/all", authorizeAdmin , userCtl.getAllUsers)
router.delete("/:id", validateParamsId,authorizeAdmin , userCtl.deleteUser)
router.patch("/", authorizeUser , userCtl.updateUser)
router.post("/new-user", authorizeAdmin , userCtl.addUser)

module.exports = router
