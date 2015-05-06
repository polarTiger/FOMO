var eventController = require('./eventController.js');

module.exports = function (app) {

  app.get('/event/:id', eventController.getEvent);

  app.post('/subscribe/:id', eventController.subscribe);

  app.post('/addevent', eventController.addEvent);

  app.post('/editevent/:id', eventController.editEvent);

  app.get('/triggerevent', eventController.triggerEvent);

  app.get('/myevents', eventController.myEvents);

  app.get('/topevents', eventController.eventPlaceHolder);

  app.get ('/search', eventController.searchEvents);


};

