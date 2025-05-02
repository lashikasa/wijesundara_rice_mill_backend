const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stock = new Schema(
    {
    Supplierid:{type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    Total: { type: Number, required: true },
    remaining: { type: Number, required: true },
    supplied:{type:Number,required:true},
    riceType: { type: String, required: true },
    date: { type: String, default: () => {
        const now = new Date();
        return now.getFullYear() + '.' + 
               String(now.getMonth() + 1).padStart(2, '0') + '.' + 
               String(now.getDate()).padStart(2, '0');
      }}
    }
);

Stock.set('toJSON', { virtuals: true });
Stock.set('toObject', { virtuals: true });
const Stocks = mongoose.model.request||mongoose.model('stock', Stock)

module.exports = Stocks;