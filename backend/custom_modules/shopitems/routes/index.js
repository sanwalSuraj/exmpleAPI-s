import express from 'express';
import passport from './../../../config/passport';
var jwt = require('express-jwt');
import ctrlShop from '../index.js';
import middleware from '../../middlewares/middleware.js'
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

const shopItemsRoutes = express.Router();

shopItemsRoutes.post('/createitem', ctrlShop.createitem);
shopItemsRoutes.post('/itemList', ctrlShop.itemList);
shopItemsRoutes.post('/editItems', ctrlShop.editItems);
shopItemsRoutes.get('/getData/:id', ctrlShop.getData);






export default shopItemsRoutes;