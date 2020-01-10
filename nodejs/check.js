var http = require("http");

var options = {  
    host : "192.168.50.4",
    port : "4000",
    path : "/retoibm/sumar/10/20",
    timeout : 5000
};

var request = http.request(options, (res) => {  
    console.log(`STATUS: ${res.statusCode}`);
    if (res.statusCode == 200) {
        process.exit(0);
    }
    else {
        process.exit(1);
    }
});

request.on('error', function(err) {  
    console.log('ERROR');
    process.exit(1);
});

request.end();  
