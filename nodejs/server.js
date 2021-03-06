const dotenv = require('dotenv');
const path = require('path')
dotenv.config(); 

const _express = require('express');
const mongoose = require('mongoose');

const servidor=process.env.servidor;
const puerto=process.env.puerto;
const username=process.env.username;
const password=process.env.password;

const url=`mongodb://${username}:${password}@${servidor}:${puerto}/sumas?authSource=admin`

console.log(`waiting to conect to ${url}`);
async function connect()
{
var db1 = null
while (db1 === null) {
  try {
    db1 = await new Promise((resolve, reject) => {
      new mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology:true}).then(
        () => { console.log(`success at connect ${url}`); main(); },
        err => { console.log(`error, retrying at connect ${url}`);connect(); }
      );
    })   
    //insert a sleep so you're waiting a bit to reconnect
    setTimeout(showlog, 10000);
  } catch (e) {
    console.log(e);
  }
}
}

function showlog()
{
console.log(`waiting`);
}

connect();


function main()
{
const _server = _express();
const _port = 4000;
mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology:true});
var db = mongoose.connection;
db.on('error',function(){
 console.log('connection error');
});

db.once('open', function() {
  console.log("we are connected to mongodb");
});



var SumaSchema = new mongoose.Schema({
  sumando1: String,
  sumando2: String,
  resultado : String,
  time : String
});

var Sumas = mongoose.model('Sumas', SumaSchema);

_server.get('/retoibm/sumar/:sumando01/:sumando02', function(request, response) {
  try{
    var _sumando01 =  Number(request.params.sumando01);
    var _sumando02 =  Number(request.params.sumando02);
    var _resultado = _sumando01 + _sumando02;
    var insert = new Sumas({sumando1:_sumando01,sumando2:_sumando02,resultado:_resultado,time: Date.now()});

    insert.save(function (err) {
      if (err) {
        return console.log(err);
      } else {
        console.log("result saved : "+insert.sumando1 +" "+insert.sumando2 +" "+insert.resultado +" "+ insert.time );
      }
    });

    if (typeof _resultado !== "undefined" && _resultado!==null && !isNaN(_resultado)){    
      return response.status(200).json({sumando1: _sumando01 , sumando2: _sumando02 ,resultado : _resultado});
    }else{
      return response.status(400).json({sumando1: _sumando01 , sumando2: _sumando02 ,resultado : "Bad Request"});
    }
  }
  catch(e){
    return response.status(500).json({sumando1: _sumando01 , sumando2: _sumando02 ,resultado : e});
  }
});

_server.get('/retoibm/getall', function(request, response) {

 var data = db.collection('sumas');

    data.find({}).toArray(function (err, result) {
        if (err) {
            return response.status(500).json({error:err});
        } else {
            return response.status(200).json(result);
        }
    })

});

_server.get('/status', function(request, response) {
    return response.status(200).json({sumando1: 0 , sumando2: 0 ,resultado : "status OK"});
});


_server.listen(_port, () => {
   console.log(`Server listening at ${_port}`);
});
}
