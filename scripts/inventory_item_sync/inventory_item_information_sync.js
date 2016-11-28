//POST Data to Mongo
app.post('/api/store/:store_id/inventory',function(req,res){
        var storeId = req.params.store_id; // Store ID
        var inventoryItemData = req.body; // POST Data
        var dateCreated = new Date();
        //DATE
        dateCreated = dateCreated.getFullYear() + "-" + dateCreated.getMonth() + "-" + dateCreated.getDate() + " "+ dateCreated.getHours() + ":" + dateCreated.getMinutes() + ":" + dateCreated.getSeconds();
        var addItem = { store_id: storeId , date_created: dateCreated, inventory_item_data: inventoryItemData }; // For Add Item
        var id = { store_id: storeId }; // Main Store ID
        var existData = []; // Temporary Container
        console.log(dateCreated);
        //Check wether the Store exist in DB
        Inventory_item.getInventoryItemData(id,function(err,data){

            existData = data;

            if(err){
                throw err;
            }
            console.log(existData);

            if(existData.length == 0){
                //If Not EXIST Create
                console.log("Ready to insert");
                Inventory_item.addInventoryItemData(addItem,function(err,data){
                    if(err){
                       throw err;
                    }
                    res.json(data);//Final Response
                })
            }
            else{
                //Push Data assigned KEY
                existData[0].inventory_item_data.push(inventoryItemData);
                //UPDATE with PUSH data
                var id = existData[0].store_id;
                var updateData = { store_id: storeId, date_created: dateCreated, inventory_item_data: existData[0].inventory_item_data };
                Inventory_item.updateData(id,updateData,{},function(err,data){
                    if(err){
                        throw err;
                    }
                    res.json(inventoryItemData); // Final Response
                });
            }
        });
});


//GET by StoreId from Mongo
app.get('/api/store/:store_id/inventory_item',function(req,res){
    var id = req.params; // ID
    var temp = [];
    var transactionActual = []; // Container for transaction actual for every StoreID
    var transactionWaste = []; // Container for  transaction waste for every StoreID
    var transactionRecords = []; // Container for  transaction records for every StoreID
    //GET data by ID
    Inventory_item.getInventoryItemData(id,function(err,data){

        if(err){
            throw err;
        }
        //Check wether the  data exist in data base
        if(data.length == 0){
            res.json(data); // Response empty Array
        }
        else{
            temp = data;
            var tempLen = temp[0].inventory_item_data.length;
            console.log(data);
            if(temp.length > 0){
              var x = 0;
              while(x != tempLen){
                  //Push Transaction Type to its group for  Custom Response
                  if(temp[0].inventory_item_data[x].transaction_type == "actual"){
                      transactionActual.push(temp[0].inventory_item_data[x]);
                  }
                  else if(temp[0].inventory_item_data[x].transaction_type == "waste"){
                      transactionWaste.push(temp[0].inventory_item_data[x]);
                  }
                  else{
                      transactionRecords.push(temp[0].inventory_item_data[x]);
                  }
                  x++;
              }
            }
            res.json({store_id: temp[0].store_id ,date_created:temp[0].date_created, transaction_actual: transactionActual, transaction_waste: transactionWaste , transaction_records: transactionRecords });
        }
    });
});
