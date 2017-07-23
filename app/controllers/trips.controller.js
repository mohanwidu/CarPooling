var Trip = require('mongoose').model('Trip');

exports.list = function(req, res) {
    console.log(req.query);

    var obj = req.query;
    var emptyCheck = isEmptyObject(obj);
    function isEmptyObject(obj) {
        var name;
        for (name in obj) {
            if (obj.hasOwnProperty(name)) {
                return false;
            }
        }
        return true;
    }
    console.log(emptyCheck);
    if ( emptyCheck === true ) 
       {
           console.log("came inside empty");
        Trip.find().exec(function(err, trips) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(trips);
            // console.log("service O/P1" + trips)
        }
    });
       } else {
           console.log("came inside filter")
        Trip.find({from:req.query.from, to:req.query.to}).exec(function(err, trips) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(trips);
                // console.log("service O/P1" + trips)
            }
        });
       } 
};

exports.create = function(req, res, next) {
    console.log(req.body);
    var trip = new Trip(req.body);
    trip.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(trip);
        }
    });
};

exports.update = function(req, res, next) {
    console.log(req.body);
    var query = {"_id": req.body.id};
    req.body.seats = req.body.seats - 1;
    console.log(req.body);
    Trip.update(query, {
        "seats_available" : req.body.seats, 
        "reserved_for" : {
            "uid" : req.body.reserved_for.uid,
            "name": req.body.reserved_for.name,
            "cancelled": req.body.reserved_for.cancelled
        }
    },function(err, trip) {
        if (err) {
            console.log(err);
            return next(err);
        }
        else {
            console.log(trip);
            res.json(trip);
        }
    });
};


exports.getMyRides = function(req, res) {
    console.log(req.query)
        Trip.find({uid:req.query.uid}).exec(function(err, trips) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(trips);
            }
        });
};

exports.getMyBookings = function(req, res) {
    console.log(req.query)
        Trip.find({'reserved_for.uid': req.query.myid,'reserved_for.cancelled': false }).exec(function(err, trips) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(trips);
            }
        });
};

exports.cancel = function(req, res, next) {
    console.log(req.body);
    var query = ({"_id": req.body.id, "reserved_for.uid": req.body.uid});
    req.body.seats = req.body.seats + 1;
    console.log(req.body);
    Trip.update(query, {
        "seats_available" : req.body.seats, 
        "reserved_for" : {
            "cancelled" : req.body.cancelled
        }
    },function(err, trip) {
        if (err) {
            console.log(err);
            return next(err);
        }
        else {
            console.log(trip);
            res.json(trip);
        }
    });
};