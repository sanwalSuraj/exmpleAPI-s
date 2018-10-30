import express from 'express';
import passport from './../../../config/passport';
var jwt = require('express-jwt');
import ctrlAuth from '../authentication';
import middleware from '../../middlewares/middleware.js'
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

const registerRoutes = express.Router();

registerRoutes.post('/register', ctrlAuth.register);

registerRoutes.post('/login', ctrlAuth.login);
registerRoutes.post('/adminlogin', ctrlAuth.adminlogin);

registerRoutes.get('/logout', ctrlAuth.logout);

registerRoutes.post('/userList', ctrlAuth.userList);


registerRoutes.post('/updateData/:userId/:status', middleware.ensureAuthorized, ctrlAuth.updateData);

registerRoutes.post('/forgot', ctrlAuth.forgot);
registerRoutes.put('/updateAdminApproved/:id', ctrlAuth.updateAdminApproved);


registerRoutes.post('/resetPassword', ctrlAuth.resetPassword);
// registerRoutes.get('/admin-list',ctrlAuth.getAdmin);

// registerRoutes.post('/otp', ctrlAuth.setOtp);

// registerRoutes.post('/resendotp', ctrlAuth.resendotp);

registerRoutes.post('/addbaby', ctrlAuth.addbaby);


registerRoutes.get('/getData/:id', ctrlAuth.getData);
registerRoutes.post('/CreateUser', ctrlAuth.CreateUser);

registerRoutes.post('/editProfile', ctrlAuth.editProfile);
registerRoutes.post('/updateProfileImage', ctrlAuth.updateProfileImage);
registerRoutes.post('/updatePrescriptionImage', ctrlAuth.updatePrescriptionImage);



export default registerRoutes;