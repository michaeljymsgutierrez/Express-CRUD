//Store Information
app.get('/api/store/:store_id',function(req,res){
      var storeId = req.params;
      Store.getStoreData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          else{
            console.info("Get Store Info");
            if(data.length == 0){
              res.json(data); //Final Response if Empty
            }
            else{
              res.json(data[0]); //Final Response
            }
          }
      });
});

app.post('/api/store/:store_id',function(req,res){
      var storeId = req.params;
      var addItem =  req.body;
      var existData = [];
      Store.getStoreData(storeId,function(err,data){
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          else{
            existData = data;
            if(existData.length == 0){
                Store.addStoreData(addItem,function(err,addItem){
                    if(err){
                      console.log(err);
                      res.json(err); //Erorr Response
                    }
                    else{
                      console.log("Insert Store Info");
                      res.json(addItem); //Final Response
                    }
                });
            }
            else{
                var storeId = req.params.store_id;
                var updateData = addItem;
                Store.updateData(storeId,updateData,{},function(err,updateData){
                    if(err){
                      console.log(err);
                      res.json(err); //Erorr Response
                    }
                    else{
                      console.log("Update Store Info");
                      res.json(addItem); //Final Response
                    }
                });
            }
          }
      });
});

app.put('/api/store/:store_id',function(req,res){
    var storeId = req.params.store_id;
    var updateData = req.body;
    Store.updateData(storeId,updateData,{},function(err,updateData){
        if(err){
          console.log(err);
          res.json(err); //Erorr Response
        }
        else{
          var storeId = req.params;
          Store.getStoreData(storeId,function(err,data){
              if(err){
                console.log(err);
                res.json(err); //Erorr Response
              }
              else{
                console.log("Update Store Info");
                res.json(data); //Final Response
              }
          });
        }
    });
});

app.delete('/api/store/:store_id',function(req,res){
    var storeId =  req.params.store_id;
    Store.deleteData(storeId,function(err,deleteData){
        if(err){
          console.log(err);
          res.sendStatus(500); //Final Response Internal Erorr
        }
        else{
          console.log("Delete Store Info");
          res.sendStatus(200); //Final Reponse OK
        }
    });
});
