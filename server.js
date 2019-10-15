// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// when the GET api is made to timestamp only!!
app.get("/api/timestamp", function(req, res){
  //variable that stores the latest date in milliseconds
    let unixDate = new Date().getTime();
  //variable that stores the latest date in normal format
    let utcDate = new Date().toUTCString();
  res.send({unix: unixDate, utc: utcDate});
}) 

// when the client input the selected date starting from the length of 4
app.get("/api/timestamp/:userDate", function(req, res){
  //getting the path so as to extract the user defined date used
  let path = req.path;
  let splitting = path.split("/");
  //the user defined date
  let userDate = splitting[3];
  //if the date is in normal format, convert to milliseconds and to UTC string mode
  if(userDate.length == 10 && Date.parse(userDate) >= 1000){
    let unixDate = new Date(userDate).getTime();
    let utcDate = new Date(userDate).toUTCString();
    res.send({unix: unixDate, utc: utcDate});
    //if its in milliseconds, change the milliseconds to number then to UTC string mode
  }else if(userDate.length >= 4){
    let unixDate = Number(userDate);
    let utcDate = new Date(unixDate).toUTCString();
    res.send({unix: unixDate, utc: utcDate});
    //if both of the conditions are not met, then the date is invalid
  }else{
    res.send({error: "Invalid Date"})
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});