import mongoose from 'mongoose';
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

const Users = mongoose.Schema({
    email: {
        type: String,
        required: false
    },
    role: {
        type: String
    },


    deleted: {
        type: String,
        default: '0'
    },
    profileImage: {
        type: String
    },
    Prescription_image: {
        type: String
    },
    first_name: {
        type: String
    },
    Reminders: {
        type: Object
    },
    statusApproved: {
        type: Object
    },
    last_name: {
        type: String
    },
    phone: {
        type: String
    },
    reddi_score: {
        type: String,
        default: 0
    },
    today_dose: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    isAdminApproved: {
        type: Boolean
    },
    streak: {
        type: Number,
        default: 0
    },
    cycle_complete: {
        type: Number,
        default: 0
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,
    hash: String,
    salt: String
});

Users.methods.setPassword = function (password) {
    console.log("fhsdkjfs", password)
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

Users.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;

};

Users.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    var token = jwt.sign({
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET");
    return token;

};

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


export default mongoose.model('users', Users);