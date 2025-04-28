const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customers', required: true },    
    riceType: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number},
    date: { type: String, default: () => {
        const now = new Date();
        return now.getFullYear() + '.' + 
               String(now.getMonth() + 1).padStart(2, '0') + '.' + 
               String(now.getDate()).padStart(2, '0');
      }}

    }
);
Order.pre('save', function (next) {
    this.total = this.quantity * this.price;
    next();
});

Order.set('toJSON', { virtuals: true });
Order.set('toObject', { virtuals: true });
const order = mongoose.model('or', Order);

module.exports = order;