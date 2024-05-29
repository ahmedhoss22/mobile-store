const reportCtl = require("../controllers/reportControl")
const router = require("express").Router()
const { authorizeUser } = require("../services/authenticate.service")

router.get("/payments", authorizeUser, reportCtl.payments)
router.get("/draw", authorizeUser, reportCtl.draws)
router.get("/additions", authorizeUser, reportCtl.additions)
router.get("/cash-deposite", authorizeUser, reportCtl.cashDeposite)
router.get("/cash-withdraw", authorizeUser, reportCtl.cashWithdraw)
router.get("/commission", authorizeUser, reportCtl.comission)

module.exports = router
