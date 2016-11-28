//Commissary Approved Order Requests Transaction Numbers
//Mobile App
app.post('/api/store/:store_id/commissary/order',function(req,res){
       var storeId = req.params;
       var data = req.body;
       var addItem =  { store_id: storeId.store_id, transaction_numbers: data.transaction_numbers };
       var existData = [];
       Commissary_AORTN.getCAORTNData(storeId,function(err,data){
         if(err){
            console.log(err);
           res.json(err); //Erorr Response
         }
         else{
           existData = data;
           if(existData.length == 0){
               Commissary_AORTN.addCAORTNData(addItem,function(err,addItem){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    console.log("Insert CAORTN Info");
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
             Commissary_AORTN.updateData(storeId,updateData,{},function(err,updateData){
                if(err){
                  console.log(err);
                  res.json(err); //Erorr Response
                }
                else{
                  console.log("Update CAORTN Info");
                  var response = { response: null };
                  res.json(response.response); //Final Response
                }
             });
           }
         }
       });
});


//Web App
app.get('/api/store/:store_id/commissary/order/transaction_numbers/webapp',function(req,res){
      var storeId = req.params;
      Commissary_AORTN.getCAORTNData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          else{
            console.log("Get CAORTN Info");
            res.json(data); //Final Response if Empty
          }
      });
});

app.put('/api/store/:store_id/commissary/order/transaction_numbers/webapp',function(req,res){
    var storeId = req.params.store_id;
    var data = req.body;
    var updateData = { store_id: storeId, transaction_numbers: data.transaction_numbers };
    Commissary_AORTN.updateData(storeId,updateData,{},function(err,updateData){
        if(err){
           console.log(err);
           res.json(err); //Erorr Response
        }
        else{
            var storeId = req.params;
            Commissary_AORTN.getCAORTNData(storeId,function(err,data){
                if(err){
                  console.log(err);
                  res.json(err); // Erorr Response
                }
                else{
                  console.log("Update CAORTN Info");
                  res.json(data); //Final Response
                }
            });
        }
    });
});

app.delete('/api/store/:store_id/commissary/order/transaction_numbers/webapp',function(req,res){
    var storeId = req.params.store_id;
    Commissary_AORTN.deleteData(storeId,function(err,deleteData){
        if(err){
          console.log(err);
          res.sendStatus(500); //Erorr Response
        }
        else{
          console.log("Delete CAORTN Info");
          res.sendStatus(200); // Final Response
        }
    });
});
