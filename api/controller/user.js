const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.postSignupData = async (req, res, next) => {
    try {
        const user = await new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            userType: req.body.userType
        }).save()
        res.status(200).json({
            new_user: user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        })
    }
}

exports.postLoginData = async (req, res, next) => {
    try {
        const user = await User.find({ email: req.body.email })
        if (user < 1) {
            res.status(401).json({
                msg: 'user not exist'
            })
        }
        const token = await jwt.sign(
            {
                username: user[0].username,
                email: user[0].email,
                phone: user[0].phone,
                userType: user[0].userType
            },
            process.env.JWTSECRET,
            { expiresIn: '1h' });
        res.status(200).json(
            {
                username: user[0].username,
                email: user[0].email,
                phone: user[0].phone,
                userType: user[0].userType,
                token: token
            })
        console.log(user, token)
    } catch (error) {
        res.status(401).json({
            error: error.message
        })

    }

}