var trips = require("../controllers/trips.controller");

module.exports = function(app) {
    app.route('/trips').post(trips.create).get(trips.list).put(trips.update);
    app.route('/myoffers').get(trips.getMyRides);
    app.route('/mybookings').get(trips.getMyBookings);
    app.route('/cancelride').put(trips.cancel);
};
