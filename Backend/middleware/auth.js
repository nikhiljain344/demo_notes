const jwt = require('jsonwebtoken');
const utills = require('../utills/utills');
const { validationResult } = require('express-validator');

function tokenVerification(req, res, next) {
    var token = req.header('Authorization');
    if (!token) return res.send(utills.createResult("Token is required", null, "The user is not logged in."));
    try {
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
            req.user = decoded;
            if (err) return res.send(utills.createResult(err, null, "Invailid token!"));
            next();
        });
    }
    catch (err) {
        return res.status(400).send(utills.createResult(err, null, "Somthing went worng"));
    }
}

function adminVerification(req, res, next) {
    if (req?.user?.role !== 'admin') return res.status(403).send(utill.createResult("Access denied", null, "User is not admin"));
    next();
}

function staffVerification(req, res, next) {
    if (req?.user?.role === 'staff' || req?.user?.role === 'admin') next();
    else return res.status(403).send(utills.createResult("Access denied", null, "User is not staff"));
}

function requestValidator(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(utills.createResult(errors.array(), null, "error found"));
    else next();
}

module.exports = {
    tokenVerification: tokenVerification,
    adminVerification: adminVerification,
    staffVerification: staffVerification,
    requestValidator: requestValidator,
}