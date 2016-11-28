var mongoose = require('mongoose');

//Employee Schema
var employeeSchema = mongoose.Schema({

      store_id: {
          type: Number
      },
      employee_data: {
          type: Array
      }

},{collection:'employee_information'});

var Employee = module.exports = mongoose.model('Employee',employeeSchema);

//Get Employee Data
module.exports.getEmployeeData = function(id,callback){
    Employee.find(id,callback);
};

//POST Data to Employee Data
module.exports.addEmployeeData = function(addItem,callback){
    Employee.create(addItem,callback);
};

//PUT Data to Employee Data
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      employee_data: updateData.employee_data
    };
    Employee.findOneAndUpdate(query,update,callback,options);
};

//DELETE Data to Employee Data
module.exports.deleteData = function(id,callback){
    var query = { store_id: id };
    Employee.remove(query,callback);
};
