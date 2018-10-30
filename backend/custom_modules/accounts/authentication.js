import express from 'express';
import jwt from 'jsonwebtoken';
import Users from './models/register.js';
import passport from 'passport';
import mongoose from 'mongoose';
import async from 'async';
import smsToUser from '../../common/notification.js';
const nodemailer = require('nodemailer');
import otplib from 'otplib';
import multer from 'multer';
import formidable from 'formidable';
import fs, { read } from 'fs';
import path from 'path'
import AWS from 'aws-sdk';
import shortid from 'shortid';


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

module.exports.register = function (req, res) {
    console.log("dfsfsf", req.body)
    let users = new Users();
    users.email = req.body.email;
    users.role = req.body.role;
    Users.findOne({ email: req.body.email }, function (eErr, eRes) {
        if (eRes) {
            console.log("email matches");
            res.json({
                status: 403,
                error: true,
                msg: 'Email already exists.'
            });
        } else {

            var token = users.generateJwt();
            users.setPassword(req.body.password);
            users.save(function (err, user) {
                if (user) {
                    console.log("saved", user)
                    var data = {

                        "reddi_score": 0,

                    }
                    res.json({
                        status: 200,
                        //  token:token,
                        msg: 'Registered successfully',
                        data: data
                    });
                }

            });
        }
    });
    //};

    // if(Object.keys(users).length > 0) {
    //     Object.keys()
    // }

    // Users.findOne({ email: req.body.email }, function(err, rec) {
    //     if (rec) {
    //        // if (rec.status == true) {
    //             response.json({
    //                 status: 403,
    //                 error: true,
    //                 msg: 'Email already exists'
    //             });
    // } 
    //else {
    //     try{
    //     const secret = otplib.authenticator.generateSecret();
    //     var otp = otplib.authenticator.generate(secret);
    //     users.otp = otp;

    //     const otptime = new Date();
    //     var getotptime = otptime.getMinutes();

    //     users.getotptime = getotptime;
    //     var msg = "Dear user, your OTP is" + " " + users.otp + "." + "Now enter your secret OTP to be a member of babyApp.";
    //     smsToUser.smsToUser('+' + users.mobile, msg, function(err, res) {
    //         if (res) {
    //             response.json({
    //                 status: 502,
    //                 type: true,
    //                 token: token,
    //                 msg: "User registered but not verified",
    //                 mobile: users.mobile
    //             });
    //         } else {
    //             response.json({
    //                 status: 400,
    //                 msg: "Invalid Mobile Number"
    //             });
    //         }
    //     });
    //     }
    //     catch(e){
    //         console.log("hhddadasdaddajdas",e);
    //     }
    // }

    //  } //else {
    // Users.findOne({ 'mobile': users.mobile }, function(err, resp) {
    //     if (resp) {
    //         res.json({
    //              status:403,
    //             error: true,
    //             msg: 'Mobile number already exists'
    //         });
    //     }
    //else {
    // else if (((req.body.socialmedia == 1) && (!req.body.password)) || ((req.body.socialmedia == 2) && (!req.body.password))) {
    //     console.log("inside socialmedia");
    //     var token = users.generateJwt();
    //     users.save(function(err) {
    //         res.status(200);
    //         res.json({
    //             type: true,
    //             token: token
    //         });
    //     });
    //}
    // else {
    //    console.log("ssdasdasdas")
    // const secret = otplib.authenticator.generateSecret();
    // var otp = otplib.authenticator.generate(secret);
    // users.otp = otp;

    //     const otptime = new Date();
    //     var getotptime = otptime.getMinutes();

    // users.getotptime = getotptime;
    // var token = users.generateJwt();
    // users.setPassword(req.body.password);
    // users.save(function(err, resp) {

    //     if (resp ) {
    //         console.log("registration successfull");
    // var msg = "Dear user, your OTP is" + " " + users.otp + "." + "Now enter your secret OTP to be a member of babyApp.";
    // smsToUser.smsToUser('+' + users.mobile, msg, function(err, res) {
    //     if (res) {
    //         // users.save(function(err, resp) {
    //         // if (resp) {
    // response.json({
    //     status: 200,
    //     type: true,
    //     token: token,
    //     msg: "Registered successfully"
    // });
    // }
    //         //});
    //     } else {
    //         response.json({
    //             status: 400,
    //             msg: "Invalid Mobile Number"
    //         });
    //     }

    // });
    //        }
    //        else {
    //                    console.log("registration unsuccessfull");
    //                }
    //    });
    // } 
    //else {
    //     res.json({
    //         msg: "validation failed"
    //     });
    // }
    //});
};

