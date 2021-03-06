const express = require('express');

let router = express.Router();

module.exports = function(app, data) {
    let controller = require('../controllers/services-controller')(data);

    router
        .get('/', controller.getAllServices)
        .get('/create-service', controller.getCreateServiceForm)
        .post('/create-service', controller.createService)
        .get('/:name', controller.getDronesWithService);

    app.use('/services', router);
};