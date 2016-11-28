//Employee Information
app.get('/api/store/:store_id/employee',function(req,res){
      var storeId = req.params;
      Employee.getEmployeeData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          else{
            console.log("Get Employee Info");
            if(data.length == 0){
              res.json(data); //Final Response if Empty
            }
            else{
              res.json(data[0].employee_data); //Final Response
            }
          }
      });
});

app.post('/api/store/:store_id/employee',function(req,res){
       var storeId = req.params;
       var data = req.body;
       var addItem =  { store_id: storeId.store_id, employee_data: data };
       var existData = [];
       Employee.getEmployeeData(storeId,function(err,data){
         if(err){
            console.log(err);
           res.json(err); //Erorr Response
         }
         else{
           existData = data;
           if(existData.length == 0){
               Employee.addEmployeeData(addItem,function(err,addItem){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    console.log("Insert Employee Info");
                    res.json(addItem); //Final Response
                  }
               });
           }
           else{
             var storeId = req.params.store_id;
             var updateData = addItem;
             Employee.updateData(storeId,updateData,{},function(err,updateData){
                if(err){
                  console.log(err);
                  res.json(err); //Erorr Response
                }
                else{
                  console.log("Update Employee Info");
                  res.json(addItem); //Final Response
                }
             });
           }
         }
       });
});

app.put('/api/store/:store_id/employee',function(req,res){
    var storeId = req.params.store_id;
    var data = req.body;
    var updateData = { store_id: storeId, employee_data: data };
    Employee.updateData(storeId,updateData,{},function(err,updateData){
        if(err){
           console.log(err);
           res.json(err); //Erorr Response
        }
        else{
            var storeId = req.params;
            Employee.getEmployeeData(storeId,function(err,data){
                if(err){
                  console.log(err);
                  res.json(err); // Erorr Response
                }
                else{
                  console.log("Update Employee Info");
                  res.json(data); //Final Response
                }
            });
        }
    });
})

app.delete('/api/store/:store_id/employee',function(req,res){
    var storeId = req.params.store_id;
    Employee.deleteData(storeId,function(err,deleteData){
        if(err){
          console.log(err);
          res.sendStatus(500); //Erorr Response
        }
        else{
          console.log("Delete Employee Info");
          res.sendStatus(200); // Final Response
        }
    });
});
