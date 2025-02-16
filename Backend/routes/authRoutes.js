//omar
const express = require("express");
const { signIn,forgotPassword, resetPassword } = require("../controllers/authController");

const router = express.Router();

router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("sign in", signIn);
//module.exports = router;
