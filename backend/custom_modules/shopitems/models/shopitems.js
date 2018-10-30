import mongoose from 'mongoose';
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

const ShopItems = mongoose.Schema({
    shopitem: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    profileImage: {
        type: String
    },
    isDeleted: {
        type: 'Boolean',
        defaultsTo: false
    },
});


// //-------fetch users from db-----------//
// Users.statics.viewUsersList = function(callBack) {
//     this.find({ "role": "user"}, function(err, res) {
//         if (!res) return callBack(null, null);
//         callBack(null, res);
//     });
// }

// //-------fetch admin data from db-------//
// Users.statics.viewAdminData = function(callBack) {
//     this.find({ "role": "superadmin" }, function(err, res) {
//         if (!res) return callBack(null, null);
//         callBack(null, res);
//     });
// }

// //----------Remove user details---------------------//
// Users.statics.removeUserData = function(id, callBack) {
//     let _this = this
//     _this.remove({ _id: id }, function(err, res) {
//         if (!res) return callBack(null, null);
//         callBack(null, res);
//     });
// }

// //----------Remove user details---------------------//
// Users.statics.removeAdminData = function(id, callBack) {
//     let _this = this
//     _this.remove({ _id: id }, function(err, res) {
//         if (!res) return callBack(null, null);
//         callBack(null, res);
//     });
// }

// Users.statics.editAdminData = function(id, callBack) {
//     let _this = this;
//     _this.findOne({ _id: id, deleted: 0 }, function(err, res) {
//         if (err) {
//             return callBack(err, null);
//         }

//         callBack(null, { admin: res });
//     });
// }

// //----------edit users data---------------------//
// Users.statics.editUserData = function(id, callBack) {
//     let _this = this;
//     _this.findOne({ _id: id, deleted: 0 }, function(err, res) {
//         if (err) {
//             return callBack(err, null);
//         }

//         callBack(null, { user: res });
//     });
// }

// Users.statics.updateStatus = function(data, callBack){
//     var userDat = new this(data);
//     var id = data._id;
//     let _this = this;
//     _this.update({ _id: id }, {$set: data },function(err, resUpdate) {
//         if (err){
//             return callBack(err, null);
//         }
//         callBack(null, {message : resUpdate });
//     });
// }

// // Users.update({ mobile: req.body.mobile }, { $set: { otp: users.otp } }, function(err, res) {
// Users.statics.updateUserData = function(data,callBack){
//     var userData = new this(data);
//          var userDataId = data._id;
//          var _this = this;
//           if (userDataId) {
//              delete data._id;
//              _this.update({ _id: userDataId }, { $set: data }, function(err, resUpdate) {
//                 if (er        callBack(null, res);
//             });
//         }

//         //--r) {
//                     return callBack(err, null);
//                  }
//                  callBack(null, resUpdate);
//              });
//            } 
// }


// //-------fetch users from db-----------//
// Users.statics.viewUsers = function(callBack) {
//     this.find({}, function(err, res) {
//         //console.log("resssss",res);
//         if (!res) return callBack(null, null);
//         callBack(null, res);
//     });
// }


export default mongoose.model('shopitems', ShopItems);