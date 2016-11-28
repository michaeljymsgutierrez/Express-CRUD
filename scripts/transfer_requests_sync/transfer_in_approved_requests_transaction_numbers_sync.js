//Transfer In Approved Requests Transaction Numbers
//Mobile App
app.post('/api/store/:store_id/transfer/in',function(req,res){
       var storeId = req.params;
       var data = req.body;
       var addItem =  { store_id: storeId.store_id, transaction_numbers: data.transaction_numbers };
       var existData = [];
       Transfer_IARTN.getTIARTNData(storeId,function(err,data){
         if(err){
            console.log(err);
           res.json(err); //Erorr Response
         }
         else{
           existData = data;
           if(existData.length == 0){
               Transfer_IARTN.addTIARTNData(addItem,function(err,addItem){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    console.log("Insert TIARTN Info");
                    var response = { response: null };
                    res.json(response.response); //Final Response
                  }
               });
           }
           else{
             var storeId = req.params.store_id;
             var pushLen = req.body.transaction_numbers.length;
             existDataTemp = existData[0].transaction_numbers;
             //Push Transaction Numbers if not Exist
             for(var x = 0; x != pushLen; x++){
                 var check = existData[0].transaction_numbers.indexOf(req.body.transaction_numbers[x]);
                 if(check == -1){
                   existDataTemp.push(req.body.transaction_numbers[x]);
                 }
             }
             var updateData = { store_id: req.params.store_id, transaction_numbers: existDataTemp };
             Transfer_IARTN.updateData(storeId,updateData,{},function(err,updateData){
                if(err){
                  console.log(err);
                  res.json(err); //Erorr Response
                }
                else{
                  console.log("Update TIARTN Info");
                  var response = { response: null };
                  res.json(response.response); //Final Response
                }
             });
           }
         }
       });
});


//Web App
app.get('/api/store/:store_id/transfer/in/transaction_numbers/webapp',function(req,res){
      var storeId = req.params;
      Transfer_IARTN.getTIARTNData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          else{
            console.log("Get TIARTN Info");
            res.json(data); //Final Response if Empty
          }
      });
});

app.put('/api/store/:store_id/transfer/in/transaction_numbers/webapp',function(req,res){
    var storeId = req.params.store_id;
    var data = req.body;
    var updateData = { store_id: storeId, transaction_numbers: data.transaction_numbers };
    Transfer_IARTN.updateData(storeId,updateData,{},function(err,updateData){
        if(err){
           console.log(err);
           res.json(err); //Erorr Response
        }
        else{
            var storeId = req.params;
            Transfer_IARTN.getTIARTNData(storeId,function(err,data){
                if(err){
                  console.log(err);
                  res.json(err); // Erorr Response
                }
                else{
                  console.log("Update TIARTN  Info");
                  res.json(data); //Final Response
                }
            });
        }
    });
});

app.delete('/api/store/:store_id/transfer/in/transaction_numbers/webapp',function(req,res){
    var storeId = req.params.store_id;
    Transfer_IARTN.deleteData(storeId,function(err,deleteData){
        if(err){
          console.log(err);
          res.sendStatus(500); //Erorr Response
        }
        else{
          console.log("Delete TIARTN Info");
          res.sendStatus(200); // Final Response
        }
    });
});
