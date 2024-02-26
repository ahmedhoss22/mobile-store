const authRoutes = require("./auth.route");
const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");
const branchRoutes = require("./branch.route")
const equipmentRoutes = require("./equipment.route")

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/branch", branchRoutes);
router.use("/equipment", equipmentRoutes);

module.exports = router;
