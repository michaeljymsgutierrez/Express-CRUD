//POST data to mongoDB
app.post('/api/store/:store_id/transfer',function(req,res){
      var storeId = req.params.store_id; // Store ID
      var transferData = req.body; // POST Data
      var dateCreated = new Date();
      //DATE
      dateCreated = dateCreated.getFullYear() + "-" + dateCreated.getMonth() + "-" + dateCreated.getDate() + " "+ dateCreated.getHours() + ":" + dateCreated.getMinutes() + ":" + dateCreated.getSeconds();
      var addItem = { store_id: storeId , date_created: dateCreated, transfer_data: transferData }; // For Add Item
      var id = { store_id: storeId }; // Main Store ID
      var existData = []; // Temporary Container
      //Check wether the Store exist in DB
      Transfer.getTransferData(id,function(err,data){
          existData = data;
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          console.log(existData);
          if(existData.length == 0){
              //If Not EXIST Create
              console.log("Ready to insert");
              Transfer.addTransferData(addItem,function(err,data){
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
              existData[0].transfer_data.push(transferData);
              //UPDATE with PUSH data
              var id = existData[0].store_id;
              var updateData = { store_id: storeId, date_created: dateCreated, transfer_data: existData[0].transfer_data };
              Transfer.updateData(id,updateData,{},function(err,data){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    res.json(transferData); //Final Response
                  }
              });
          }
      });
});

//GET by StoreId from MongoDB
app.get('/api/store/:store_id/transfer',function(req,res){
      var id = req.params; // ID
      var temp = [];
      var transferIn = []; // Container for transaction transfer IN for every StoreID
      var transferOut = []; // Container for transaction transfer OUT for every StoreID
      var transferInRequest = []; // Container for transaction transafer IN Request for every StoreID
      var transferOutRequest = []; // Container for transaction transafer OUT Request for every StoreID
      //GET data by ID
      Transfer.getTransferData(id,function(err,data){
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          //Check wether the  data exist in data base
          if(data.length == 0){
              res.json(data); // Response empty Array
          }
          else{
              temp = data;
              var tempLen = temp[0].transfer_data.length;
              console.log(data);
              if(temp.length > 0){
                var x = 0;
                while(x != tempLen){
                    //Push Transaction Type to its group for  Custom Response
                    if(temp[0].transfer_data[x].transaction_type == "transfer_in_request"){
                        transferInRequest.push(temp[0].transfer_data[x]);
                    }
                    else if(temp[0].transfer_data[x].transaction_type == "transfer_out_request"){
                        transferOutRequest.push(temp[0].transfer_data[x]);
                    }
                    else if(temp[0].transfer_data[x].transaction_type == "transfer_in"){
                        transferIn.push(temp[0].transfer_data[x]);
                    }
                    else{
                        transferOut.push(temp[0].transfer_data[x]);
                    }
                    x++;
                }
              }
              res.json({store_id: temp[0].store_id ,date_created:temp[0].date_created, transfer_in: transferIn, transfer_out: transferOut, transfer_in_request: transferInRequest, transfer_out_request: transferOutRequest });
          }
      });
});

//GET ALL from MongoDB
app.get('/api/transfer',function(req,res){
    Transfer.getAllTransferData(function(err,data){
        if(err){
          console.log(err);
          res.json(err); //Erorr Response
        }
        else{
          res.json(data); //Final Response
        }
    });
});
