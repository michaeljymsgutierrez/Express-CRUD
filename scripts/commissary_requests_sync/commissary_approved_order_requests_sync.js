//Commissary Approved Order Requests
//Mobile App
app.get('/api/store/:store_id/commissary/order',function(req,res){
      var storeId = req.params;
      var transactionNumbers = [];
      var commissaryData = [];
      var finalResponse = [];
      //Transaction Numbers checking
      Commissary_AORTN.getCAORTNData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err);
          }
          else{
            if(data.length == 0){
              Commissary_AOR.getCAORData(storeId,function(err,data){
                if(err){
                  console.log(err);
                  res.json(err); //Erorr Response
                }
                else{
                  try{
                      res.json(data[0].commissary_AOR_data); // Final Response
                  }catch(err){
                      console.log(err);
                      res.json([]); //Error Response
                  }
                }
              });
            }
            else{
              transactionNumbers = data[0].transaction_numbers;
              Commissary_AOR.getCAORData(storeId,function(err,data){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    console.log("Get CAOR Info");
                    if(data.length == 0){
                      res.json(data); //Final Response if Empty
                    }
                    else{
                      commissaryData = data[0].commissary_AOR_data;
                      var transLen = transactionNumbers.length;
                      var comLen = commissaryData.length;

                      for(var x = 0; x != comLen; x++){
                        var check = transactionNumbers.indexOf(commissaryData[x].transaction_number);
                        if(check == -1){
                          finalResponse.push(commissaryData[x]);
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
app.get('/api/store/:store_id/commissary/order/webapp',function(req,res){
      var storeId = req.params;
      Commissary_AOR.getCAORData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          else{
            console.log("Get CAOR Info");
            res.json(data); //Final Response if Empty
          }
      });
});

app.post('/api/store/:store_id/commissary/order/webapp',function(req,res){
       var storeId = req.params;
       var data = req.body;
       var addItem =  { store_id: storeId.store_id, commissary_AOR_data: data };
       var existData = [];
       Commissary_AOR.getCAORData(storeId,function(err,data){
         if(err){
            console.log(err);
           res.json(err); //Erorr Response
         }
         else{
           existData = data;
           if(existData.length == 0){
               Commissary_AOR.addCAORData(addItem,function(err,addItem){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    console.log("Insert CAOR Info");
                    res.json(addItem); //Final Response
                  }
               });
           }
           else{
             var storeId = req.params.store_id;
             var len = req.body.length;
             for(var x = 0; x != len; x++){
                existData[0].commissary_AOR_data.push(req.body[x]);
             }
             var updateData = { store_id: req.params.store_id, commissary_AOR_data: existData[0].commissary_AOR_data };
             Commissary_AOR.updateData(storeId,updateData,{},function(err,updateData){
                if(err){
                  console.log(err);
                  res.json(err); //Erorr Response
                }
                else{
                  console.log("Update CAOR Info");
                  res.json(addItem); //Final Response
                }
             });
           }
         }
       });
});

app.put('/api/store/:store_id/commissary/order/webapp',function(req,res){
    var storeId = req.params.store_id;
    var data = req.body;
    var updateData = { store_id: storeId, commissary_AOR_data: data };
    Commissary_AOR.updateData(storeId,updateData,{},function(err,updateData){
        if(err){
           console.log(err);
           res.json(err); //Erorr Response
        }
        else{
            var storeId = req.params;
            Commissary_AOR.getCAORData(storeId,function(err,data){
                if(err){
                  console.log(err);
                  res.json(err); // Erorr Response
                }
                else{
                  console.log("Update CAOR Info");
                  res.json(data); //Final Response
                }
            });
        }
    });
});

app.delete('/api/store/:store_id/commissary/order/webapp',function(req,res){
    var storeId = req.params.store_id;
    Commissary_AOR.deleteData(storeId,function(err,deleteData){
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
