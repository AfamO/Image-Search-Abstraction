// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var mongo=require('mongodb');
var mongoClient=mongo.mongoClient;
var dbUrl=process.env.MONGODB_URI;

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/imagesearch/", function (request, response) {
  var searchTerm=request.url.replace("","");
  mongoClient.connect(dbUrl,function(err,db){
    if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to my', dbUrl);
    var collection=db.collection('images');
    if(collection!=null){
      var query={snippet:};
    }
    else{
      console.log('Collection images was not found on DB.');
    }
  }
  });
  //response.sendFile(__dirname + '/views/index.html');
});

app.get("/latest", function (request, response) {
  //response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  //dreams.push(request.query.dream);
  response.sendStatus(200);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
