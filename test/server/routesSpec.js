
var app = require('../../server/server');

app.listen(3113);

var request = require('supertest');
var expect = require('chai').expect;
var bodyParser = require('body-parser');
var path = require('path');


var assert = require('assert'),
    otherAssert = require('chai').assert,
    http = require('http');

var url = "http://localhost:3113"

describe('/', function () {
  it('should return 200', function (done) {
    http.get(url, function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('/api/events/search', function () {
  it('should return 200', function (done) {
    http.get(url+'/api/events/search', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('/categorysearch', function () {
  it('should return 200', function (done) {
    http.get(url+'/api/events/categorysearch', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});





describe('event routes', function() {

  describe('search ', function() {
    it('returns 200 for search', function(done) {
      request(url)
        .get('/api/events/search?query=sentinel')
        .expect(200)
        .end(done);
    });
  });
});

describe('/popularevent', function () {
  it('should return 200', function (done) {
    http.get(url+'/api/events/popularevent', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('/event/1', function () {
  it('should return 200', function (done) {
    http.get(url+'/api/events/event/1', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('/triggerevent', function () {
  it('should return 403', function (done) {
    http.get(url+'/api/events/triggerevent', function (res) {
      assert.equal(403, res.statusCode);
      done();
    });
  });
});

describe('/myevents', function () {
  it('should return 403', function (done) {
    http.get(url+'/api/events/myevents', function (res) {
      assert.equal(403, res.statusCode);
      done();
    });
  });
});

describe('/arglebargle', function () {
  it('should return 404', function (done) {
    http.get(url+'/api/events/arglebargle', function (res) {
      assert.equal(404, res.statusCode);
      done();
    });
  });
});

describe('/signedin', function () {
  it('should return 200', function (done) {
    http.get(url+'/api/users/signedin', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('/verify', function () {
  it('should return 200', function (done) {
    http.get(url+'/api/users/verify?username=BigPete&secretCode=secretcode', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});


describe("Posting is easy to test with supertest", function (){
 
  it("posts a new user to /users", function(done){
    var user = { username : 'BigPete', 
                  password: 'test', 
                  email : 'fake@gmail.com' };
 
    request(url)
      .post("/api/users/signup")
      .send(user)
      .expect(200, done);
  });

  it("logs out", function(done){
    var user = { username : 'BigPete', 
                  password: 'test', 
                  email : 'fake@gmail.com' };
  
    request(url)
      .get("/api/users/signout")
      .expect(200, done);
  });

  it("logs in user", function(done){
    request(url)
      .post("/api/users/signin")
      .send({username: 'BigPete',
             password: 'test'})
      .expect(302, 'Moved Temporarily. Redirecting to /', done);
  })

  it("user is logged in", function(done){
    request(url)
      .get("/api/users/signedin")
      .set('Accept', 'application/json')
      .expect(200, done);
  });

});
