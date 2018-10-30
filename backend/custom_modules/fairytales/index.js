import fairytales from './models/fairytale.js';
import multer from 'multer';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
 var querystring = require("querystring");

module.exports = class fairyElements {
    constructor(req, res, next) {
        this.res = res;
        this.req = req;
        this.next = next;
    }

    // getfairytale(datas) {
    //     console.log("datas",datas);
    //     let _this = this;
    //     fairytales.savefairytale(datas,function(err, data) {
    //        if (err) return err;
    //         _this.res.send(200, { data: data });
    //     });
    // }
       getfairytale(req,res) {
        console.log("111111111111");
        let _this = this,  directory = "./media/fairytale'";
        console.log("22222222222222",directory);
          fs.exists(directory, function(exists) {

          if(!exists) {
            fs.mkdir(directory, function(err){
              if(err){ 
                _this.res.send(500, err);
              }else{
                 _this.saveFairyTale(req,res);
              }
            });
          }else{
                        console.log("3333333");
            _this.saveFairyTale(req,res);
          }
        });
        
    }

   saveFairyTale(req,res){  
   console.log("inside saveFairyTale");
        let _this =this; 
        let form = new formidable.IncomingForm(),fieldsObj,fileName;
        form.keepExtensions = true; //keep file extension
        form.uploadDir = process.env.PWD + './media/fairytale';
        //form.multiples = true;  
        console.log("pppppppppppppppppp",this.req);  
        form.parse(this.req, function(err, fields, files) {

          console.log("fields",fields);
          console.log("files",files);
          
           //     form.on('end', function() {
    //         let obj = JSON.parse(fieldsObj.data);
    //         obj['logo'] = fileName;
    //         Landing.addLanding(obj, function(err, data) {
    //             if (err) return err;
                
    //             _this.res.send(200, { res: data });
    //         });
    //     });
           //  var arrfile = [];
           //  if (!Array.isArray(files.images)) {
           //      arrfile.push(files.images);
           //  } else {
           //      arrfile = files.images;
           //  } 
           //  console.log("arrfile",arrfile);
           // var successData = [];  
           // var i = 0;
           // var length = arrfile.length;
           // console.log("arrfile",length);
           //uploadRecursive(req,res,i,length,fields,files,successData);
        });
}

    // //Save landing page multipart content
    // saveLanding(){
    //     let _this = this, form = new formidable.IncomingForm(),fieldsObj,fileName;
    //     form.keepExtensions = true; //keep file extension
    //     form.uploadDir = process.env.PWD + '/media/landing';
    //     form.parse(this.req, function(err, fields, files) {
    //         fieldsObj = fields;
    //     });

    //     form.on('fileBegin', function(name, file) {
    //         //get file path
    //         fileName = file.path.split('/').pop();
    //     });

    //     form.on('end', function() {
    //         let obj = JSON.parse(fieldsObj.data);
    //         obj['logo'] = fileName;
    //         Landing.addLanding(obj, function(err, data) {
    //             if (err) return err;
                
    //             _this.res.send(200, { res: data });
    //         });
    //     });
    // }



    getData(){
         let _this = this;
         fairytales.fetchFairyTaleData(this.req.query.id, function(err, data) {
            if (err) {
                return err;
            }
            _this.res.send(200, { data: data });
        });
        
    }
    updateData(datas){
        let _this = this;

        fairytales.updateFairytaleStatus(datas,function(err, data) {
           
            if (err) return err;
            _this.res.send(200, { data: data });
        });
    }
    getfairytaleData(){
        
        let _this = this;
        fairytales.viewFairytaleList(function(err, data) {
           if (err) return err;
            _this.res.send(200, { data: data });
        });
       
    }
}
