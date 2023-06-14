const express = require("express");
const { body, param } = require("express-validator");
const { requestValidator, tokenVerification, } = require("../../middleware/auth");
const router = express.Router();
const controller = require("./controller");

// Routers
router.post("/create",
    body('title').exists().trim().withMessage('Title is required.'),
    body('description').exists().trim().withMessage('Description is required.'),
    requestValidator,
    tokenVerification,
    controller.create);

router.post("/get-all",
    tokenVerification,
    controller.getAll);

router.post("/update",
    body('id').exists().trim().withMessage("Note's id is required."),
    requestValidator,
    tokenVerification,
    controller.update);

router.delete("/delete/:id",
    param('id').exists().trim().withMessage("Note's id is required."),
    requestValidator,
    tokenVerification,
    controller.delete);

module.exports = router;