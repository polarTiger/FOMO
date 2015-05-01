var eventController = require('./eventController.js');


module.exports = function (app) {

  app.get('/event/:id', eventController.eventPlaceHolder);

  app.post('/triggerevent', eventController.eventPlaceHolder);

  app.post('/addevent', eventController.eventPlaceHolder);

  app.post('/triggerevent', eventController.eventPlaceHolder);

  app.get('/myevents', eventController.eventPlaceHolder);

  app.get('/topevents', eventController.eventPlaceHolder);
};
