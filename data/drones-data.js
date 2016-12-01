module.exports = function(models) {
    let {
        Drone
    } = models;

//console.log(Drone);
//    let Drone = require('../models/drone-model').Drone;

    return {
        getAllDrones() {
            return new Promise((resolve, reject) => {
                Drone.Drone.find((err, drones) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(drones);
                });
            });
        },
        getDrone(id) {
            return new Promise((resolve, reject) => {
                Drone.findOne({ _id: id }, (err, drone) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(drone);
                });
            });
        },
        getAllDronesWithService(service) {
            return new Promise((resolve, reject) => {
                Drone.find((err, drones) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(drones).filter(drone => drone.serviceSupported === service);
                });
            });
        }
    };
};