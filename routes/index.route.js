const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const branchRoutes = require("./branch.route")
const equipmentRoutes = require("./equipment.route")
const paymentsRoutes = require("./payments.route") 
const drawsRoutes = require("./draws.route")
const additionRoutes = require("./addition.route")
const cashRoutes = require("./cash.route")

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/branch", branchRoutes);
router.use("/equipment", equipmentRoutes);
router.use("/draws", drawsRoutes);
router.use("/payments", paymentsRoutes);
router.use("/addition", additionRoutes);
router.use("/cash", cashRoutes);

module.exports = router;
