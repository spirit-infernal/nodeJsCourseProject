const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', check('email').isEmail().withMessage('Please enter a valid email').custom((value, {req}) => {
    if (value === "test@test.com") {
        throw new Error('This email address is forbidden');
    }
    return false;
}), 
body('password', 'Please enter a valid password containing only numbers and ext and at least 5 chars length')
.isLength({min: 5})
.isAlphanumeric(), 
body('confirmPassword')
.custom((value, { req }) => {
    return User.findOne({ email: value })
    .then(userDoc => {
      if (userDoc) {
        return Promise.reject('E-Mail exists already, please pick a different one');
      }
    })
}),
authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;