import express from 'express';
import userElements from '../index';
const dashboardRoutes = express.Router();

dashboardRoutes.get('/users-list', (req, res, next) => {
	let users = new userElements(req, res, next);
	users.getUsers();
});

dashboardRoutes.get('/admindata', (req, res, next) => {
	let users = new userElements(req, res, next);
	users.getAdmin();
});

//----------Remove user-----------------------------//
dashboardRoutes.put('/remove-user/:userId',(req, res, next) => {
	let users = new userElements(req, res, next); //return;
  	users.removeUser();
});

//----------Remove admin-----------------------------//
dashboardRoutes.put('/remove-admin/:adminId',(req, res, next) => {
	let users = new userElements(req, res, next); //return;
  	users.removeAdmin();
});

dashboardRoutes.get('/adminData-edit',(req, res, next) => {
	let users = new userElements(req, res, next);
  	users.editAdmin();
});

dashboardRoutes.get('/users', (req, res, next) => {
	console.log("inside users");
	let users = new userElements(req, res, next);
	users.getUsersInfo();
});

export default dashboardRoutes;