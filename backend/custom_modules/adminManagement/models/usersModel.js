import mongoose from 'mongoose';
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

const Users = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
    },
    otp: {
        type: String
    },
    role: {
        type: String,
        required: false
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String
        },
        first_name: {
            type: String
        },
        last_name: {
            type: String
        }
    },
    instagram: {
        id: {
            type: String
        },
        displayName: {
            type: String
        },
        username: {
            type: String
        }
    },
    getotptime: {
        type: String
    },
    baby: [],
    created: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: String,
        default: '0'
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,
    hash: String,
    salt: String
});

Users.methods.setPassword = function (password) {
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

//-------fetch users from db-----------//
Users.statics.viewUsersList = function (callBack) {

    this.find({}, function (err, res) {
        if (!res) return callBack(null, null);
        callBack(null, res);
    });
}

//-------fetch admin data from db-------//
Users.statics.viewAdminData = function (callBack) {
    this.find({
        "role": "admin"
    }, function (err, res) {
        if (!res) return callBack(null, null);
        callBack(null, res);
    });
}

//----------Remove user details---------------------//
Users.statics.removeUserData = function (id, callBack) {
    let _this = this
    _this.remove({
        _id: id
    }, function (err, res) {
        if (!res) return callBack(null, null);
        callBack(null, res);
    });
}

//----------Remove user details---------------------//
Users.statics.removeAdminData = function (id, callBack) {
    let _this = this
    _this.remove({
        _id: id
    }, function (err, res) {
        if (!res) return callBack(null, null);
        callBack(null, res);
    });
}

Users.statics.editAdminData = function (id, callBack) {
    let _this = this;
    _this.findOne({
        _id: id,
        deleted: 0
    }, function (err, res) {
        if (err) {
            return callBack(err, null);
        }

        callBack(null, {
            admin: res
        });
    });
}



export default mongoose.model('users', Users);