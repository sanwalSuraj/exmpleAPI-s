import express from 'express';
var path = require('path');
const router = express.Router();

// router.use('/', express.static('app', { redirect: false }));

// // rewrite virtual urls to angular app to enable refreshing of internal pages
// router.get('*', function(req, res, next) {
//     res.sendFile(path.resolve('public/index.html'));
// });

export default router;