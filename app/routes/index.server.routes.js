
module.exports = function(app) {
//    var home = require('../controllers/index.server.controller');
//    app.get('/', home.render);
    app.get('/', function (req, res)
        {
            res.render('home');
        });

    app.get('/getride', function (req, res)
        {
            res.render('getRide');
        });

    app.get('/offerride', function (req, res)
        {
            res.render('offerRide');
        });

    app.get('/myrides', function (req, res)
        {
            res.render('myRides');
        });

};