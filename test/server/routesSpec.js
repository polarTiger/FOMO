// var request = require('supertest');
// var expect = require('chai').expect;
// var bodyParser = require('body-parser');
// var path = require('path');

// // links to client side

// var url = "localhost:3003";

// describe('', function() {

//   describe('search ', function() {

//     it('returns 200 for search', function(done) {
//       request(url)
//         .get('/api/events/search?query=sentinel')
//         .expect(200)
//         .end(done);
//     });
//   });
// });


var assert = require('assert'),
    otherAssert = require('chai').assert,
    expect = require('chai').expect,
    request = require('supertest'),
    http = require('http');



describe('/', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3003', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('/api/events/search', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3003/api/events/search', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('/categorysearch', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3003/api/events/categorysearch', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('/popularevent', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3003/api/events/popularevent', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('/event/1', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3003/api/events/event/1', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('/triggerevent', function () {
  it('should return 403', function (done) {
    http.get('http://localhost:3003/api/events/triggerevent', function (res) {
      assert.equal(403, res.statusCode);
      done();
    });
  });
});

describe('/myevents', function () {
  it('should return 403', function (done) {
    http.get('http://localhost:3003/api/events/myevents', function (res) {
      assert.equal(403, res.statusCode);
      done();
    });
  });
});

describe('/arglebargle', function () {
  it('should return 404', function (done) {
    http.get('http://localhost:3003/api/events/arglebargle', function (res) {
      assert.equal(404, res.statusCode);
      done();
    });
  });
});

describe('/signedin', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3003/api/users/signedin', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('/verify', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3003/api/users/verify?username=BigPete&secretCode=secretcode', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});










