import express from 'express';
import userElements from '../index';
import userstatus from '../index';
const userRoutes = express.Router();


//----------Edit user data------------------------------//
userRoutes.get('/userData-edit',(req, res, next) => {
	let users = new userElements(req, res, next);
  	users.editUser();
});

//----------update user data------------------------------//
userRoutes.post('/updateUser',(req, res, next) => {
	let users = new userElements(req, res, next);
  	users.UpdateUser(req.body);
});


userRoutes.post('/updateStatus',(req, res, next) =>{
	let users = new userElements(req, res, next);
	users.updateStatus(req.body);
	
});
export default userRoutes;