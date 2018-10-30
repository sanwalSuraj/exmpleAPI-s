'use strict';

import Users from './../custom_modules/accounts/models/register.js';
import mongoose from 'mongoose';
let LocalStrategy = require('passport-local').Strategy;
let InstagramStrategy = require('passport-instagram').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
var GooglePlusStrategy = require('passport-google-plus');

module.exports = function(passport) {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            process.nextTick(function() {
                Users.findOne({ $or: [{ 'email': email }, { 'mobile': email }] }, function(err, user) {
                    // Don't give the HACKER any indication of their successes/failures, if they guess a correct email by us telling them "invalid password", they know they got a hit on the email and so it makes their task of breaking in that much easier!
                    var genericErrorMessage = "Invalid user";
                    var genericErrorMessage1 = "Login successfull";
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {
                            status: -1,
                            // generic "No!"
                            message: genericErrorMessage
                        });
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, {
                            status: -2,
                            // generic "No!"
                            message: genericErrorMessage
                        });
                    }
                    if (user) {
                            console.log("login: " + email + " successfull!");
                            return done(null, user);
                    }
                });
            });
        }
    ));

    passport.use(new FacebookStrategy({
            clientID: "1384327165008306",
            clientSecret: "99b054bba6a26a4e2a1ef78d3e08409b",
            callbackURL: "http://52.39.212.226:4089/auth/facebook/callback",
            profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                let users = new Users();
                Users.findOne({ "facebook.id": profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        try {
                            return done(null, true, user);
                        } catch (e) {
                            console.log("error:", e);
                        }
                        // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        let users = new Users();

                        // set all of the facebook information in our user model
                        users.facebook.id = profile.id;
                        users.facebook.email = profile.emails[0].value;
                        users.facebook.first_name = profile.name.givenName;
                        users.facebook.last_name = profile.name.familyName;

                        // save our user to the database
                        users.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, users);
                        });
                    }
                });
            });
        }
    ));
    passport.use(new InstagramStrategy({
            clientID: "264970ba5c844b949b65c66bc6bc6f97",
            clientSecret: "007e184cfe304c85b443a68dc2b534cb",
            callbackURL: "http://52.39.212.226:4089/auth/instagram/callback",
            //profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
        },
        function(accessToken, refreshToken, profile, done) {
            Users.findOne({ "instagram.id": profile.id }, function(err, user) {
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    try {
                        return done(null, true, user);
                    } catch (e) {
                        console.log("error:", e);
                    }
                    // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    let users = new Users();
                    // set all of the facebook information in our user model
                    users.instagram.id = profile.id;
                    users.instagram.displayName = profile.name.displayName;
                    users.instagram.username = profile.name.username;
                    // save our user to the database
                    users.save(function(err) {
                        if (err)
                            throw err;
                        // if successful, return the new user
                        return done(null, users);
                    });
                }
            });

        }
    ));

    passport.use(new GooglePlusStrategy({
            clientId: '437929951256-343s3728jabqhikthoacl2asqhccll06.apps.googleusercontent.com',
            clientSecret: 'uv8kqVLvnQX8oGcqTZKsSzR',
            callbackURL: 'http://52.39.212.226:4089/auth/google/callback',
        },
        function(tokens, profile, done) {
            // Create or update user, call done() when complete...
            done(null, profile, tokens);
        }
    ));
};