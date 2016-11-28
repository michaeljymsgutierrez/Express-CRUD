var mongoose = require('mongoose');

//Attendance Schema
var attendanceSchema = mongoose.Schema({

      store_id: {
          type: Number
      },
      date_created: {
          type: String,
      },
      attendance_data: {
          type: Array
      }

},{collection:'attendance_information'});

var Attendance = module.exports = mongoose.model('Attendance',attendanceSchema);

// GET All Data from Attendance
module.exports.getAllAttendanceData = function(callback){
    Attendance.find(callback);
};

// GET ONE Data from Attendance
module.exports.getAttendanceData = function(id,callback){
    Attendance.find(id,callback);
};

//POST Data to Attendance
module.exports.addAttendanceData = function(addItem,callback){
    Attendance.create(addItem,callback);
};

//PUT Data to Attendance
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      date_created: updateData.date_created,
      attendance_data: updateData.attendance_data
    };
    Attendance.findOneAndUpdate(query,update,callback,options);
};
