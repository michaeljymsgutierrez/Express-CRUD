//POST data to mongoDB
app.post('/api/store/:store_id/cashier',function(req,res){

      var storeId = req.params.store_id; // Store ID
      var cashierData = req.body; // POST Data
      var dateCreated = new Date();
      //DATE
      dateCreated = dateCreated.getFullYear() + "-" + dateCreated.getMonth() + "-" + dateCreated.getDate() + " "+ dateCreated.getHours() + ":" + dateCreated.getMinutes() + ":" + dateCreated.getSeconds();
      var addItem = { store_id: storeId , date_created: dateCreated, cashier_data: cashierData }; // For Add Item
      var id = { store_id: storeId }; // Main Store ID
      var existData = []; // Temporary Container
      //Check wether the Store exist in DB
      Cashier.getCashierData(id,function(err,data){
          existData = data;
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          console.log(existData);
          if(existData.length == 0){
              //If Not EXIST Create
              console.log("Ready to insert");
              Cashier.addCashierData(addItem,function(err,data){
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
              existData[0].cashier_data.push(cashierData);
              //UPDATE with PUSH data
              var id = existData[0].store_id;
              var updateData = { store_id: storeId, date_created: dateCreated, cashier_data: existData[0].cashier_data };
              Cashier.updateData(id,updateData,{},function(err,data){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    res.json(cashierData); // Final Response
                  }
              });
          }
      });
});


//GET by StoreId from MongoDB
app.get('/api/store/:store_id/cashier',function(req,res){
    var id = req.params;
    Cashier.getCashierData(id,function(err,data){
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
app.get('/api/cashier',function(req,res){
    Cashier.getAllCashierData(function(err,data){
        if(err){
          console.log(err);
          res.json(err); //Erorr Response
        }
        else{
          res.json(data); //Final Response
        }
    });
});