module.exports.login = function (req, res) {
    console.log("login entry");

    passport.authenticate('local', function (err, user, info) {
        console.log("dssadsad", info, user);

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
            console.log("login error", err);
        }
        if (user) {
            var token = user.generateJwt();
            console.log("login success");
            res.json({
                status: 200,
                user: user,
                token: token
            });
        } else {
            res.json({
                status: 400,
                msg: "Invalid Credentials"
            });
        }
        //     if (user.role == "user") {
        //         console.log("user", user);
        //         if (user.baby.length > 0) {
        //             res.json({
        //                 status: 200,
        //                 token: token,
        //                 email: user.email,
        //                 msg: "user has a baby"
        //             });
        //         }
        //         else {
        //             res.json({
        //                 status: 400,
        //                 token: token,
        //                 email: user.email,
        //                 msg: "user doesnot have a baby"
        //             });
        //         }
        //         // } else if (user.role == "user" && user.status == false) {
        //         //     res.json({
        //         //         status: 401,
        //         //         msg: "user not authorized"
        //         //     })
        //     }
        //     //else if(user.role == "user" && user.status)
        //     else if (user.role == "superadmin") {
        //         var userId = user._id

        //         //res.status(200);
        //         res.json({
        //             status: 200,
        //             user: userId,
        //             token: token
        //         });
        //     }
        // } else if (info.status == -1) {
        //     res.json({
        //         status: 404,
        //         msg: "Invalid user"
        //     });
        //     // If user is not found
        //     //res.status(404).json(info);
        // } else if (info.status == -2) {
        //     res.json({
        //         status: 502,
        //         msg: "Wrong credentials"
        //     });

    })(req, res);


};




module.exports.adminlogin = function (req, res) {
    console.log("login entry");

    passport.authenticate('local', function (err, user, info) {
        console.log("dssadsad", info, user);

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
            console.log("login error", err);
        }
        if (user.role == "admin") {
            var token = user.generateJwt();
            console.log("login success");
            res.json({
                status: 200,
                user: user,
                token: token
            });
        }
        else {
            res.json({
                status: 400,
                msg: "Invalid Credentials"
            });
        }
    })(req, res);


};





module.exports.logout = function (req, res) {
    req.logout();
    res.status(200);
    res.redirect('/');
}

// module.exports.resendotp = function(req, response) {
//     let users = new Users();
//     const secret = otplib.authenticator.generateSecret();
//     var otp = otplib.authenticator.generate(secret);
//     users.otp = otp;
//     Users.update({ mobile: req.body.mobile }, { $set: { otp: users.otp } }, function(err, res) {
//         if (res) {
//             var msg = "Dear user, your OTP is" + " " + users.otp + "." + "Now enter your secret OTP to be a member of babyApp.";
//             smsToUser.smsToUser('+' + req.body.mobile, msg, function(err, resp) {
//                 if (resp) {
//                     response.json({
//                         status: 200,
//                         msg: "opt send successfully",
//                         mobile: req.body.mobile
//                     });
//                 } else {
//                     response.json({
//                         status: 400,
//                         msg: "Invalid Mobile Number"
//                     });
//                 }
//             });

