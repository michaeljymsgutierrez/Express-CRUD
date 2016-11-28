/************************** M O B I L E   A U T H E N T I C A T I O N ***************/
//Username and Password Authentication LOG OUT
app.post('/api/user/logout',function(req,res){
    var csrfToken = JSON.stringify(req.headers['x-csrf-token']);
    requestify.request(apiUrl+'/user/logout',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
        }
    }).then(function(response){
          var data = response.getBody();
          res.json(data);
    },function(err){
          var data = err.getBody();
          res.json(data);
    });

});

//Request Token
app.post('/api/user/token',function(req,res){
    requestify.post(apiUrl+'/user/token').then(function(response,token){
        data = response.getBody();
        res.json(data);
    });
});

//Username and Password Authentication LOGIN
app.post('/api/user/login',function(req,res){
    credential = req.body;
    console.log(data);
    console.log("username: " + credential.username + " *** " + "password: "+credential.password);
    requestify.request(apiUrl+'/user/login',{
        method: 'POST',
        body: {
            'username': credential.username,
            'password': credential.password
        },
        headers: {
          'X-CSRF-Token': data.token,
          'Content-Type': 'application/json'
        }
    }).then(function(response){
          responseAuth = response.getBody();
          storeId = responseAuth.store_id;
          res.json(responseAuth);
          console.log(storeId);
          console.log(sessId+" **** "+sessName);

    });
});
