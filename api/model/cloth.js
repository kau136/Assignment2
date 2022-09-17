
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clothSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true, },
        categories: { type: Array},
        size: { type: String },
        color: { type: String },
        price: { type: Number, required: true },
        img:{type:String,required:true}

    },
    { timestamps: true }
);

module.exports = mongoose.model('Cloth', clothSchema);