const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema(
    {
    Cname: { type: String, required: true },
    CEmail: { type: String, required: true },
    CPassowrd: { type: String, required: true },
    supplier_contact : {
        type : String,
        required : true
    },
    customer_address_line_one : {
        type : String,
        required : true
    },
    customer_address_line_two : {
        type : String,
        required : false
    },
    customer_address_city : {
        type : String,
        required : true
    },
    
    }
);
const customers = mongoose.model('customers', Customer)

module.exports = customers;
