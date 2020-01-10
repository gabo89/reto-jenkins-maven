const _express = require('express');
const mongoose = require('mongoose');

const url="mongodb://192.168.50.5:27017/sumas"

mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology:true});

const _server = _express();

console.log("conecting to mongodb://192.168.50.5:27017/sumas");

const _port = 4000;
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
    var _sumando01 = new Number(request.params.sumando01);
    var _sumando02 = new Number(request.params.sumando02);
    var _resultado = _sumando01 + _sumando02;
    var insert = new Sumas({sumando1:_sumando01,sumando2:_sumando02,resultado:_resultado,time: Date.now()});

    insert.save(function (err) {
    if (err) return console.log(err); 
    else
	console.log("result saved : "+insert.sumando1 +" "+insert.sumando2 +" "+insert.resultado +" "+ insert.time );
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


_server.listen(_port, () => {
   console.log(`Server listening at ${_port}`);
});
