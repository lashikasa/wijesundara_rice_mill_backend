const { response } = require('express');
const Bids = require('./models/bids.js');
const Supp = require('./models/supplier.js');
const Cus = require('./models/customer.js');
const OR = require('./models/order.js');
const RicePrice = require('./models/prices.js')


 const GETbids =async (req, res, next) =>{
    try {

        // const Supplierid = req.params.id;
        let Getbid;
        // Getbid = await Bids.findById({Supplierid})
        Getbid = await Bids.find()
           .then(response => {
                res.status(200).json(response);
            })
           .catch(err => {
                res.status(500).json({ error: "Error in fetching bids: " + err.message });
            });
    } catch (err) {
        res.status(500).json({ error: "Error in fetching bids: " + err.message });
    }
}

 const Createbid = async (req, res, next) => {
    try {
        // const SupplierId = req.user.id;
        const {supplierId,riceType, quantity, biddingPrice } = req.body;

        const newBid = new Bids({supplierId,riceType,quantity,biddingPrice});
        await newBid.save()
            .then(response => {
                res.status(201).json({ message: "Successfully added bid", data: response });
            })
            .catch(err => {
                res.status(500).json({ error: "Error in creating bid: " + err.message });
            });

    } catch (err) {
        res.status(500).json({ error: "Error in creating bid: " + err.message });
    }
}

const GetbidById = async (req, res, next) =>{
    try {
        const id = req.params.id;
        let Getbid;
        Getbid = await Bids.findById(id)
           .then(response => {
                if (!response) return res.status(404).json({ message: "Bid not found" });
                res.json({ message: "Bid found", data: response });
            })
           .catch(err => {
                res.status(500).json({ error: "Error in fetching bid: " + err.message });
            });
    } catch (err) {
        res.status(500).json({ error: "Error in fetching bid: " + err.message });
    }
 };

 const Updatebid = async (req, res, next) => {
    const id = req.params.id;
    const { riceType, quantity, biddingPrice } = req.body;

    try {
    
        const updatedBid = await Bids.findByIdAndUpdate(
            id,
            { riceType, quantity, biddingPrice },
            { new: true } 
        );

        if (!updatedBid) {
            return res.status(404).json({ message: "Bid not found" });
        }

        return res.status(200).json({
            message: "Successfully updated bid",
            data: updatedBid
        });

    } catch (err) {
        return res.status(500).json({ error: "Error in updating bid: " + err.message });
    }
};


 const Deletebid = async (req, res, next) =>{
    try{
        const id = req.params.id;
        let detbid;
        detbid = await Bids.findByIdAndDelete(id)
            .then(response => {
                return res.status(200).json({
                    message: "Successfully Deleted bid"});
            })
            .catch(err => {
                res.json("Error in deleting bid" + err.message, {status: 500});
            });
    }catch(err){
        res.json("Error in deleting bid" + err.message, {status: 500});
    }
}
exports.GETbids = GETbids;

exports.Createbid = Createbid;

exports.Updatebid = Updatebid;

exports.Deletebid = Deletebid;

exports.GetbidById = GetbidById;

const LoginSupplier = async (req, res) => {
    try {
        const { supplierEmail, supplierPassword } = req.body;

        
        const supplier = await Supp.findOne({ supplierEmail });
        if (!supplier) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        
        const isMatch = await bcrypt.compare(supplierPassword, supplier.supplierPassword);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

    
        const token = jwt.sign({ id: supplier._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });

    } catch (err) {
        res.status(500).json({ error: "Error in logging in: " + err.message });
    }
};


