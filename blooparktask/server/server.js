var express = require('express');
var socket = require('socket.io');
const querystring = require('querystring');
var app = express();
var fs = require('fs');
var https = require('https');

server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});
io = socket(server);
io.on('connection', (socket) => {


socket.on('SEND_MESSAGE', function(data){


  var postData = querystring.stringify({

      'postcode' : data.czipcode,
       'city'    :  data.ccity,
        'phone'  :  data.cnumber,
        'name'     : data.cname,
   });

   var options = {
     hostname: 'localhost',
     port: 4432,
     path: '/',
     method: 'POST',
     ca: [ fs.readFileSync('../config/settings/cert.pem')],
     headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        }
   };


  var req = https.request(options, (res) => {

     res.on('data',(d) => {

                  console.log(d.toString());
                io.emit('RECEIVE_MESSAGE', d.toString());

    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(postData);
  req.end()

});
});
