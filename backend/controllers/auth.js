const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator/check');

const User = require("../models/user");
const { TOKENSECRET } = process.env;

exports.postSignup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(422).json({
        //   msg: `Validation failed ${errors.array()}`
        // });
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const birthDate = req.body.birthDate;
    const image = req.file

    let imagePath;
    if (!image) {
        imagePath = 'images/defaultFood.png'
    } else {
        imagePath = image.path
        console.log(imagePath)
    }
    User.findOne({
        where: {
            email: email
        }
    })
        .then(user => {
            if (user) {
                return res.status(401).json({
                    message: `Email: ${email}, is already taken.`
                });
            }
        })
        .catch(err => {
            console.log(err);
        });

    bcrypt
        .hash(password, 10)
        .then(hashPw => {
            return User.create({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashPw,
                birthDate,
                gender,
                image: imagePath
            });
        })
        .then(result => {
            const token = jwt.sign(
                {
                    email: email,
                    userId: result.id
                },
                TOKENSECRET,
                { expiresIn: "1h" }
            );
            res.status(201).json({ token: token, user: result, message: "user has been created"});
        })
        .catch(err => {
            console.log(err);
        });

};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({
        where: {
            email: email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "Account not found." });
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                return res.status(401).json({ message: "Password is incorrect." });
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser.id
                },
                TOKENSECRET,
                { expiresIn: "1h" }
            );
            res.status(200).json({ token: token, user: loadedUser, message: "logged in successfully" });
        })
        .catch(err => {
            console.log(err);
        });
};
