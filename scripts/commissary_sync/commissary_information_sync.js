//Commissary Information
app.post('/api/store/:store_id/commissary',function(req,res){
      var storeId = req.params.store_id; // Store ID
      var commissaryData = req.body; // POST Data
      var dateCreated = new Date();
      //DATE
      dateCreated = dateCreated.getFullYear() + "-" + dateCreated.getMonth() + "-" + dateCreated.getDate() + " "+ dateCreated.getHours() + ":" + dateCreated.getMinutes() + ":" + dateCreated.getSeconds();
      var addItem = { store_id: storeId , date_created: dateCreated, commissary_data: commissaryData }; // For Add Item
      var id = { store_id: storeId }; // Main Store ID
      var existData = []; // Temporary Container
      //Check wether the Store exist in DB
      Commissary.getCommissaryData(id,function(err,data){
          existData = data;
          if(err){
            console.log(err);
            res.json(err); //Erorr Response
          }
          console.log(existData);
          if(existData.length == 0){
              //If Not EXIST Create
              console.log("Ready to insert");
              Commissary.addCommissaryData(addItem,function(err,data){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    res.json(data);//Final Response
                  }
              })
          }
          else{
              console.log("Ready to update");
              //Push Data assigned KEY
              existData[0].commissary_data.push(commissaryData);
              //UPDATE with PUSH data
              var id = existData[0].store_id;
              var updateData = { store_id: storeId, date_created: dateCreated, commissary_data: existData[0].commissary_data };
              Commissary.updateData(id,updateData,{},function(err,data){
                  if(err){
                    console.log(err);
                    res.json(err); //Erorr Response
                  }
                  else{
                    res.json(commissaryData); //Final Response
                  }
              });
          }
      });
});

//GET by StoreId from MongoDB
app.get('/api/store/:store_id/commissary',function(req,res){
    var id = req.params;
    Commissary.getCommissaryData(id,function(err,data){
        if(err){
            throw err;
        }
        res.json(data);
    });
});

//GET ALL from MongoDB
app.get('/api/commissary',function(req,res){
    Commissary.getAllCommissaryData(function(err,data){
        if(err){
            throw err;
        }
        res.json(data);
    });
});
