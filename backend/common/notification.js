var client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID || 'AC2f96ac34eac1c6979002dd71c97b54aa',
    process.env.TWILIO_AUTH_TOKEN || 'b734790d50e19c27b1c08ee0d3736662'
);


const smsToUser = function(receiver,msg,callback) {
    client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER || '+14152125199' ,
        to: receiver,
        body: msg
    }, function(err, message) {
        err ? callback(err) : callback(null,message)
    });

}


module.exports = {
	smsToUser:smsToUser
}