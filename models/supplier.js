const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Supplier = new Schema(
    {

    supplierPassword: { type: String, required: true },
    supplier_name : {
        type : String,
        required : true
    },
    supplier_contact : {
        type : String,
        required : true
    },
    supplier_address_line_one : {
        type : String,
        required : true
    },
    supplier_address_line_two : {
        type : String,
        required : false
    },
    supplier_address_city : {
        type : String,
        required : true
    },
    supplierEmail: { type: String, required: true },


    }
);

const Suppliers = mongoose.model('Supplier', Supplier)
module.exports = Suppliers;