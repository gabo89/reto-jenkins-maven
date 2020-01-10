var request = require("request");
var base_url1 = "http://localhost:4001/retoibm/sumar/142/202";
var base_url2 = "http://localhost:4001/retoibm/sumar/25/50";
var server = require("../server.js");

describe("API sumas ", function() {
  describe("GET /retoibm/sumar/142/202", function() {

    it("returns status code 200", function(done) {
      request.get(base_url1, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns 344", function(done) {
      request.get(base_url1, function(error, response, body) {
        expect(body).toBe('{"sumando1":142,"sumando2":202,"resultado":344}');
        done();     
      });
    });

 });

describe("GET /retoibm/sumar/25/50", function() {
    it("returns status code 200", function(done) {
      request.get(base_url2, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns 75", function(done) {
      request.get(base_url2, function(error, response, body) {
        expect(body).toBe('{"sumando1":25,"sumando2":50,"resultado":75}');
        done();
      });
    });
 });
});
