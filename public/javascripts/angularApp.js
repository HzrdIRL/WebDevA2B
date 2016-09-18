var app = angular.module('studyApp', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['posts', function(posts){
            return posts.getAll();
          }]
        }
      })

    $urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl', [
  '$scope',
  function($scope){
    //Bind list

    //Add Tasks
    $scope.addTask = function(){
      console.log('blah');
    }
}]);
