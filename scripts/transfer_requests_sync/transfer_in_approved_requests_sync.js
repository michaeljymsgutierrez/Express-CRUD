//Transfer In Approved Requests
//Mobile App
app.get('/api/store/:store_id/transfer/in',function(req,res){
      var storeId = req.params;
      var transactionNumbers = [];
      var transferData = [];
      var finalResponse = [];
      //Transaction Numbers checking
      Transfer_IARTN.getTIARTNData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err);
          }
          else{
            if(data.length == 0){
              Transfer_IAR.getTIARData(storeId,function(err,data){
                if(err){
                  console.log(err);
                  res.json(err); //Erorr Response
                }
                else{
                  try{
                      res.json(data[0].transferIARdata); // Final Response
                  }catch(err){
                      console.log(err);
                      res.json([]); //Erorr Response
                  }
                }
              });
            }
            else{
              transactionNumbers = data[0].transaction_numbers;
              Transfer_IAR.getTIARData(storeId,function(err,data){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    console.log("Get TIAR Info");
                    if(data.length == 0){
                      res.json(data); //Final Response if Empty
                    }
                    else{
                      transferData = data[0].transferIARdata;
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
app.get('/api/store/:store_id/transfer/in/webapp',function(req,res){
      var storeId = req.params;
      Transfer_IAR.getTIARData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          else{
            console.log("Get TIAR Info");
            res.json(data); //Final Response if Empty
          }
      });
});

app.post('/api/store/:store_id/transfer/in/webapp',function(req,res){
       var storeId = req.params;
       var data = req.body;
       var addItem =  { store_id: storeId.store_id, transferIARdata: data };
       var existData = [];
       Transfer_IAR.getTIARData(storeId,function(err,data){
         if(err){
            console.log(err);
           res.json(err); //Erorr Response
         }
         else{
           existData = data;
           if(existData.length == 0){
               Transfer_IAR.addTIARData(addItem,function(err,addItem){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    console.log("Insert TIAR Info");
                    res.json(addItem); //Final Response
                  }
               });
           }
           else{
             var storeId = req.params.store_id;
             var len = req.body.length;
             for(var x = 0; x != len; x++){
                existData[0].transferIARdata.push(req.body[x]);
             }
             var updateData = { store_id: req.params.store_id, transferIARdata: existData[0].transferIARdata };
             Transfer_IAR.updateData(storeId,updateData,{},function(err,updateData){
                if(err){
                  console.log(err);
                  res.json(err); //Erorr Response
                }
                else{
                  console.log("Update TIAR Info");
                  res.json(addItem); //Final Response
                }
             });
           }
         }
       });
});

app.put('/api/store/:store_id/transfer/in/webapp',function(req,res){
    var storeId = req.params.store_id;
    var data = req.body;
    var updateData = { store_id: storeId, transferIARdata: data };
    Transfer_IAR.updateData(storeId,updateData,{},function(err,updateData){
        if(err){
           console.log(err);
           res.json(err); //Erorr Response
        }
        else{
            var storeId = req.params;
            Transfer_IAR.getTIARData(storeId,function(err,data){
                if(err){
                  console.log(err);
                  res.json(err); // Erorr Response
                }
                else{
                  console.log("Update TIAR Info");
                  res.json(data); //Final Response
                }
            });
        }
    });
});

app.delete('/api/store/:store_id/transfer/in/webapp',function(req,res){
    var storeId = req.params.store_id;
    Transfer_IAR.deleteData(storeId,function(err,deleteData){
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
