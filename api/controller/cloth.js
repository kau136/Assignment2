const express = require("express");
const mongoose = require("mongoose");
const Cloth = require("../model/cloth");
const multer=require('multer');
const path=require('path');
const fs = require('fs');


exports.getCloth = async (req, res, next) => {
    try {
        const clothData = await Cloth.find()
        console.log(clothData);
        res.status(200).json({
            clothData: clothData
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getClothById = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const clothDataById = await Cloth.findById(req.params.id)
        console.log(clothDataById);
        res.status(200).json({
            cloth: clothDataById
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
exports.postCloth = async (req, res, next) => {
    try {
        const cloth = await new Cloth({
            title: req.body.title,
            desc: req.body.desc,
            price: req.body.price,
            color: req.body.color,
            size: req.body.size,
            categories: req.body.categories,
            img:req.file.destination + '/' + req.file.filename,
        }).save()
        console.log(cloth);
        res.status(200).json({
            newcloth: cloth
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.deleteClothById = async (req, res, next) => {
    try {
        const deleteclothData = await Cloth.remove({ _id: req.params.id })
        console.log('Record Deleted Successfully!......');
        res.status(200).json({
            message: 'record deleted',
            result: deleteclothData

        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.updateClothById = async (req, res, next) => {
    try {
        const updateDataById = await Cloth.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
                desc: req.body.desc,
                img:req.file.destination + '/' + req.file.filename,
                price: req.body.price,
                color: req.body.color,
                size: req.body.size,
                categories: req.body.categories
            }
        }, { new: true })
        res.status(200).json({
            msg: "Record updated successfully!!!",
            updated_record: updateDataById
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}