const GetbidByIdSupplier = async (req, res, next) =>{
    try {
        const id = req.params.id;
        let Getsupplier;
        Getsupplier = await Supp.findById(id)
           .then(response => {
                if (!response) return res.status(404).json({ message: "supplier not found" });
                res.json({ message: "supplier found", data: response });
            })
           .catch(err => {
                res.status(500).json({ error: "Error in fetching bid: " + err.message });
            });
    } catch (err) {
        res.status(500).json({ error: "Error in fetching bid: " + err.message });
    }
 };

 const Createsupplier = async (req, res, next) => {
    try {

        const existingSupplier = await Supp.findOne({ supplierEmail });
        if (existingSupplier) {
            return res.status(400).json({ error: "Supplier already exists" });
        }

        const {supplier_name,supplierPassword,supplierEmail,supplier_contact,supplier_address_line_one,supplier_address_line_two,supplier_address_city} = req.body;

        const newSup = new Supp({supplier_name,supplierPassword,supplierEmail,supplier_contact,supplier_address_line_one,supplier_address_line_two,supplier_address_city});
        await newSup.save()
        const token = jwt.sign({ id: savedSupplier._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
            .then(response => {
                res.status(201).json({ message: "Successfully added New Supplier", data: response });
            })
            .catch(err => {
                res.status(500).json({ error: "Error in creating Supplier: " + err.message });
            });

    } catch (err) {
        res.status(500).json({ error: "Error in creating supplier: " + err.message });
    }
}

const Deletesupplier = async (req, res, next) =>{
    try{
        const id = req.params.id;
        let detSup;
        detSup = await Supp.findByIdAndDelete(id)
            .then(response => {
                return res.status(200).json({
                    message: "Successfully Deleted Supplier"});
            })
            .catch(err => {
                res.json("Error in deleting Supplier" + err.message, {status: 500});
            });
    }catch(err){
        res.json("Error in deleting suppplier" + err.message, {status: 500});
    }
}

const UpdateSupplier = async (req, res, next) => {
    const id = req.params.id;
    const { supplier_name,supplierPassword,supplierEmail,supplier_contact,supplier_address_line_one,supplier_address_line_two,supplier_address_city } = req.body;

    try {
    
        const updatedSupp = await Supp.findByIdAndUpdate(
            id,
            { supplier_name,supplierPassword,supplierEmail,supplier_contact,supplier_address_line_one,supplier_address_line_two,supplier_address_city },
            { new: true } 
        );

        if (!updatedSupp) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        return res.status(200).json({
            message: "Successfully updated ",
            data: updatedSupp
        });

    } catch (err) {
        return res.status(500).json({ error: "Error in updating bid: " + err.message });
    }
};

exports.LoginSupplier =LoginSupplier;

exports.GetbidByIdSupplier = GetbidByIdSupplier;

exports.Createsupplier = Createsupplier;

exports.Deletesupplier = Deletesupplier;

exports.UpdateSupplier = UpdateSupplier;

const Logincustomer = async (req, res) => {
    try {
        const { CEmail, CPassowrd } = req.body;

        
        const customer = await Cus.findOne( CEmail );
        if (!customer) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        
        const isMatch = await bcrypt.compare(CPassowrd, customer.CPassowrd);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

    
        const token = jwt.sign({ id: supplier._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });

    } catch (err) {
        res.status(500).json({ error: "Error in logging in: " + err.message });
    }
};

 const GetbidByIdCustomer = async (req, res, next) =>{
    try {
        const id = req.params.id;
        let Getcustomer;
        Getcustomer = await Cus.findById(id)
        
        
           .then(response => {
                if (!response) return res.status(404).json({ message: "customer not found" });
                res.json(response);
            })
           .catch(err => {
                res.status(500).json({ error: "Error in fetching customer: " + err.message });
            });
    } catch (err) {
        res.status(500).json({ error: "Error in fetching custmer: " + err.message });
    }
 };

 const Createcustomer = async (req, res, next) => {
    try {
        const {Cname,CEmail,CPassowrd,supplier_contact,customer_address_line_one,customer_address_line_two,customer_address_city} = req.body;

        const newCup = new Cus({Cname,CEmail,CPassowrd,supplier_contact,customer_address_line_one,customer_address_line_two,customer_address_city});
        await newCup.save()
            .then(response => {
                res.status(201).json({ message: "Successfully added New Customer", data: response });
            })
            .catch(err => {
                res.status(500).json({ error: "Error in creating Customer: " + err.message });
            });

    } catch (err) {
        res.status(500).json({ error: "Error in creating customer: " + err.message });
    }
}

const Deletecus = async (req, res, next) =>{
    try{
        const id = req.params.id;
        let deCup;
        detCup = await Cus.findByIdAndDelete(id)
            .then(response => {
                return res.status(200).json({
                    message: "Successfully Deleted Customer"});
            })
            .catch(err => {
                res.json("Error in deleting Customer" + err.message, {status: 500});
            });
    }catch(err){
        res.json("Error in deleting customer" + err.message, {status: 500});
    }
}

const UpdateCus = async (req, res, next) => {
    const id = req.params.id;
    const { Cname,CEmail,CPassowrd,supplier_contact,customer_address_line_one,customer_address_line_two,customer_address_city } = req.body;

    try {
    
        const updatedCus = await Cus.findByIdAndUpdate(
            id,
            { Cname,CEmail,CPassowrd,supplier_contact,customer_address_line_one,customer_address_line_two,customer_address_city },
            { new: true } 
        );

        if (!updatedCus) {
            return res.status(404).json({ message: "Customer not found" });
        }

        return res.status(200).json({
            message: "Successfully updated ",
            data: updatedCus
        });

    } catch (err) {
        return res.status(500).json({ error: "Error in updating : " + err.message });
    }
};


exports.Logincustomer = Logincustomer;

exports.GetbidByIdCustomer = GetbidByIdCustomer;

exports.Createcustomer = Createcustomer;

exports.Deletecus = Deletecus;

exports.UpdateCus = UpdateCus;

const GETorderdet =async (req, res, next) =>{
    try {

        // const Customerid = req.params.id;
        let Getbid =await OR.find()
        // Getbid = await OR.findById({custoemerId:Customerid})
           .then(response => {
                res.status(200).json(response );
            })
           .catch(err => {
                res.status(500).json({ error: "Error in fetching order details: " + err.message });
            });
    } catch (err) {
        res.status(500).json({ error: "Error in fetching : " + err.message });
    }
}

 const CreateOrder = async (req, res, next) => {
    try {
        // const CustomerId = req.params.id;
        const {customerId, riceType, quantity, price, total} = req.body;


        const newBid = new OR({customerId,riceType,quantity,price,total});
        await newBid.save()
            .then(response => {
                res.status(201).json({ message: "Successfully place an order", data: response });
            })
            .catch(err => {
                res.status(500).json({ error: "Error in creating order: " + err.message });
            });

    } catch (err) {
        res.status(500).json({ error: "Error in creating order: " + err.message });
    }
}

const GetbidByIdOrder = async (req, res, next) =>{
    try {
        const id = req.params.id;
        let Getbid;
        Getbid = await OR.findById({id})
           .then(response => {
                if (!response) return res.status(404).json({ message: "Bid not found" });
                res.json({ message: "Bid found", data: response });
            })
           .catch(err => {
                res.status(500).json({ error: "Error in fetching bid: " + err.message });
            });
    } catch (err) {
        res.status(500).json({ error: "Error in fetching bid: " + err.message });
    }
 };

 const UpdateOrder = async (req, res, next) => {
    const id = req.params.id;
    const { riceType, quantity} = req.body;

    try {
    
        const updatedBid = await OR.findByIdAndUpdate(
            id,
            { riceType, quantity, biddingPrice },
            { new: true } 
        );

        if (!updatedBid) {
            return res.status(404).json({ message: "ORder not found" });
        }

        return res.status(200).json({
            message: "Successfully updated order",
            data: updatedBid
        });

    } catch (err) {
        return res.status(500).json({ error: "Error in updating : " + err.message });
    }
};


 const DeleteORder = async (req, res, next) =>{
    try{
        const id = req.params.id;
        let detorder;
        detorder = await OR.findByIdAndDelete(id)
            .then(response => {
                return res.status(200).json({
                    message: "Successfully Deleted Ordr"});
            })
            .catch(err => {
                res.json("Error in deleting " + err.message, {status: 500});
            });
    }catch(err){
        res.json("Error in deleting" + err.message, {status: 500});
    }
}

exports.GETorderdet = GETorderdet;

exports.CreateOrder = CreateOrder;

exports.GetbidByIdOrder = GetbidByIdOrder;

exports.UpdateOrder = UpdateOrder;

exports.DeleteORder = DeleteORder;


const GETricePrcie =async (req, res, next) =>{
    try {

        
        let Getbid =await RicePrice.find()
        // Getbid = await OR.findById({custoemerId:Customerid})
           .then(response => {
                res.status(200).json(response );
            })
           .catch(err => {
                res.status(500).json({ error: "Error in fetching order details: " + err.message });
            });
    } catch (err) {
        res.status(500).json({ error: "Error in fetching : " + err.message });
    }
}

exports.GETricePrcie = GETricePrcie;