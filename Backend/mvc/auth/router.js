const express = require("express");
const { body } = require("express-validator");
const { requestValidator, tokenVerification, } = require("../../middleware/auth");
const router = express.Router();
const controller = require("./controller");

// Routers
router.post("/signup",
    body('first_name').exists().trim().withMessage('First Name is required.'),
    body('last_name').exists().trim().withMessage('Last Name is required.'),
    body('email').exists().trim().withMessage('Email is required.'),
    body('password').exists().trim().withMessage('Password is required.'),
    requestValidator,
    controller.signup);

router.post("/signin",
    body('email').exists().trim().withMessage('Email is required.'),
    body('password').exists().trim().withMessage('Password is required.'),
    requestValidator,
    controller.signin);

router.post("/update-user",
    requestValidator,
    tokenVerification,
    controller.update);

module.exports = router;

