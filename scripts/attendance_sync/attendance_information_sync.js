//Attendance Information
app.post('/api/store/:store_id/attendance',function(req,res){
      var storeId = req.params.store_id; // Store ID
      var attendanceData = req.body; // POST Data
      var dateCreated = new Date();
      //DATE
      dateCreated = dateCreated.getFullYear() + "-" + dateCreated.getMonth() + "-" + dateCreated.getDate() + " "+ dateCreated.getHours() + ":" + dateCreated.getMinutes() + ":" + dateCreated.getSeconds();
      var addItem = { store_id: storeId , date_created: dateCreated, attendance_data: attendanceData }; // For Add Item
      var id = { store_id: storeId }; // Main Store ID
      var existData = []; // Temporary Container
      //Check Wether the Store exist in DB
      Attendance.getAttendanceData(id,function(err,data){
          existData = data;
          if(err){
             console.log(err);
             res.json(err); //Erorr Response
          }
          console.log(existData);

          if(existData.length == 0){
              //If Not EXIST Create
              console.log("Ready to insert");
              Attendance.addAttendanceData(addItem,function(err,data){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    res.json(data);//Final Response
                  }
              })
          }
          else{
              console.log("Ready to update");
              //Push Data assigned KEY
              existData[0].attendance_data.push(attendanceData);
              //UPDATE with PUSH data
              var id = existData[0].store_id;
              var updateData = { store_id: storeId, date_created: dateCreated, attendance_data: existData[0].attendance_data };
              Attendance.updateData(id,updateData,{},function(err,data){
                  if(err){
                      console.log(err);
                      res.json(err); //Erorr Response Response
                  }
                  else{
                      res.json(attendanceData); // Final Response
                  }
              });
          }
      });
});

//GET by StoreId from MongoDB
app.get('/api/store/:store_id/attendance',function(req,res){
    var id = req.params;
    Attendance.getAttendanceData(id,function(err,data){
        if(err){
          console.log(err);
          res.json(err); //Erorr Response
        }
        else{
          res.json(data);
        }
    });
});

//GET ALL from MongoDB
app.get('/api/attendance',function(req,res){
    Attendance.getAllAttendanceData(function(err,data){
        if(err){
          console.log(err);
          res.json(err); //Erorr Response
        }
        else{
          res.json(data); //Final Response
        }
    });
});
