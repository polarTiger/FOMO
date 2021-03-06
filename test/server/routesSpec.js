
var app = require('../../server/server');

app.listen(3113);

var expect = require('chai').expect;
var bodyParser = require('body-parser');
var path = require('path');
var assert = require('assert');
var agent = require('supertest').agent(app);

describe('/', function () {
  it('should return 200', function (done) {
    agent
      .get('/')
      .expect(200, done);
  });
});

describe('event routes', function() {

  describe('/categorysearch', function () {
    it('should return 200', function (done) {
      agent
        .get('/api/events/categorysearch')
        .expect(200)
        .end(done);
      });
    });

  describe('search ', function() {
    it('returns 200 for search', function(done) {
      agent
        .get('/api/events/search?query=sentinel')
        .expect(200)
        .end(done);
    });
  });

  describe('/popularevent', function () {
    it('should return 200', function (done) {
      agent
        .get('/api/events/popularevent')
        .expect(200)
        .end(done);
    });
  });

  describe('/event/1', function () {
    it('should return 200', function (done) {
      agent
        .get('/api/events/event/1')
        .expect(200)
        .end(done);
    });
  });

  describe('/triggerevent', function () {
    it('should return 403', function (done) {
      agent
        .get('/api/events/triggerevent')
        .expect(403)
        .end(done);
    });
  });

  describe('/myevents', function () {
    it('should return 403', function (done) {
      agent
        .get('/api/events/myevents')
        .expect(403)
        .end(done);
    });
  });

  describe('/arglebargle', function () {
  it('should return 404', function (done) {
    agent
      .get('/api/events/arglebargle')
      .expect(404)
      .end(done);
    });
  });
});

var user = { username : 'BigPete', 
              password: 'test', 
              email : 'fake@gmail.com' };

describe("User tests", function () {

  it("expects to post a new user to /users", function(done) {
    agent
      .post("/api/users/signup")
      .send(user)
      .expect(200, done);
  });


  it("expects an unsuccessful login", function(done) {
    agent
      .post("/api/users/signin")
      .send({username: 'BigPete',
             password: 'tet'})
      .expect(302, 'Moved Temporarily. Redirecting to /login', done);
  });

  it("logs in user", function(done) { 
    agent
      .post("/api/users/signin")
      .send({username: 'BigPete',
             password: 'test'})
      .expect(302, 'Moved Temporarily. Redirecting to /', done);
  });
});


describe("user subscriptions", function() {
  before(function(done){
  agent.post("/api/users/signin")
    .send({username: 'BigPete',
          password: 'test'})
    .end(function(err, res){
      agent.saveCookies(res);
      done();
    });
  });

  describe("subscribe and unsubscribe", function() {

    it("user should be allowed to subscribe", function(done) {
      agent
        .post("/api/events/subscribe/1")
        .expect(200, done);
    });

    it("expects user to have subscribed to event", function(done) {
      agent
        .get("/api/events/myevents")
        .expect(function(res) {
          if (res.text[0].id === 1) {
          } else {
            return false;
          }
        }).end(done);
      });

    it("user should be allowed to subscribe", function(done) {
      agent
        .delete("/api/events/unsubscribe/1")
        .expect(200, done);
    });

    it("expects user to have unsubscribed to event", function(done) {
      agent
        .get("/api/events/myevents")
        .expect(function(res) {
          for (var i = 0; i < res.length; i++) {
            if (res[i].id === 1) {
              return false;
            }
          }
        }).end(done);
    });
  });
});

describe("add event", function() {
  before(function(done){
  agent.post("/api/users/signin")
    .send({username: 'BigPete',
          password: 'test'})
    .end(function(err, res){
      agent.saveCookies(res);
      done();
    });
  });

  describe("add event and confirm", function() {

    it("should allow a user to add an event", function(done) {
      agent
        .post("/api/events/addevent")
        .send({info: 'test1234',
               name: 'also test1234'
              })
        .expect(200, done);
    });
  });
});



describe("User authentication tests", function() {
  before(function(done){
    agent.post("/api/users/signin")
      .send({username: 'BigPete',
            password: 'test'})
      .end(function(err, res){
        agent.saveCookies(res);
        done();
      });
  });

  describe("user logged in and logged out permissions", function() {

    it("expects user is logged in", function(done) {
      agent
        .get("/api/users/signedin")
        .expect("BigPete", done);
    });

    it("expects user is logged in", function(done) {
      agent
        .get("/api/users/signedin")
        .expect("BigPete", done);
    });

    it("expects to be allowed at myevents", function(done) {
      agent
        .get("/api/events/myevents")
        .expect(200, done);
    });
    
    it("expects to log out", function(done) {
      agent
        .get("/api/users/signout")
        .expect(200, done);
    });

    it("expects user to be logged out", function(done) {
      agent
        .get("/api/users/signedin")
        .expect({}, done);
    });

    describe("disallowed routes", function() {
      it("expects to be denied at myevents", function(done) {
        agent
          .get("/api/events/myevents")
          .expect(403, done);
      });

      it("expects to be denied at subscribe", function(done) {
        agent
          .post("/api/events/subscribe/1")
          .expect(403, done);
      });
    });
  });
});

