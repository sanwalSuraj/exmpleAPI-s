import Users from '../accounts/models/register.js';

module.exports = class userElements {
    constructor(req, res, next) {
        this.res = res;
        this.req = req;
        this.next = next;
    }

    getUsers() {
        let _this = this;
        Users.viewUsersList(function(err, data) {
            if (err) return err;
            _this.res.send(200, { data: data });
        });
    }

    getAdmin() {
        let _this = this;
        Users.viewAdminData(function(err, data) {
            if (err) return err;
            _this.res.send(200, { data: data });
        });
    }

    //-----------Remove user data---------------------//
    removeUser() {
        let _this = this;
        Users.removeUserData(_this.req.params.userId, function(err, data) {
            if (err) {
                return err;
            }
            _this.res.send(200, { res: data });
        });
    }

    //-----------Remove user data---------------------//
    removeAdmin() {
        let _this = this;
        Users.removeAdminData(_this.req.params.adminId, function(err, data) {
            if (err) {
                return err;
            }
            _this.res.send(200, { res: data });
        });
    }

    editAdmin() {
        let _this = this;
        Users.editAdminData(this.req.query.id, function(err, data) {
            if (err) {
                return err;
            }
            _this.res.send(200, { res: data });
        });
    }

    getUsersInfo() {
        let _this = this;
        Users.viewUsers(function(err, data) {
            if (err) return err;
            _this.res.send(200, { data: data });
        });
    }
}