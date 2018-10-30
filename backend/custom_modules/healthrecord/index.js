import express from 'express';
import jwt from 'jsonwebtoken';
import Healthrecord from './models/healthrecords.js';
import Users from '../accounts/models/register.js';
import passport from 'passport';
import mongoose from 'mongoose';
var moment = require('moment');
import async from 'async';
import otplib from 'otplib';
import multer from 'multer';
import formidable from 'formidable';
import fs, { read } from 'fs';
import path from 'path'
import AWS from 'aws-sdk';
import shortid from 'shortid';
const VoiceResponse = require('twilio').twiml.VoiceResponse;



var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

function sendResponse(req, res, outputJson) {
    try {
        return res.status(outputJson.status).jsonp(outputJson);
    } catch (e) {
        // console.log("e:", e);
    }
}



module.exports.Healthsteak = function (req, res) {
    let record = new Healthrecord();
    record.status = req.body.status;
    record.today_dose = req.body.today_dose;
    record.reddi_score = req.body.reddi_score;
    record.cycle_complete = req.body.cycle_complete;
    record.userId = mongoose.Types.ObjectId(req.body.userId);
    var newdate = new Date(req.body.eventDate);
    newdate.setHours(0, 0, 0, 0);
    record.eventDate = newdate;
    if (req.body.eventDate) {
        Healthrecord.findOneAndUpdate({ userId: record.userId, eventDate: record.eventDate }, { $set: { status: 1, today_dose: true } }, function (eErr, eRes) {
            if (eRes) {

                // check if streak made
                streakCheckUpdate(req.body.userId, req.body.eventDate).then((streakRes) => {

                    console.log(streakRes);
                    console.log(streakRes.length);
                    console.log('checking rstreak res');
                    res.json({
                        data: eRes
                    });
                }).catch(() => {

                    res.json({
                        data: eRes
                    });
                });


            } else {

                // check if streak made
                streakCheckUpdate(req.body.userId, req.body.eventDate).then((streakRes) => {

                    record.save((err, track) => {
                        if (track) {

                            res.json({ data: track })
                        } else {
                            console.log(err, "error");
                        }
                    })
                }).catch(() => {

                    record.save((err, track) => {
                        if (track) {

                            res.json({ data: track })
                        } else {
                            console.log(err, "error");
                        }
                    })
                });
            }
        });
    } else {
        console.log('in else')
    }
}

module.exports.getDateRecord = function (req, res) {
    let users = new Users();
    let record = new Healthrecord();
    let resultArr = [];
    let todaysDate = new Date(req.body.eventDate); // from post
    todaysDate.setHours(0, 0, 0, 0);
    let datesArr = [];
    datesArr.push(todaysDate);
    let copiedDate = new Date(todaysDate.getTime());
    for (let i = 0; i < 6; i++) {

        copiedDate = new Date(copiedDate.getTime());
        copiedDate.setDate(copiedDate.getDate() - 1);
        datesArr.unshift(copiedDate);
    }
    let sampleArr = [];

    Healthrecord.find({ "userId": req.body.userId, eventDate: { $gte: datesArr[0] }, eventDate: { $lte: datesArr[datesArr.length - 1] } }).then((healthRes) => {
        datesArr.forEach((thisDate) => {
            let dateToCompare = new Date(thisDate);
            dateToCompare.setHours(0);
            dateToCompare.setMinutes(0);
            dateToCompare.setSeconds(0);

            let currentDate = new Date();
            currentDate.setHours(0);
            currentDate.setMinutes(0);
            currentDate.setSeconds(0);
            currentDate.setMilliseconds(0)

            console.log("sajhkdsajk", currentDate, dateToCompare)

            if (dateToCompare.getTime() === currentDate.getTime()) {
                resultArr.push({
                    userId: req.body.userId,
                    eventDate: thisDate,
                    status: 2,
                });

            } else {


                let validObj = checkInResults(thisDate, healthRes);
                if (validObj) {
                    resultArr.push(validObj);
                }
                else {
                    resultArr.push({
                        userId: req.body.userId,
                        eventDate: thisDate,
                        status: 0,
                    });
                }
            }
        });

        res.send(resultArr);
    }).catch((healthErr) => {
    });
};

function streakCheckUpdate(userId, eventDate) {

    return new Promise((resolve, reject) => {

        let record = new Healthrecord();
        let users = new Users();
        // userId: record.userId, eventDate: record.eventDate
        let queryUserId = mongoose.Types.ObjectId(userId);


        let todaysDate = new Date(eventDate); // from post
        todaysDate.setHours(0, 0, 0, 0);
        let datesArr = [];
        datesArr.push(todaysDate);
        let copiedDate = new Date(todaysDate.getTime());
        for (let i = 0; i < 6; i++) {

            copiedDate = new Date(copiedDate.getTime());
            copiedDate.setDate(copiedDate.getDate() - 1);
            datesArr.unshift(copiedDate);
        }


        Healthrecord.find({ userId: userId, eventDate: { $gte: datesArr[0] }, eventDate: { $lte: datesArr[datesArr.length - 1] } }).then((healthRecords) => {

            if (healthRecords.length >= 7) {
                let makesStreak = true;
                healthRecords.forEach((healthRecord) => {
                    if (healthRecord.status !== 1) {
                        makesStreak = false;
                    }
                });
                if (makesStreak) {

                    Healthrecord.find({ userId: userId }).sort('eventDate desc').then((streakCalRes) => {


                        if (streakCalRes.length) {
                            let previous;
                            let diff;
                            let streakMakers = 0;
                            let totalStreak = 0;
                            streakCalRes.forEach((eventLogged) => {

                                // console.log(eventLogged.eventDate.getTime())
                                if (previous) {
                                    diff = eventLogged.eventDate.getTime() - previous;
                                    // console.log('haha ' + diff)

                                    if (diff == 86400000) {
                                        /// sahi
                                        streakMakers++;
                                    }
                                    else {
                                        streakMakers = 0;
                                    }

                                    if (streakMakers == 7) {
                                        totalStreak++;
                                        streakMakers = 0;
                                    }
                                }
                                previous = eventLogged.eventDate.getTime();
                            });
                            console.log('TOTAL STREAKS ' + totalStreak);
                            Users.update({ _id: queryUserId }, { $set: { streak: totalStreak } }).then((userUpRes) => {

                            }).catch((userUpErr) => {

                            });
                        }
                        else {

                        }
                    }).catch((streakCalErr) => {

                    });
                    console.log('bangai')
                    resolve('bangai');
                }
                else {
                    console.log('nahi')
                    resolve('nahi');
                }
            }
            else {
                resolve('nahiiii');
            }
        }).catch((healthRecordsErr) => {

            reject(healthRecordsErr);
        });

    });
}

function checkInResults(date, sampleArr) {

    let returnObj;
    for (let j = 0; j < sampleArr.length; j++) {
        if (sampleArr[j].eventDate.getTime() == date.getTime()) {
            returnObj = sampleArr[j];
            console.log("sdn,amdn", returnObj);
            break;
        }
        else {
            returnObj = false;
        }
    }
    return returnObj
}




module.exports.HealthCall = function (req, res) {

    var accountSid = 'ACdcf7c9db9a043b9cfe640c7d515b8b04';
    var authToken = '6cb5a07594eb65d4e73558d85f1e7572';
    var client = require('twilio')(accountSid, authToken);

    client.calls.create({
        url: 'http://example.com/connect',
        to: '+18559972877',
        from: '+12392375745'
    }, function (err, call) {
        if (err) { console.error('There was a problem starting the call: ', err); }
        console.log(`Call with sid: ${call.sid} was started`);
    });

}

