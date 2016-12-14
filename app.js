var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var requestify = require('requestify');
var fs = require('fs');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Store  Model
Store = require('./models/store_information');
//Branch Model
Branch = require('./models/branch_information');
//Employee Model
Employee = require('./models/employee_information');
//Inventory Model
Inventory = require('./models/inventory_information');
//Cashier Model
Cashier_item = require('./models/cashier_item_information');
//Attendance Model
Attendance = require('./models/attendance_information');
//Cash Management Model
Cash_management = require('./models/cash_management_information');
//Commissary Model
Commissary = require('./models/commissary_information');
//Transfer Model
Transfer = require('./models/transfer_information');
//Inventory Item Information Model
Inventory_item = require('./models/inventory_item_information');
//Production Information Model
Production = require('./models/production_information');
//Cashier Information Model
Cashier = require('./models/cashier_information');

//Commissary Approved Order Requests Model
Commissary_AOR = require('./models/commissary_requests/commissary_approved_order_requests_information');
//Commissary Approved Order Requests Transaction Numbers Model
Commissary_AORTN = require('./models/commissary_requests/commissary_approved_order_requests_information_transaction_numbers');

//Commissary Approved Pullout Requests Model
Commissary_APOR = require('./models/commissary_requests/commissary_approved_pullout_requests_information');
//Commissary Approved Pullout Requests Transaction Numbers Model
Commissary_APORTN = require('./models/commissary_requests/commissary_approved_pullout_requests_information_transaction_numbers');

//Transfer in Approved Requests Model
Transfer_IAR = require('./models/transfer_requests/transfer_in_approved_requests_information');
//Transfer in Approved Requests Transaction Numbers Model
Transfer_IARTN = require('./models/transfer_requests/transfer_in_approved_requests_information_transaction_numbers');

//Transfer out Approved Requests Model
Transfer_OAR = require('./models/transfer_requests/transfer_out_approved_requests_information');
//Transfer out Approved Requests Transaction Numbers Model
Transfer_OARTN = require('./models/transfer_requests/transfer_out_approved_requests_information_transaction_numbers');

var data; // Generated Token
var storeId; //Store_id from Login
var credential; // Mobile Credential
var responseAuth; //Response Authentication
var apiUrl = 'http://dippindots.adams-bms.com/api'; // API UrI
var mongoUrl = 'mongodb://localhost/bms'; // MongoDb UrI

//MongoDb Connection
mongoose.connect(mongoUrl);
var db = mongoose.connection;

//Generate Token, Authenticate Username @ Password LogIN @ LogOut
eval(fs.readFileSync('./scripts/authentication.js').toString());
//Store Information Sync
eval(fs.readFileSync('./scripts/store_sync/store_information_sync.js').toString());
//Branch Information Sync
eval(fs.readFileSync('./scripts/store_sync/branch_information_sync.js').toString());
//Employee Sync
eval(fs.readFileSync('./scripts/employee_sync/employee_information_sync.js').toString());
//Inventory Information Sync
eval(fs.readFileSync('./scripts/inventory_sync/inventory_information_sync.js').toString());
//Cashier Item Information Sync
eval(fs.readFileSync('./scripts/inventory_sync/cashier_item_information_sync.js').toString());
//Attendance Information Sync
eval(fs.readFileSync('./scripts/attendance_sync/attendance_information_sync.js').toString());
//Cash Management Information Sync
eval(fs.readFileSync('./scripts/cash_management_sync/cash_management_information_sync.js').toString());
//Commissary Information Sync
eval(fs.readFileSync('./scripts/commissary_sync/commissary_information_sync.js').toString());
//Transfer Information Sync
eval(fs.readFileSync('./scripts/transfer_sync/transfer_information_sync.js').toString());
//Inventory Item Information Sync
eval(fs.readFileSync('./scripts/inventory_item_sync/inventory_item_information_sync.js').toString());
//Production Information Sync
eval(fs.readFileSync('./scripts/production_sync/production_information_sync.js').toString());
//Cashier Information Sync
eval(fs.readFileSync('./scripts/cashier_sync/cashier_information_sync.js').toString());

//Commissary Approved Order Requests Sync
eval(fs.readFileSync('./scripts/commissary_requests_sync/commissary_approved_order_requests_sync.js').toString());
//Commissary Approved Order Requests Transaction Numbers Sync
eval(fs.readFileSync('./scripts/commissary_requests_sync/commissary_approved_order_requests_transaction_numbers_sync.js').toString());

//Commissary Approved Pullout Requests Sync
eval(fs.readFileSync('./scripts/commissary_requests_sync/commissary_approved_pullout_requests_sync.js').toString());
//Commissary Approved Pullout Requests Transaction Numbers Sync
eval(fs.readFileSync('./scripts/commissary_requests_sync/commissary_approved_pullout_requests_transaction_numbers_sync.js').toString());

//Transfer In Approved Requests Sync
eval(fs.readFileSync('./scripts/transfer_requests_sync/transfer_in_approved_requests_sync.js').toString());
//Transfer In Approved Requests Transaction Numbers Sync
eval(fs.readFileSync('./scripts/transfer_requests_sync/transfer_in_approved_requests_transaction_numbers_sync.js').toString());

//Transfer Out Approved Requests Sync
eval(fs.readFileSync('./scripts/transfer_requests_sync/transfer_out_approved_requests_sync.js').toString());
//Transfer Out Approved Requests Transaction Numbers Sync
eval(fs.readFileSync('./scripts/transfer_requests_sync/transfer_out_approved_requests_transaction_numbers_sync.js').toString());



app.listen(port,'0.0.0.0',function(){
    console.log("Running on port 3000...");
});
