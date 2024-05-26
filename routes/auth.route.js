const express = require("express")
const router = express.Router()
const authControl = require("../controllers/auth.control")
const { registerationSchema, loginSchema, adminRegistration, balanceWhileLoginSchema } = require("../validations/auth.validate")
const { authorizeUser } = require("../services/authenticate.service")

const { validate } = require("../services/validate.service")

router.post("/register", validate(registerationSchema), authControl.register)

router.post("/register-admin", validate(adminRegistration), authControl.adminRegister)

router.post("/balance-login", authorizeUser, validate(balanceWhileLoginSchema), authControl.balanceWhileLogin)

router.post("/login", validate(loginSchema), authControl.login)

router.post("/logout", validate(loginSchema), authControl.logout)

module.exports = router
