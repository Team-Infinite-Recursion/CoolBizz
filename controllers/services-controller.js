const constants = require('../config/constants'),
    errorLogger = require('../config/error-logger');

module.exports = function(data) {
    return {
        createService(req, res) {
            let { name } = req.body;
            let userId = req.session.passport.user;

            data.findUserById(userId)
                .then(user => {
                    let role = user.role;
                    let isDeleted = user.isDeleted;

                    if (role === 'admin' && isDeleted.toString() === 'false') {
                        data.createService(name)
                            .then(() => {
                                return res.status(300).redirect('/services');
                            });
                    } else {
                        return res.status(constants.notAuthorizedServerResponse).send('You are not autorized for creating new services');
                    }
                })
                .catch(err => {
                    errorLogger(err);
                    res.status(200).status(constants.invalidInputServerResponse)
                        .send('Please enter valid data');
                });
        },
        getAllServices(req, res) {
            data.getAllServices()
                .then(services => {
                    res.status(200).render('drones/services.pug', {
                        services,
                        user: req.user
                    });
                })
                .catch(err => {
                    res.status(500)
                        .send(err);
                });
        },
        getCreateServiceForm(req, res) {
            res.status(200).render('drones/create-service', {
                user: req.user
            });
        },
        getDronesWithService(req, res) {
            let name = req.params.name;
            data.getAllDronesWithService(name)
                .then(drones => {
                    res.status(200).render('drones/drones-with-service.pug', {
                        service: drones[constants.zero].serviceSupported,
                        drones,
                        user: req.user
                    });
                })
                .catch(err => {
                    res.status(500)
                        .send(err);
                });
        }
    };
};