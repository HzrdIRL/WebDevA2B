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
      .state('tasks', {
        url: '/tasks/{id}',
        templateUrl: '/tasks.html',
        controller: 'TasksCtrl'
      });

    $urlRouterProvider.otherwise('home');
}]);

app.factory('tasks', ['%http', function(){
  var o = {
    tasks: []
  }
  o.getAll = function(){
    return $http.get('/tasks').success(function(data){
      angular.copy(data, o.tasks);
    });
  };
  return o;
}])

app.controller('TasksCtrl', [
  '$scope',
  '$stateParams',
  'tasks',
  function($scope, $stateParams, tasks){
    $scope.task = tasks.tasks[$stateParams.id];

    //Tick off a task (change it to done)
    $scope.tickOff = function(task){
      if(task.done == ' '){
          task.done = 'x';
      }
      else if(task.done == 'x'){
          task.done = ' ';
      }
    }

    $scope.addSubTask = function(task){
      $scope.task.sub_tasks.push({
        title: $scope.title,
        done: ' '
      });
    }
  }
]);

app.controller('MainCtrl', [
  '$scope',
  'tasks',
  function($scope, tasks){
    //Bind list
    $scope.tasks = tasks.tasks;

    //Add Tasks
    $scope.addTask = function(){
      console.log('blah');
      //if(!$scope.title || $scope.title === '') { return; }
      $scope.tasks.push({
        title: $scope.title,
        due_date: $scope.due_date,
        done: ' ',
        sub_tasks: [
          {title: 'try', done: 'x'},
          {title: 'try harder', done: ' '}
        ]
      });
    }

    //Tick off a task (change it to done)
    $scope.tickOff = function(task){
      if(task.done == ' '){
          task.done = 'x';
      }
      else if(task.done == 'x'){
          task.done = ' ';
      }
    }
}]);
