const express = require("express");
const router = express.Router();

// controllers
const { register, getUserData } = require("./auth.controller");

// validators
const { registerValidator } = require("./auth.validator");

// api routes;
router.post("/register", registerValidator, register);
// router.post("/register", getUserData);
router.get("/:id", getUserData);

module.exports = router;
