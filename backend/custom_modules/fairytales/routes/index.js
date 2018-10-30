
import express from 'express';
import fairyElements from '../index';
const fairytaleRoutes = express.Router();

fairytaleRoutes.post('/addFairyTale', (req, res, next) => {
	let fairytale = new fairyElements(req, res, next);
	fairytale.getfairytale();
});


fairytaleRoutes.post('/updateStatus',(req, res, next) => {
	let fairytale = new fairyElements(req, res, next);
	fairytale.updateData(req.body);
});

fairytaleRoutes.get('/FairyTaleData',(req,res,next)=>{
	
	let fairytale = new fairyElements(req,res,next);
	fairytale.getData();
})
fairytaleRoutes.get('/getFairytaleList', (req, res, next) => {
	let fairytale = new fairyElements(req, res, next);
	fairytale.getfairytaleData();
});

export default fairytaleRoutes;
