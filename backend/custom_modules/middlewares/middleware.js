var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

module.exports.ensureAuthorized = function(req, res, next) {
  console.log("11111111111111111111111");
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['bearer'];
  // decode token
  if (token) {
    console.log("22222222222222222222",token);
    // verifies secret and checks exp
    jwt.verify(token,'MY_SECRET', function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        console.log('decoded',decoded.exp);
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
}