//Branch Information
app.get('/api/store/:store_id/branch',function(req,res){
      var storeId = req.params;
      Branch.getBranchData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          else{
            console.log("Get Branch Info");
            if(data.length == 0){
              res.json(data); //Final Response if Empty
            }
            else{
              res.json(data[0].branch_data); //Final Response
            }
          }
      });
});

app.post('/api/store/:store_id/branch',function(req,res){
       var storeId = req.params;
       var data = req.body;
       var addItem =  { store_id: storeId.store_id, branch_data: data };
       var existData = [];
       Branch.getBranchData(storeId,function(err,data){
         if(err){
            console.log(err);
           res.json(err); //Erorr Response
         }
         else{
           existData = data;
           if(existData.length == 0){
               Branch.addBranchData(addItem,function(err,addItem){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    console.log("Insert Branch Info");
                    res.json(addItem); //Final Response
                  }
               });
           }
           else{
             var storeId = req.params.store_id;
             var updateData = addItem;
             Branch.updateData(storeId,updateData,{},function(err,updateData){
                if(err){
                  console.log(err);
                  res.json(err); //Erorr Response
                }
                else{
                  console.log("Update Branch Info");
                  res.json(addItem); //Final Response
                }
             });
           }
         }
       });
});

app.put('/api/store/:store_id/branch',function(req,res){
    var storeId = req.params.store_id;
    var data = req.body;
    var updateData = { store_id: storeId, branch_data: data };
    Branch.updateData(storeId,updateData,{},function(err,updateData){
        if(err){
           console.log(err);
           res.json(err); //Erorr Response
        }
        else{
            var storeId = req.params;
            Branch.getBranchData(storeId,function(err,data){
                if(err){
                  console.log(err);
                  res.json(err); // Erorr Response
                }
                else{
                  console.log("Update Branch Info");
                  res.json(data); //Final Response
                }
            });
        }
    });
})

app.delete('/api/store/:store_id/branch',function(req,res){
    var storeId = req.params.store_id;
    Branch.deleteData(storeId,function(err,deleteData){
        if(err){
          console.log(err);
          res.sendStatus(500); //Erorr Response
        }
        else{
          console.log("Delete Branch Info");
          res.sendStatus(200); // Final Response
        }
    });
});
