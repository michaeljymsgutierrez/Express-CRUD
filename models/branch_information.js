var mongoose = require('mongoose');

//Branch Schema
var branchSchema = mongoose.Schema({

      store_id: {
          type: Number
      },
      branch_data: {
          type: Array
      }

},{collection:'branch_information'});

var Branch = module.exports = mongoose.model('Branch',branchSchema);

//Get Branch Data
module.exports.getBranchData = function(id,callback){
    Branch.find(id,callback);
};

//POST Data to Branch
module.exports.addBranchData = function(addItem,callback){
    Branch.create(addItem,callback);
};

//PUT Data to Branch Data
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      branch_data: updateData.branch_data
    };
    Branch.findOneAndUpdate(query,update,callback,options);
};

//DELETE Data to Branch Data
module.exports.deleteData = function(id,callback){
    var query = { store_id: id };
    Branch.remove(query,callback);
};
