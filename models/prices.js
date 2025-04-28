const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RiceSchema = new Schema(
    {
    riceType: { type: String, required: true },
    price: { type: Number, required: true },
    }
);
const RicePri = mongoose.model.request||mongoose.model('RicePri', RiceSchema)

module.exports = RicePri;