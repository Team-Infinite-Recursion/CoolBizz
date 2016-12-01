const mongoose = require('mongoose');

module.exports = {
    getDb() {
        // const dbDev = 'mongodb://localhost:27017/drones';
        const dbProd = 'mongodb://droneMaster:nodejstelerik@ds111748.mlab.com:11748/drone-fleet';

        mongoose.connect(dbProd);
        const db = mongoose.connection;

        db.on('error', (err) => {
            console.log('Connection failed!\n' + err);
        });

        db.on('open', () => {
            console.log('Db connection successfully established!');
        });


        // let sampleInitialData = require('./initialData');


        // test to see if DB is working
        // const droneSchema = mongoose.Schema({
        //     model: String
        // });
        // const modelName = 'FlyingWarior';

        // const Drone = mongoose.model(modelName, droneSchema);

        // const someDrone = new Drone({
        //     model: 'B52'
        // });
        // someDrone.save((err, entry, numAffected) => {
        //     console.log(entry);
        //     console.log(numAffected);
        // });

        return db;
    }
};