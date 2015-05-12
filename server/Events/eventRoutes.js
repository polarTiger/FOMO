var eventController = require('./eventController.js');
var loggedOutBlock = require('../authentication/authentication').loggedOutBlock;

module.exports = function (app) {

  app.get('/event/:id', eventController.getEvent);

  app.post('/subscribe/:id', loggedOutBlock, eventController.subscribe);

  app.delete('/unsubscribe/:id', loggedOutBlock, eventController.unsubscribe);

  app.post('/addevent', loggedOutBlock, eventController.addEvent);

  app.post('/editevent/:id', loggedOutBlock, eventController.editEvent);

  app.get('/triggerevent', loggedOutBlock, eventController.triggerEvent);

  app.get('/myevents', loggedOutBlock, eventController.myEvents);

  app.get('/topevents', eventController.eventPlaceHolder);

  app.get ('/search', eventController.searchEvents);
};