//         }
//     });
// }

// module.exports.setOtp = function(req, resp) {
//     Users.findOne({ otp: req.body.otp, mobile: req.body.mobile }, function(err, response) {
//         if (response) {
//             const dateTime = new Date();
//             var time = dateTime.getMinutes();
//             const next = response.getotptime;
//             var difference = (time - next) / 1000;
//             if (difference < 5) {
//                 //response.status = true;
//                 Users.update({ otp: req.body.otp, mobile: req.body.mobile }, { $set: { status: true } }, function(err, res) {
//                     //response.save(function(err, resp) {
//                     if (res) {
//                         resp.json({
//                             status: 200,
//                             msg: "Entered OTP has been matched"
//                         });
//                     }

//                 });
//             } else {
//                 resp.json({
//                     status: 400,
//                     msg: "OTP has been expired"
//                 });
//             }
//         } else {
//             resp.json({
//                 status: 502,
//                 msg: "The OTP you have entered is incorrect"
//             });
//         }
//     })
// }

module.exports.forgot = function (req, res) {
    Users.findOne({ email: req.body.email }, function (err, rec) {
        if (rec) {
            var token = rec.generateJwt();
            rec.resetPasswordToken = token;
            rec.resetPasswordExpires = Date.now() + 3600000;
            rec.save(function (err, rec) {
                console.log("rec", rec);
            });
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                secureConnection: false,
                port: 465,
                requiresAuth: false,
                auth: {
                    user: 'ak56nit@gmail.com',
                    pass: 'Anmol_897'
                }
            })
            var mailOptions = {
                from: 'pratiksharawatgehu@gmail.com',
                to: 'shouryabajpai007@gmail.com',
                subject: 'password reset',
                // text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                //      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                //      'http://' + 'localhost:3000/#!/resetpassword/' + token + '\n\n' +
                //      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                html: '<p>Your request to reset password is submitted successfully</p><a href= "http://52.39.212.226:4089/#/resetpassword?' + token + '"> click here </a>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return res.status(400);
                }
                res.json({
                    status: 200,
                    token: token
                });
            });


        } else {
            res.json({ error: "user not find", status: 400 });
        }
        //res.status(400);

    });
}

module.exports.resetPassword = function (req, res) {

    Users.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (user) {
            console.log("sdfsdfsdfsdfsd", user);
            user.setPassword(req.body.password);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save(function (err, user) {
                if (user) {
                    res.json({
                        status: 200,
                        msg: "Password updated successfully"
                    });
                }
                res.status(400);
            });
        }
    })
}

module.exports.updateData = function (req, res) {
    let users = new Users();
    if (req.body.userId != undefined && req.body.status != undefined) {
        Users.update({ _id: req.body.userId }, { $set: { status: req.body.status } }, function (err, resUpdate) {
            if (resUpdate) {
                res.json({
                    data: resUpdate
                });
            }
        });
    } else {
        console.log("remain unchanged");
    }
}

module.exports.addbaby = function (req, res) {
    let _this = this, directory = "./media/babyImages";
    fs.exists(directory, function (exists) {
        if (exists) {

            saveBabypic(req, res);
        } else {
            fs.mkdir(directory, function (err) {
                if (err) {
                    _this.res.send(500, err);
                } else {
                    saveBabypic(req, res);
                }
            });
        }
    });
}

