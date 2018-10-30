import passport from 'passport';
import './auth';

module.exports.checkBearerAuthorization = function(req,res,next){
      passport.authenticate('bearer', { session: false })(req,res,next);    
}

