const express = require('express');
const routers = express.Router();
const contrl = require('../controller');


routers.get('/', contrl.GETbids)
routers.post('/', contrl.Createbid);
routers.put('/:id', contrl.Updatebid);
routers.delete('/:id', contrl.Deletebid);
routers.get('/:id', contrl.GetbidById);


module.exports = routers;