var uploadRecursive = function (req, res, i, length, fields, files, successData) {

    if (i == length || i > length) {
        //uploading finished

        var fileName = successData[0];
        var location = successData[1];

        fields.fileName = fileName;
        fields.location = location;

        Users.findOne({ $or: [{ 'email': fields.email }, { 'facebook.email': fields.email }] }, function (err, response) {
            if (response) {
                if (response.baby.length > 0) {
                    response.baby.push(fields);
                    Users.update({ $or: [{ 'email': fields.email }, { 'facebook.email': fields.email }] }, { $set: { baby: response.baby } }, function (err, resp) {

                        if (resp) {
                            res.json({
                                status: 200,
                                msg: "Baby added successfully"
                            });
                        }
                        else {
                            res.json({
                                status: 400,
                                msg: "Baby could not be added"
                            });
                        }

                    });
                }

                else {

                    Users.update({ $or: [{ 'email': fields.email }, { 'facebook.email': fields.email }] }, { $set: { baby: fields } }, function (err, resp) {

                        if (resp) {
                            res.json({
                                status: 200,
                                msg: "Baby added successfully"
                            });
                        }
                        else {
                            res.json({
                                status: 400,
                                msg: "Baby could not be added"
                            });
                        }

                    });
                }
            }
            else {
                res.json({
                    status: 404,
                    msg: "User don't exist"
                });
            }
        });

    }
    else {
        var fileType = files.images.type;

        fileType = fileType.split('/');

        var fileName = 'IMG_' + shortid.generate() + "." + fileType[1];
        var baseImageUrl = path.join(__dirname + '/../../public/media/babyImages/', fileName);


        fs.rename(files.images.path, baseImageUrl, function (err) {
            if (err) {
                throw err;
            } else {
                var s3obj = new AWS.S3({
                    params: {
                        Bucket: 'baby2family',
                        Key: 'profileImages/' + fileName,
                        ACL: 'public-read',
                        ContentType: files.images.type
                    }
                });
                var body = fs.createReadStream(baseImageUrl);
                s3obj.upload({ Body: body }, function (s3Err, s3Data) {
                    if (s3Err) {
                        res.status(400).json({
                            msg: "could not be uploaded"
                        });

                    } else {
                        fs.unlink(baseImageUrl, function (err) {
                            if (err) console.log(err);
                            successData.push(s3Data.Location);
                            successData.push(fileName);
                            i++;
                            uploadRecursive(req, res, i, length, fields, files, successData);
                        });
                    }
                })
            }
        });
    }

}

var saveBabypic = function (req, res) {
    let users = new Users();
    let form = new formidable.IncomingForm();
    var baby = [];
    var profilepic = {};
    form.keepExtensions = true; //keep file extension
    form.uploadDir = process.env.PWD + '/public/media/babyImages';
    form.multiples = true;
    form.parse(req, function (err, fields, files) {
        var arrfile = [];
        if (!Array.isArray(files.images)) {
            arrfile.push(files.images);
        } else {
            arrfile = files.images;
        }

        var successData = [];
        var i = 0;
        var length = arrfile.length;

        uploadRecursive(req, res, i, length, fields, files, successData);
        // async.mapLimit(arrfile, 20, renameDocuments, function(err, resData) {
        //     console.log("resData",resData);
        //    // return;

        //     if(err == 555 && resData[0] == null){
        //         res.send({
        //                 status: 666,
        //                 message: "Error"
        //             });
        //     } else{

        //             res.send({
        //                 status: 400,
        //                 message: "Error in API"
        //             });
        //     }
        //     if(resData[0]==null){
        //         console.log("Jain5555============",resData[0]);
        //         return false;
        //     }else{
        //         console.log("Jain============",resData[0]);
        //         return false;
        //     }


        // })
    });
}





module.exports.userList = function (req, res) {
    let _this = this;
    let users = new Users();
    let outputJSON = "";
    Users.find({ 'role': 'users' }, function (err, data) {
        if (err) {
            outputJSON = {
                'status': 400,
                'data': "error"
            };
            res.status(400).send(outputJSON);
        }
        else {
            outputJSON = {
                'status': 200,
                'data': data
            };
            res.status(200).send(outputJSON);
        }
    })
}

// function renameDocuments(fx` ile, callback) {


