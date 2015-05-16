var request = require('supertest');
var expect = require('chai').expect;
var bodyParser = require('body-parser');
var path = require('path');

// links to client side

var url = "localhost:3003"

describe('', function() {

  describe('search ', function() {

    it('returns 200 for search', function(done) {
      request(url)
        .get('/api/events/search?query=sentinel')
        .expect(200)
        .end(done);
    });
  });
});
