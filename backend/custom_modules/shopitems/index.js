import express from 'express';
import jwt from 'jsonwebtoken';
import ShopItems from './models/shopitems.js';
import passport from 'passport';
import mongoose from 'mongoose';
import async from 'async';
import otplib from 'otplib';
import multer from 'multer';
import formidable from 'formidable';
import fs from 'fs';
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


module.exports.itemList = function (req, res) {
    let _this = this;
    let items = new ShopItems();
    let outputJSON = "";
    ShopItems.find({ 'id': req.body.id }, function (err, data) {
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



exports.editItems = function (req, res) {

    let items = new ShopItems();
    let editItem = {};
    if (req.body.item) {
        editItem.item = req.body.item;
    }
    if (req.body.price) {
        editItem.price = req.body.price;
    }
    editItem.updatedOn = Date.now();

    if (req.body._id) {
        let findQuery = {
            _id: req.body._id
        }
        // console.log("id",req.body._id);
        ShopItems.update(findQuery, {
            $set: editItem
        }, function (errUpdate, resUpdate) {
            if (errUpdate) {
                res.json({
                    status: 400,
                    data: errUpdate
                });
            } else {
                res.json({
                    status: 200,
                    data: "Your Items  successfully updated"
                });
                //console.log("updated",resUpdate);
            }
        });
    }
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
    console.log("req.body.id", req.params.id);
    if (!req.params.id) {
        res.json({
            status: 404,
            msg: "Please enter id"
        });
    } else {
        let findQuery = {
            _id: req.params._id

        }
        console.log("id", req.params.id);
        let item = new ShopItems();
        ShopItems.findOne(findQuery, function (eErr, data) {
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


module.exports.createitem = function (req, res) {
    let items = new ShopItems();
    items.shopitem = req.body.shopitem;
    items.price = req.body.price;
    items.save(function (err, user) {
        if (user) {
            console.log("saved", user)
            res.json({
                status: 200,
                //  token:token,
                msg: 'Items Successfully  Saved'
            });
        }

    });

}



//Update Profile Image
// exports.updateProfileImage = function (req, res) {
//     console.log("req.body.profileImage", req.body.profileImage);
//     if (!req.body.profileImage) {
//         res.json({
//             status: 404,
//             msg: "Please select Image"
//         });
//     } else {
//         let findQuery = {
//             _id: req.body.adminId
//         }

//         let users = new Users();
//         var imageName = req.body.adminId + '.png';
//         console.log("hgdsjahdj", imageName);
//         let admin = {};
//         admin.profileImage = imageName;
//         var tempPath = req.body.profileImage;
//         console.log("id", req.body.adminId);
//         var storeLocation = path.resolve('public/profileImage/imageName');
//         var base64Data = req.body.profileImage.replace(/^data:image\/png;base64,/, "");

//         fs.writeFile("./public/media/profileImage/" + imageName, base64Data, 'base64', function (fileErr) {
//             console.log("storeLocation");
//             if (fileErr) {
//                 console.log("fileErr", fileErr);
//             }
//             else {
//                 console.log("image", req.body.adminId);
//                 Users.update({ _id: req.body.adminId }, { $set: { profileImage: imageName } }, function (errUpdate, resUpdate) {
//                     if (errUpdate) {
//                         console.log("err", errUpdate);
//                         res.json({
//                             status: 400,
//                             msg: errUpdate
//                         });
//                     } else {
//                         console.log("success");
//                         res.json({
//                             status: 200,
//                             msg: "Prescription image updated succesfully"
//                         });

//                     }
//                 })
//             }
//         });
//     }
// }

