//Commissary Approved Pullout Requests
//Mobile App
app.get('/api/store/:store_id/commissary/pull_out',function(req,res){
      var storeId = req.params;
      var transactionNumbers = [];
      var commissaryData = [];
      var finalResponse = [];
      //Transaction Numbers checking
      Commissary_APORTN.getCAPORTNData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err);
          }
          else{
            if(data.length == 0){
              Commissary_APOR.getCAPORData(storeId,function(err,data){
                if(err){
                  console.log(err);
                  res.json(err); //Erorr Response
                }
                else{
                  res.json(data[0].commissary_APOR_data); // Final Response
                }
              });
            }
            else{
              transactionNumbers = data[0].transaction_numbers;
              Commissary_APOR.getCAPORData(storeId,function(err,data){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    console.log("Get CAPOR Info");
                    if(data.length == 0){
                      res.json(data); //Final Response if Empty
                    }
                    else{
                      commissaryData = data[0].commissary_APOR_data;
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
app.get('/api/store/:store_id/commissary/pull_out/webapp',function(req,res){
      var storeId = req.params;
      Commissary_APOR.getCAPORData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          else{
            console.log("Get CAPOR Info");
            res.json(data); //Final Response if Empty
          }
      });
});

app.post('/api/store/:store_id/commissary/pull_out/webapp',function(req,res){
       var storeId = req.params;
       var data = req.body;
       var addItem =  { store_id: storeId.store_id, commissary_APOR_data: data };
       var existData = [];
       Commissary_APOR.getCAPORData(storeId,function(err,data){
         if(err){
            console.log(err);
           res.json(err); //Erorr Response
         }
         else{
           existData = data;
           if(existData.length == 0){
               Commissary_APOR.addCAPORData(addItem,function(err,addItem){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    console.log("Insert CAPOR Info");
                    res.json(addItem); //Final Response
                  }
               });
           }
           else{
             var storeId = req.params.store_id;
             var len = req.body.length;
             for(var x = 0; x != len; x++){
                existData[0].commissary_APOR_data.push(req.body[x]);
             }
             var updateData = { store_id: req.params.store_id, commissary_APOR_data: existData[0].commissary_APOR_data };
             Commissary_APOR.updateData(storeId,updateData,{},function(err,updateData){
                if(err){
                  console.log(err);
                  res.json(err); //Erorr Response
                }
                else{
                  console.log("Update CAPOR Info");
                  res.json(addItem); //Final Response
                }
             });
           }
         }
       });
});

app.put('/api/store/:store_id/commissary/pull_out/webapp',function(req,res){
    var storeId = req.params.store_id;
    var data = req.body;
    var updateData = { store_id: storeId, commissary_APOR_data: data };
    Commissary_APOR.updateData(storeId,updateData,{},function(err,updateData){
        if(err){
           console.log(err);
           res.json(err); //Erorr Response
        }
        else{
            var storeId = req.params;
            Commissary_APOR.getCAPORData(storeId,function(err,data){
                if(err){
                  console.log(err);
                  res.json(err); // Erorr Response
                }
                else{
                  console.log("Update CAPOR Info");
                  res.json(data); //Final Response
                }
            });
        }
    });
});

app.delete('/api/store/:store_id/commissary/pull_out/webapp',function(req,res){
    var storeId = req.params.store_id;
    Commissary_APOR.deleteData(storeId,function(err,deleteData){
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
