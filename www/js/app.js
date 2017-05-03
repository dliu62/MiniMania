// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var starter = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services']);
starter.config(function($ionicConfigProvider){
  $ionicConfigProvider.views.maxCache(0);
});

starter.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

starter.controller('myapp_controller', function ($scope, $ionicModal, $ionicLoading){
  $scope.textBox = ""
});

starter.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('home',{
      url:'/home',
      cache: false,
      templateUrl:'templates/home.html',
      controller:"HomePageCtrl"

    })
    .state('play',{
      url:'/play',
			params: {
        'songPick' : null,
      },
      cache: false,
      templateUrl:'templates/play.html',
      controller:"PlayCtrl"
    })
    .state('highScores',{
      url:'/highScores',
      cache: false,
      templateUrl:'templates/highScores.html',
      controller:"highScoresCtrl"
    })
		.state('playlist',{
      url:'/playlist',
      cache: false,
      templateUrl:'templates/playlist.html',
      controller:"playlistCtrl"
    })
    .state('Credits',{
      url:'/Credits',
      cache: false,
      templateUrl:'templates/Credits.html',
      controller:"CreditsCtrl"
    })
    .state('results',{
    url:'/results',
      cache: false,
    templateUrl:'templates/results.html',
    controller:"ResultsCtrl",
      params: {
        'num_miss' : null,
        'num_100':null,
        'num_300':null,
        'score':null,
        'num_50':null,
				'spinScore':null
      }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