//     if (file !== null || file !== undefined) {
//         var fileType = file['type'];
//         fileType = fileType.split('/');
//         var fileName = 'IMG_' + shortid.generate()+"."+fileType[1];
//         var baseImageUrl = path.join(__dirname + '/../../public/media/babyImages/',fileName);;

//             fs.rename(file.path,baseImageUrl, function(err) {
//             if (err) {
//                 throw err;
//             } else {
//                 var s3obj = new AWS.S3({
//                     params: {
//                         Bucket: 'baby2family',
//                         Key: 'profileImages/'+fileName,
//                         ACL: 'public-read',
//                         ContentType: file.type
//                     }
//                 });
//                  var body = fs.createReadStream(baseImageUrl);
//                 s3obj.upload({Body: body}, function(s3Err, s3Data) {
//                     if (s3Err) {
//                         console.log("An error occurred 1", s3Err);
//                         callback(555,null);                      

//                     } else {                     
//                         fs.unlink(baseImageUrl, function(err) {
//                         if (err) console.log(err);
//                            callback(null, {
//                             fileName: fileName,
//                             location: s3Data.Location,
//                         })
//                         });                        
//                     }
//                 })           
//             }
//         });       
//       }        
// }



/*______________________________________
 *  @Date: 28 July 2017
 *  @Method: Edit admin profile Details
 *  @CreatedBy: Manish kumar chauhan
 *  @Modified On: -
 *___________________________________*/

module.exports.getData = function (req, res) {
    console.log("req.body.adminId", req.params.id);
    if (!req.params.id) {
        res.json({
            status: 404,
            msg: "Please enter id"
        });
    } else {
        let findQuery = {
            "_id": req.params.id
        }
        console.log("id", req.params.id);
        let users = new Users();
        Users.findOne(findQuery, function (eErr, data) {
            if (eErr) {
                res.json({
                    status: 404,
                    msg: eErr
                });
            } else {
                console.log("data", data);
                res.json({
                    status: 200,
                    data: data
                });
            }
        })
    }


}


module.exports.CreateUser = function (req, res) {
    console.log("dfsfsf", req.body)
    let users = new Users();
    users.name = req.body.name;
    users.email = req.body.email;
    users.password = req.body.password;
    users.role = req.body.role;
    Users.findOne({ email: req.body.email }, function (eErr, eRes) {
        if (eRes) {
            console.log("email matches");
            res.json({
                status: 403,
                error: true,
                msg: 'Email already exists.'
            });
        } else {

            var token = users.generateJwt();
            users.setPassword(req.body.password);
            users.save(function (err, user) {
                if (user) {
                    console.log("saved", user)
                    res.json({
                        status: 200,
                        //  token:token,
                        msg: 'User Successfully  Saved'
                    });
                }

            });
        }
    })
}



exports.editProfile = function (req, res) {

    let users = new Users();
    let editData = {};
    if (req.body.first_name) {
        editData.first_name = req.body.first_name;
    }
    if (req.body.last_name) {
        editData.last_name = req.body.last_name;
    }
    if (req.body.phone) {
        editData.phone = req.body.phone;
    }

    if (req.body.Reminders) {
        editData.Reminders = {
            phone_call: req.body.Reminders.phone_call,
            phone_message: req.body.Reminders.phone_message,
            app_notification: req.body.Reminders.app_notification
        }


    }


    editData.updatedOn = Date.now();

    if (req.body.id) {
        let findQuery = {
            _id: req.body.id
        }
        // console.log("id",req.body._id);
        Users.update(findQuery, {
            $set: editData
        }, function (errUpdate, resUpdate) {
            if (errUpdate) {
                res.json({
                    status: 400,
                    data: errUpdate
                });
            } else {
                res.json({
                    status: 200,
                    data: "Your profile  successfully updated"
                });
                //console.log("updated",resUpdate);
            }
        });
    }
}

