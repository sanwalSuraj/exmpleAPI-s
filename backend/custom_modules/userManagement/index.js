import Users from '../accounts/models/register.js';

module.exports = class userElements {
    constructor(req, res, next) {
        this.res = res;
        this.req = req;
        this.next = next;
    }

    //-----------Edit users data---------------------//
    editUser() {
        let _this = this;
        Users.editUserData(this.req.query.id, function(err, data) {
            if (err) {
                return err;
            }
            _this.res.send(200, {
                res: data
            });
        });
    }

    //-----------update users data---------------------//
    UpdateUser(data) {
        let _this = this;
        Users.updateUserData(data, function(err, resp) {
            if (err) {
                return err;
            }
            _this.res.send(200, {
                res: resp
            });
        });
    }

    updateStatus(data) {
        let _this = this;
        Users.updateStatus(data, function(err, resp) {
            if (err) {
                return err;
            } else {
                _this.res.send(200, {
                    res: resp
                });
            }
        })
        console.log("==", data);
        return false;
    }

}