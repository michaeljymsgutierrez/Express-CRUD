//Cash Management Information
app.post('/api/store/:store_id/cash_management',function(req,res){
      var storeId = req.params.store_id; // Store ID
      var cashManagementData = req.body; // POST Data
      var dateCreated = new Date();
      //DATE
      dateCreated = dateCreated.getFullYear() + "-" + dateCreated.getMonth() + "-" + dateCreated.getDate() + " "+ dateCreated.getHours() + ":" + dateCreated.getMinutes() + ":" + dateCreated.getSeconds();
      var addItem = { store_id: storeId , date_created: dateCreated, cash_management_data: cashManagementData }; // For Add Item
      var id = { store_id: storeId }; // Main Store ID
      var existData = []; // Temporary Container
      //Check wether the Store exist in DB
      Cash_management.getCashManagementData(id,function(err,data){
          existData = data;
          if(err){
              console.log(err);
              res.json(err); //Erorr Response
          }
          console.log(existData);
          if(existData.length == 0){
              //If Not EXIST Create
              console.log("Ready to insert");
              Cash_management.addCashManagementData(addItem,function(err,data){
                  if(err){
                     console.log(err);
                     res.json(err); //Erorr Response
                  }
                  else{
                    res.json(data); //Final Response
                  }
              })
          }
          else{
              console.log("Ready to update");
              //Push Data assigned KEY
              existData[0].cash_management_data.push(cashManagementData);
              //UPDATE with PUSH data
              var id = existData[0].store_id;
              var updateData = { store_id: storeId, date_created: dateCreated, cash_management_data: existData[0].cash_management_data };
              Cash_management.updateData(id,updateData,{},function(err,data){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    res.json(cashManagementData); // Final Response
                  }
              });
          }
      });
});

//GET by StoreId from MongoDB
app.get('/api/store/:store_id/cash_management',function(req,res){
    var id = req.params;
    Cash_management.getCashManagementData(id,function(err,data){
        if(err){
          console.log(err);
          res.json(err); //Erorr Response
        }
        else{
          res.json(data); //Final Response
        }
    });
});

//GET ALL from MongoDB
app.get('/api/cash_management',function(req,res){
    Cash_management.getAllCashManagementData(function(err,data){
        if(err){
          console.log(err);
          res.json(err); //Erorr Response
        }
        else{
          res.json(data); //Final Response
        }
    });
});
