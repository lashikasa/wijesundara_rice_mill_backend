const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RiceSchema = new Schema(
    {
    riceType: { type: String, required: true },
    price: { type: Number, required: true },
   date: { type: String, default: () => {
  const now = new Date();
  return now.getFullYear() + '.' + 
         String(now.getMonth() + 1).padStart(2, '0') + '.' + 
         String(now.getDate()).padStart(2, '0');
}}
    }
);
const RicePri = mongoose.model.request||mongoose.model('RicePri', RiceSchema)

module.exports = RicePri;