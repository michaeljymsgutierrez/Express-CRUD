//Cashier Item Information
app.get('/api/store/:store_id/cashier/items',function(req,res){
      var storeId = req.params;
      Cashier_item.getCashierItemData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          else{
            console.log("Get Cashier Item Info");
            if(data.length == 0){
              res.json(data); //Final Response if Empty
            }
            else{
              res.json(data[0].cashier_item_data); //Final Response
            }
          }
      });
});

app.post('/api/store/:store_id/cashier/items',function(req,res){
       var storeId = req.params;
       var data = req.body;
       var addItem =  { store_id: storeId.store_id, cashier_item_data: data };
       var existData = [];
       Cashier_item.getCashierItemData(storeId,function(err,data){
         if(err){
            console.log(err);
           res.json(err); //Erorr Response
         }
         else{
           existData = data;
           if(existData.length == 0){
               Cashier_item.addCashierItemData(addItem,function(err,addItem){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    console.log("Insert Cashier Item Info");
                    res.json(addItem); //Final Response
                  }
               });
           }
           else{
             var storeId = req.params.store_id;
             var updateData = addItem;
             Cashier_item.updateData(storeId,updateData,{},function(err,updateData){
                if(err){
                  console.log(err);
                  res.json(err); //Erorr Response
                }
                else{
                  console.log("Update Cashier Item Info");
                  res.json(addItem); //Final Response
                }
             });
           }
         }
       });
});

app.put('/api/store/:store_id/cashier/items',function(req,res){
    var storeId = req.params.store_id;
    var data = req.body;
    var updateData = { store_id: storeId, cashier_item_data: data };
    Cashier_item.updateData(storeId,updateData,{},function(err,updateData){
        if(err){
           console.log(err);
           res.json(err); //Erorr Response
        }
        else{
            var storeId = req.params;
            Cashier_item.getCashierItemData(storeId,function(err,data){
                if(err){
                  console.log(err);
                  res.json(err); // Erorr Response
                }
                else{
                  console.log("Update Cashier Item Info");
                  res.json(data); //Final Response
                }
            });
        }
    });
})

app.delete('/api/store/:store_id/cashier/items',function(req,res){
    var storeId = req.params.store_id;
    Cashier_item.deleteData(storeId,function(err,deleteData){
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
