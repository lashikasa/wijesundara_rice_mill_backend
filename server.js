const express = require('express');
const dotenv = require('dotenv');
const db_connection = require('./utils/db');
const stock_router = require('./routes/stock');
const bids_router = require('./routes/bids');
const customer_router = require('./routes/customer');
const supplier_router = require('./routes/supplier');
const order_router = require('./routes/order');
const RicePrice_router = require('./routes/Riceprice');
const cors = require('cors');




dotenv.config()


const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended : false}))



const PORT = process.env.PORT || 8080



app.use('/api/riceprice', RicePrice_router);
app.use('/api/stock', stock_router);
app.use('/api/bids', bids_router);
app.use('/api/supplier', supplier_router);
app.use('/api/customer', customer_router);
app.use('/api/order', order_router);

db_connection()

app.listen(PORT, ()=> {
    console.log(`Backend server running in port ${PORT}`)
})
