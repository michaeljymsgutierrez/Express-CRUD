//Inventory Information
app.get('/api/store/:store_id/inventory',function(req,res){
      var storeId = req.params;
      Inventory.getInventoryData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          else{
            console.log("Get Inventory Info");
            if(data.length == 0){
              res.json(data); //Final Response if Empty
            }
            else{
              res.json(data[0].inventory_data); //Final Response
            }
          }
      });
});

app.post('/api/store/:store_id/inventory',function(req,res){
       var storeId = req.params;
       var data = req.body;
       var addItem =  { store_id: storeId.store_id, inventory_data: data };
       var existData = [];
       Inventory.getInventoryData(storeId,function(err,data){
         if(err){
            console.log(err);
           res.json(err); //Erorr Response
         }
         else{
           existData = data;
           if(existData.length == 0){
               Inventory.addInventoryData(addItem,function(err,addItem){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    console.log("Insert Inventory Info");
                    res.json(addItem); //Final Response
                  }
               });
           }
           else{
             var storeId = req.params.store_id;
             var updateData = addItem;
             Inventory.updateData(storeId,updateData,{},function(err,updateData){
                if(err){
                  console.log(err);
                  res.json(err); //Erorr Response
                }
                else{
                  console.log("Update Inventory Info");
                  res.json(addItem); //Final Response
                }
             });
           }
         }
       });
});

app.put('/api/store/:store_id/inventory',function(req,res){
    var storeId = req.params.store_id;
    var data = req.body;
    var updateData = { store_id: storeId, inventory_data: data };
    Inventory.updateData(storeId,updateData,{},function(err,updateData){
        if(err){
           console.log(err);
           res.json(err); //Erorr Response
        }
        else{
            var storeId = req.params;
            Inventory.getInventoryData(storeId,function(err,data){
                if(err){
                  console.log(err);
                  res.json(err); // Erorr Response
                }
                else{
                  console.log("Update Inventory Info");
                  res.json(data); //Final Response
                }
            });
        }
    });
})

app.delete('/api/store/:store_id/inventory',function(req,res){
    var storeId = req.params.store_id;
    Inventory.deleteData(storeId,function(err,deleteData){
        if(err){
          console.log(err);
          res.sendStatus(500); //Erorr Response
        }
        else{
          console.log("Delete Inventory Info");
          res.sendStatus(200); // Final Response
        }
    });
});
