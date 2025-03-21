const express = require('express');
const routers = express.Router();
const contrl = require('../controller');


routers.get('/', contrl.GETbids,(req, res) => {
    res.status(200).json(response)
    });
// routers.get('/', contrl.GETbids,(req, res) => {
//     res.status(200).json({
//         message:'bids data',data:response
//     })
//     });
routers.post('/', contrl.Createbid);
routers.put('/:id', contrl.Updatebid);
routers.delete('/:id', contrl.Deletebid);
routers.get('/:id', contrl.GetbidById);


module.exports = routers;