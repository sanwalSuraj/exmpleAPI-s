// const nodemailer = require('nodemailer');

// // create reusable transporter object using the default SMTP transport
// const emailToUser = function(receiver,msg,callback) {
// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com ',
//     port: 587,
//     secure: false, // secure:true for port 465, secure:false for port 587
//     auth: {
//         user: 'vjoshi139@gamil.com',
//         pass: '9058718893'
//     }
// });

// // setup email data with unicode symbols
// let mailOptions = {
//     from: "pratiksharawat12351@gmail.com", // sender address
//     to: "pratiksharawatgehu@gmail.com", // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: msg, // plain text body
//     html: '<b>Hello world ?</b>' // html body
// };


// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });
// }

// module.exports = {
// 	emailToUser:emailToUser
// }