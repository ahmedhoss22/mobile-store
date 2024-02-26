const express =require("express")
const router = express.Router()
const authControl = require("../controllers/auth.control")
const {registerationSchema , loginSchema , adminRegistration} = require("../validations/auth.validate")

const {validate} = require("../services/validate.service")

router.post("/register",validate(registerationSchema),authControl.register)
router.post("/register-admin",validate(adminRegistration),authControl.adminRegister)
router.post("/login",validate(loginSchema),authControl.login)

module.exports = router
