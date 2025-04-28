const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BidSchema = new Schema(
    {
    
    supplierId:{type:String, ref: 'supplier', required: true},
    riceType: { type: String, required: true },
    quantity: { type: Number, required: true },
    biddingPrice: { type: Number, required: true },
   date: { type: String, default: () => {
  const now = new Date();
  return now.getFullYear() + '.' + 
         String(now.getMonth() + 1).padStart(2, '0') + '.' + 
         String(now.getDate()).padStart(2, '0');
}}
    }
);
const Bids = mongoose.model.request||mongoose.model('Bids', BidSchema)

module.exports = Bids;
