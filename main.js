/**
 * Created by Samuel on 29/10/2016.
 */

var dcd = angular.module('countdownApp', ['firebase']);
dcd.controller('countdownController', function ($scope, $firebaseArray) {
    $scope.welcomeMsg = "Welcome to D!Countdown";

    var firebaseRef = firebase.database().ref().child("countdown");
    $scope.upcomings = $firebaseArray(firebaseRef);

    $scope.eventName = '';
    $scope.eventDescription = '';
    $scope.eventDate = '';
    $scope.eventHour = '';
    $scope.eventMinute = '';
    $scope.receiveForm = function () {
        $scope.eventDate.setHours($scope.eventHour, $scope.eventMinute);
        $scope.input = {
            "name": $scope.eventName,
            "description": $scope.eventDescription,
            "time": $scope.eventDate.getTime()
        };
        $scope.eventName = '';
        $scope.eventDescription = '';
        $scope.eventDate = '';
        $scope.eventHour = '';
        $scope.eventMinute = '';
        console.log($scope.input);
        $scope.upcomings.$add($scope.input);
    };

    //Manipulate HOW to display the time
    $scope.display = [];
    $scope.detailedTime = [];
    $scope.$watch("upcomings", function (newValue, oldValue) {
        $scope.display = [];
        for (var i = 0; i < newValue.length; i++) {
            var date = new Date(newValue[i].time);
            //$scope.display[i] = moment().diff(moment(date),'days');
            $scope.detailedTime[i] = moment(date).format('MMMM Do YYYY, h:mm:ss a');
            if (moment(date).diff(moment(), 'days') === -1 ||moment(date).diff(moment(), 'days')===0||moment(date).diff(moment(), 'days')===1) {
                $scope.display[i] = moment(date).diff(moment(), 'days') + ' Day';
            }
            else {
                $scope.display[i] = moment(date).diff(moment(), 'days') + ' Days';
            }
        }
    }, true);

});


$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
});
