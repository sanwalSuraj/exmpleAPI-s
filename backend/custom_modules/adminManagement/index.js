import Users from '../accounts/models/register.js';

module.exports = class userElements {
    constructor(req, res, next) {
        this.res = res;
        this.req = req;
        this.next = next;
    }
   getAdmin() {
        let _this = this;
        Users.viewAdminData(function(err, data) {
            console.log("data",data);
            if (err) return err;
            _this.res.send(200, { data: data });
        });
    }
}
