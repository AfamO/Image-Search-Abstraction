// server.js
// where your node app starts

// init project
var express = require('express');
var url=require('url');
var app = express();
var mongodb=require('mongodb');
var mongoClient = mongodb.MongoClient;
var dbUrl=process.env.MONGOLAB_URI;
var imagesInfoArray=[{"url":"http://i0.kym-cdn.com/photos/images/facebook/000/024/740/lolcats-funny-pictures-halp-not-for-sale.jpg","snippet":"Image - 24740] | LOLcats | Know Your Meme","thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwAVlPDkEfE65WZ-UmL7KxfK0sC9jCjwnujwvTDleqQ_BrB93WAT2m2fyQ","context":"http://knowyourmeme.com/photos/24740-lolcats"},{"url":"https://i.ytimg.com/vi/dWpGC6Fg0io/hqdefault.jpg","snippet":"Jas Patrick sings Snow Day starring LOLCats Funny Cats - YouTube","thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNMCLSl2dHm87xTU6uMFZD0Jym2E-4lAaSdJzfc_6OkeB_CdF1vjgZZsR2","context":"https://www.youtube.com/watch?v=dWpGC6Fg0io"},{"url":"http://i0.kym-cdn.com/photos/images/original/000/010/014/lolcats-funny-pictures-leroy-jenkins.jpg","snippet":"Image - 10014] | LOLcats | Know Your Meme","thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe_pDSRjgo3sEUaNo0xOOjh_frpTjCy1VyoPG-hh0aK7aRvfTDlXPnx-Q","context":"http://knowyourmeme.com/photos/10014-lolcats"},{"url":"https://img.scoop.it/nCDfJ08MpKhEdCcEztDllTl72eJkfbmt4t8yenImKBVvK0kTmF0xjctABnaLJIm9","snippet":"Lolcats: Trust me. - Lolcats - Funny Pictures o...","thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzlqyqamk-b85EzibpHcYlfc6i8luNd803igOeN9NL2g5C_I5-oa2P1A","context":"http://www.scoop.it/t/crazy-cats/p/1661402930/2012/04/25/lolcats-trust-me-lolcats-funny-pictures-of-cats-i-can-has"},{"url":"http://i0.kym-cdn.com/photos/images/original/000/010/017/lolcats-funny-pictures-surprise-cannibalism.jpg","snippet":"Image - 10017] | LOLcats | Know Your Meme","thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXBpDueya0bfWRnj-q0FfTmx01gdr1kCCSlfZ3brV8-oiVQKjZ1YwKb6c","context":"http://knowyourmeme.com/photos/10017-lolcats"},{"url":"https://llwproductions.files.wordpress.com/2012/05/funny-cat-pictures-with-caption-lolcats-one-dumbazh-away.jpg","snippet":"This is Motley News' 1,000th Post! Time to Celebrate with Funnies ...","thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvgMU-uS_Czv-Gw7eHFYf2Ue6wMoNX00AImn8Ljk0ZHKzjG7_us5FCG6K5","context":"https://motleynews.net/2012/05/01/this-is-motley-news-1000th-post-time-to-celebrate-with-funnies/"},{"url":"https://i.ytimg.com/vi/BZhZiCjUilk/hqdefault.jpg","snippet":"Lolcats And Funny Computer Errors - YouTube","thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-0jEp_p8F_GovkBQRiFpW21nDi6Ydx_8p4ptts2g38IVdR5nk2BNOhtEF","context":"https://www.youtube.com/watch?v=BZhZiCjUilk"},{"url":"http://i0.kym-cdn.com/photos/images/facebook/000/182/924/funny-pictures-cat-asks-to-be-sent-down-the-bar.jpg","snippet":"Image - 182924] | LOLcats | Know Your Meme","thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMw7l19VX2IKGv5idoMc6vPN4Ljl7acUu_aT_9V_8oPA36Bu0aRxzRBun0","context":"http://knowyourmeme.com/photos/182924-lolcats"},{"url":"https://i.ytimg.com/vi/amUeLI26URA/hqdefault.jpg","snippet":"Funny Cats ** video! LOLCats - Funny cat pictures - YouTube","thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBbKF1looYRPv53gww-W-FjS6oS1TYa3mpgd_A0n222VEvvjX9uAQLC53J","context":"https://www.youtube.com/watch?v=amUeLI26URA"},{"url":"http://i0.kym-cdn.com/photos/images/original/000/024/740/lolcats-funny-pictures-halp-not-for-sale.jpg","snippet":"Image - 24740] | LOLcats | Know Your Meme","thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGKaG75BuZHRVDztlPZrHNswxDhQKKK9XwxnNpj6TC_9yTF8wg42cZS4","context":"http://knowyourmeme.com/photos/24740-lolcats"}
];

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.get("/",function(request,response){
  //response.sendFile(__dirname + '/views/index.html');
});
app.get("/insertimages/", function (request, response) {
//response.sendFile(__dirname + '/views/index.html');//insertimages_used_only_once_in_a_while
//response.send(JSON.stringify(url.parse(request.url, true)))
var offset=request.query.offset;
if(dbUrl==undefined)
  {
    console.log("Dburl is missing from the env variable and thus undefined");
  }
  else
    {
          console.log("My DbUrl is::"+dbUrl);
          mongoClient.connect(dbUrl, function(err, db){
    if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
   } else {
    console.log('Connection established to my', dbUrl);
    var collection=db.collection('images-coll');
    if(collection!=null){
      //Insert the data array of images details
      collection.insert(imagesInfoArray,function(err,data){
      if(err) throw err;
      console.log("Successfully Inserted Images to DB:"+data);
      console.log(JSON.stringify(imagesInfoArray))
      response.send("Successfully Inserted Images to DB<br> The images results are:::<br>"+JSON.stringify(data));
      });
    }
    else{
      console.log('Collection images was not found on DB.');
    }
  }
  }); //Ends connect function and call back
    }
  //response.sendFile(__dirname + '/views/index.html');
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/imagesearch/*", function (request, response) {
  //https://bronze-soarer.glitch.me/imagesearch/lol%20cats?offset=10    lol%20cats?offset=10
  console.log("Search Item Without Space======= THISSSSSSSSS");
  //response.send(JSON.stringify(url.parse(request.url, true)))
  var offset=request.query.offset;
  offset=Number(offset);
  console.log("Url=="+request.url)
  var searchItem=request.url.replace("/imagesearch/","");
  console.log("Search Itemmm=="+searchItem)
  searchItem=searchItem.replace("%20","");
  console.log("Search Item Without Space== "+searchItem)
  searchItem=searchItem.replace("?offset="+offset,"");
  mongoClient.connect(dbUrl,function(err,db){
    if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to my', dbUrl);
    var collection=db.collection('images-coll');
    if(collection!=null){   //'.*' + name + '.*'  { $regex: '.*' + colName + '.*' }
      var query={snippet:{$regex:'.*' +searchItem+'.*'}};
      console.log("query=="+JSON.stringify(query))
      console.log("Search Item=="+searchItem)
      response.send("Found Images Query are:::<br>"+JSON.stringify(query));
      //Search for the array of marching images snippet
      collection.find(query).limit(offset).toArray(function(err,data){
        if(err) throw err;
        console.log("Found Images are:"+JSON.stringify(data));
        //response.send("Found Images Err are:::<br>"+JSON.stringify(err));
        response.send("Found Images are:::<br>"+JSON.stringify(data));
        if(data!=null)
          {
             if(data._id!=null)
            {
                console.log(" Images array found in DB.");
                db.close();
                var returnedData="data array"
                    //data[offset];
                response.send(data);
            }
          }
        else
          {
           console.log(" port was not found in DB.");
           response.send("Sorry!, but we can't find the corresponding images for the "+searchItem+" you requested for");
          }
      });
    }
    else{
      console.log('Collection "images-coll" was not found on DB.');
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
