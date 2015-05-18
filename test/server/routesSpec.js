
var app = require('../../server/server');

app.listen(3113);

var request = require('supertest')(app);
var expect = require('chai').expect;
var bodyParser = require('body-parser');
var path = require('path');

var assert = require('assert'),
    otherAssert = require('chai').assert,
    http = require('http');


describe('/', function () {
  it('should return 200', function (done) {
    request
      .get('/')
      .expect(200, done);
  });
});

describe('/api/events/search', function () {
  it('should return 200', function (done) {
    request
      .get('/api/events/search')
      .expect(200)
      .end(done); 
  });
});


describe('/categorysearch', function () {
  it('should return 200', function (done) {
    request
      .get('/api/events/categorysearch')
      .expect(200)
      .end(done); 
  });
});

describe('event routes', function() {

  describe('search ', function() {
    it('returns 200 for search', function(done) {
      request
        .get('/api/events/search?query=sentinel')
        .expect(200)
        .end(done);
    });
  });


  describe('/popularevent', function () {
    it('should return 200', function (done) {
      request
        .get('/api/events/popularevent')
        .expect(200)
        .end(done);
    });
  });

  describe('/event/1', function () {
    it('should return 200', function (done) {
      request
        .get('/api/events/event/1')
        .expect(200)
        .end(done);
    });
  });


  describe('/triggerevent', function () {
    it('should return 403', function (done) {
      request
        .get('/api/events/triggerevent')
        .expect(403)
        .end(done);
    });
  });

  describe('/myevents', function () {
    it('should return 403', function (done) {
      request
        .get('/api/events/myevents')
        .expect(403)
        .end(done);
    });
  });

  describe('/arglebargle', function () {
  it('should return 404', function (done) {
    request
      .get('/api/events/arglebargle')
      .expect(404)
      .end(done);
    });
  });
});


describe("User tests", function (){
  var user = { username : 'BigPete', 
                password: 'test', 
                email : 'fake@gmail.com' };
 
  it("expects to post a new user to /users", function(done){
    request
      .post("/api/users/signup")
      .send(user)
      .expect(200, done);
  });


  it("expects an unsuccessful login", function(done){
    request
      .post("/api/users/signin")
      .send({username: 'BigPete',
             password: 'tet'})
      .expect(302, 'Moved Temporarily. Redirecting to /login', done)

  });

  it("expects a successful login", function(done){
    request
      .post("/api/users/signin")
      .send({username: 'BigPete',
             password: 'test'})
      .expect(302, 'Moved Temporarily. Redirecting to /', done)
    });

    it("logs in user", function(done){
      request
        .post("/api/users/signin")
        .send({username: 'BigPete',
               password: 'test'})
        .expect(302, 'Moved Temporarily. Redirecting to /', done);
    });

  // it("expects user is logged in", function(done){
  //   request
  //     .get("/api/users/signedin")
  //     .expect("BigPete", done);
  // });

  
  it("expects to log out", function(done){
    request
      .get("/api/users/signout")
      .expect(200, done);
  });

  it("expects user to be logged out", function(done){
    request
      .get("/api/users/signedin")
      .expect({}, done);
  });

});

