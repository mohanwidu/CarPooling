'use strict';

var letsgo = angular.module("letsgo", []);
		
    letsgo.controller('getrideController', function($scope) {
        $scope.trips = {
            from: "Starting Point",
            to: "End Point"
        }

    }); 

