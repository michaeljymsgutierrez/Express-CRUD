//Transfer out Approved Requests
//Mobile App
app.get('/api/store/:store_id/transfer/out',function(req,res){
      var storeId = req.params;
      var transactionNumbers = [];
      var transferData = [];
      var finalResponse = [];
      //Transaction Numbers checking
      Transfer_OARTN.getTOARTNData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err);
          }
          else{
            if(data.length == 0){
              Transfer_OAR.getTOARData(storeId,function(err,data){
                if(err){
                  console.log(err);
                  res.json(err); //Erorr Response
                }
                else{
                  try{
                      res.json(data[0].transferOARdata); // Final Response
                  }catch(err){
                      console.log(err);
                      res.json([]); //Erorr Response
                  }
                }
              });
            }
            else{
              transactionNumbers = data[0].transaction_numbers;
              Transfer_OAR.getTOARData(storeId,function(err,data){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    console.log("Get TOAR Info");
                    if(data.length == 0){
                      res.json(data); //Final Response if Empty
                    }
                    else{
                      transferData = data[0].transferOARdata;
                      var transLen = transactionNumbers.length;
                      var transferLen = transferData.length;

                      for(var x = 0; x != transferLen; x++){
                        var check = transactionNumbers.indexOf(transferData[x].transaction_number);
                        if(check == -1){
                          finalResponse.push(transferData[x]);
                        }
                      }
                      res.json(finalResponse); //Final Response
                    }
                  }
              });
            }
          }
      });
});

//Web App
app.get('/api/store/:store_id/transfer/out/webapp',function(req,res){
      var storeId = req.params;
      Transfer_OAR.getTOARData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          else{
            console.log("Get TOAR Info");
            res.json(data); //Final Response if Empty
          }
      });
});

app.post('/api/store/:store_id/transfer/out/webapp',function(req,res){
       var storeId = req.params;
       var data = req.body;
       var addItem =  { store_id: storeId.store_id, transferOARdata: data };
       var existData = [];
       Transfer_OAR.getTOARData(storeId,function(err,data){
         if(err){
            console.log(err);
           res.json(err); //Erorr Response
         }
         else{
           existData = data;
           if(existData.length == 0){
               Transfer_OAR.addTOARData(addItem,function(err,addItem){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    console.log("Insert TOAR Info");
                    res.json(addItem); //Final Response
                  }
               });
           }
           else{
             var storeId = req.params.store_id;
             var len = req.body.length;
             for(var x = 0; x != len; x++){
                existData[0].transferOARdata.push(req.body[x]);
             }
             var updateData = { store_id: req.params.store_id, transferOARdata: existData[0].transferOARdata };
             Transfer_OAR.updateData(storeId,updateData,{},function(err,updateData){
                if(err){
                  console.log(err);
                  res.json(err); //Erorr Response
                }
                else{
                  console.log("Update TOAR Info");
                  res.json(addItem); //Final Response
                }
             });
           }
         }
       });
});

app.put('/api/store/:store_id/transfer/out/webapp',function(req,res){
    var storeId = req.params.store_id;
    var data = req.body;
    var updateData = { store_id: storeId, transferOARdata: data };
    Transfer_OAR.updateData(storeId,updateData,{},function(err,updateData){
        if(err){
           console.log(err);
           res.json(err); //Erorr Response
        }
        else{
            var storeId = req.params;
            Transfer_OAR.getTOARData(storeId,function(err,data){
                if(err){
                  console.log(err);
                  res.json(err); // Erorr Response
                }
                else{
                  console.log("Update TOAR Info");
                  res.json(data); //Final Response
                }
            });
        }
    });
});

app.delete('/api/store/:store_id/transfer/out/webapp',function(req,res){
    var storeId = req.params.store_id;
    Transfer_OAR.deleteData(storeId,function(err,deleteData){
        if(err){
          console.log(err);
          res.sendStatus(500); //Erorr Response
        }
        else{
          console.log("Delete CAOR Info");
          res.sendStatus(200); // Final Response
        }
    });
});
