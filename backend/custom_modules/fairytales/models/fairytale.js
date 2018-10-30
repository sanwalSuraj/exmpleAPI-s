import mongoose from 'mongoose';
var crypto = require('crypto');

const fairytales = mongoose.Schema({
    
    fairytale_audio: {
        type: String
    },
    title: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: String,
        default: '0'
    },
    status:{
        type:Boolean,
        default:true
    }
});


 fairytales.statics.viewFairytaleList = function(callBack) {
    
    this.find({}, function(err, res) {
        if (!res) return callBack(null, null);
       
        callBack(null, res);
    });
}
fairytales.statics.updateFairytaleStatus = function(data,callBack){
  
    
    if(data.actionType=='STATUS'){
      if(data.data.status==false){
        var status = true;
      }else{
        var status = false;
      }
      var newsDataId = data.data._id;
      this.update({ _id: newsDataId }, {$set:{status:status}}, function(err, result) {
          if (err) {
              return callBack(err, null);
          }else{
            callBack(null, result);
          }
          
      });
      
    }
    if(data.actionType=='EDIT'){
        var newsDataId = data.data._id;
        
        this.update({ _id: newsDataId }, {$set:data.data}, function(err, result) {
         
          if (err) {
              return callBack(err, null);
          }else{

            callBack(null, result);
          }
          
      });
    }
}

fairytales.statics.savefairytale = function(data,callBack) {
    let fairytales = new this(data);
     fairytales.save(function(err, res) {
        if (err) {
          return callBack(err, null);
        }else{
          callBack(null, res);
        }
            
        });
}
fairytales.statics.fetchFairyTaleData = function(id, callBack) {
    let _this = this;
    _this.findOne({ _id: id, deleted: 0 }, function(err, res) {
        if (err) {
            return callBack(err, null);
        }

        callBack(null, { data: res });
    });
}

export default mongoose.model('fairytales', fairytales);