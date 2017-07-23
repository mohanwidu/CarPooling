var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    
    // var promise = mongoose.createConnection(config.db, {
    //     useMongoClient: true,
    // });

    // promise.then (function(db){
    //     console.log("Mongo db connected..!")
    //     return(db)
    // });
    
    var db = mongoose.connect(config.db);
    require('../app/models/trips');
    return db;
};