import express from 'express';
import userElements from '../index';
const adminRoutes = express.Router();


adminRoutes.get('/admin-list', (req, res, next) => {
	console.log("inside admin list");
	let users = new userElements(req, res, next);
	users.getAdmin();
});


export default adminRoutes;