module.exports.updateAdminApproved = function (req, res) {
    console.log("dsjhgsajdhgjash", req.body);
    var updatefield = {
        userid: req.body.id,
        status: req.body.isAdminApproved,
        comment: req.body.comment,
        commentdate: new Date()
    }
    return Users.findOne({ "_id": req.body.id }).then(function (users) {
        return Users.update({ "_id": req.body.id }, { statusApproved: updatefield, isAdminApproved: req.body.isAdminApproved }).then(function (user) {
            console.log("sdhfdjkfhsdjkfhksj", user);
            console.log("sdhfdjkfhsdjkfhksj", updatefield);

            emailUserToStatusUpdate({
                username: user[0].name,
                email: user[0].email,
                status: user[0].isAdminApproved ? 'activate' : 'deactivate'
            }).then(function (response) {
            }).catch(function (error) {
            });
            res.json({
                success: true,
                data: {
                    "message": "User comment saved"
                },
            })
        }).catch(() => {
            res.json({
                success: false,
                data: {
                    "message": "Something went wrong !!!"
                },
            });

        })
    })
}

//Update Profile Image
exports.updateProfileImage = function (req, res) {
    console.log("req.body.profileImage", req.body.profileImage);
    if (!req.body.profileImage) {
        res.json({
            status: 404,
            msg: "Please select Image"
        });
    } else {
        let findQuery = {
            _id: req.body.adminId
        }

        let users = new Users();
        var imageName = req.body.adminId + '.png';
        console.log("hgdsjahdj", imageName);
        let admin = {};
        admin.profileImage = imageName;
        var tempPath = req.body.profileImage;
        console.log("id", req.body.adminId);
        var storeLocation = path.resolve('public/profileImage/imageName');
        var base64Data = req.body.profileImage.replace(/^data:image\/png;base64,/, "");

        fs.writeFile("./public/media/profileImage/" + imageName, base64Data, 'base64', function (fileErr) {
            console.log("storeLocation");
            if (fileErr) {
                console.log("fileErr", fileErr);
            }
            else {
                console.log("image", req.body.adminId);
                Users.update({ _id: req.body.adminId }, { $set: { profileImage: imageName } }, function (errUpdate, resUpdate) {
                    if (errUpdate) {
                        console.log("err", errUpdate);
                        res.json({
                            status: 400,
                            msg: errUpdate
                        });
                    } else {
                        console.log("success");
                        res.json({
                            status: 200,
                            msg: "Profile image updated succesfully"
                        });

                    }
                })
            }
        });
    }
}

exports.updatePrescriptionImage = function (req, res) {
    console.log("req.body.profileImage", req.body.Prescription_image);
    if (!req.body.Prescription_image) {
        res.json({
            status: 404,
            msg: "Please select Image"
        });
    } else {
        let findQuery = {
            _id: req.body.id
        }

        let users = new Users();
        var imageName = req.body.id + '.png';
        console.log("hgdsjahdj", imageName);
        let user = {};
        user.Prescription_image = imageName;
        var tempPath = req.body.Prescription_image;
        console.log("id", req.body.id);
        var storeLocation = path.resolve('public/prescriptionImage/imageName');
        var base64Data = req.body.Prescription_image.replace(/^data:image\/png;base64,/, "");

        fs.writeFile("./public/media/prescriptionImage/" + imageName, base64Data, 'base64', function (fileErr) {
            console.log("storeLocation");
            if (fileErr) {
                console.log("fileErr", fileErr);
            }
            else {
                console.log("image", req.body.id);
                Users.update({ _id: req.body.id }, { $set: { Prescription_image: imageName } }, function (errUpdate, resUpdate) {
                    if (errUpdate) {
                        console.log("err", errUpdate);
                        res.json({
                            status: 400,
                            msg: errUpdate
                        });
                    } else {
                        console.log("success");
                        res.json({
                            status: 200,
                            msg: "Prescription image updated succesfully"
                        });

                    }
                })
            }
        });
    }
}

