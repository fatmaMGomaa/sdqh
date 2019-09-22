const express = require("express");
const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const Human = require('../models/human');
const Animal = require('../models/animal');

exports.postCase = (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     const error = new Error('Validation failed.');
    //     error.statusCode = 422;
    //     error.data = errors.array();
    //     throw error;
    // }

    const caseType = req.query.caseType;
    const name = req.body.name;
    const area = req.body.city;
    const address = req.body.address;
    const uniqueSign = req.body.uniqueSign;
    const description = req.body.description;
    const phone = req.body.mobileNumber;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const userId = req.body.userId;
    const image = req.file

    let imagePath;
    if (!image) {
        imagePath = 'images/defaultFood.png'
    } else {
        imagePath = image.path
        console.log(imagePath)
    }

    if(caseType === "human"){
        Human
            .create({ name, area, address, uniqueSign, description, phone, lat, lng, userId, image: imagePath})
            .then(result => {
                return res.status(201).json({ case: result, message: "human case was created successfully" });
            })
            .catch(error => {
                next(error);
            });
    } else if (caseType === "animal"){
        Animal
            .create({ name, area, address, uniqueSign, description, phone, lat, lng, userId, image: imagePath })
            .then(result => {
                return res.status(201).json({ case: result, message: "Animal case was created successfully" });
            })
            .catch(error => {
                next(error);
            });
    }
};