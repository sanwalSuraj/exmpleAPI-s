import express from 'express';
import passport from './../../../config/passport';
var jwt = require('express-jwt');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
import ctrlHealth from '../index';
import middleware from '../../middlewares/middleware.js'
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

const healthRoutes = express.Router();

healthRoutes.post('/Healthsteak', ctrlHealth.Healthsteak);
healthRoutes.post('/getDateRecord', ctrlHealth.getDateRecord);
healthRoutes.post('/HealthCall', ctrlHealth.HealthCall);
healthRoutes.post('/connect', (req, res) => {
    const response = new VoiceResponse();
    response.say(
        {
            voice: 'man',
            language: 'en-US',
        },
        'Time for taking medicine'
    );

    res.send(response.toString());
})

//healthRoutes.post('/compareDatearray', ctrlHealth.compareDatearray);




export default healthRoutes;