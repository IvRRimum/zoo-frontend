(function() {
  'use strict';

  angular
    .module('zooFrontend')
    .config(routeConfig)
    .factory('Post', function(railsResourceFactory) {
      return railsResourceFactory({
        url: '/api/posts',
        name: 'post'
      });
    });

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/posts', {
        templateUrl: 'app/posts/views/posts.html',
        controller: 'PostsController',
        controllerAs: 'posts'
      })
      .when('/posts/edit/:postId', {
        templateUrl: 'app/posts/views/postEdit.html',
        controller: 'PostEditController',
        controllerAs: 'postEdit'
      })
      .when('/posts/new', {
        templateUrl: 'app/posts/views/postNew.html',
        controller: 'PostNewController',
        controllerAs: 'postNew'
      })
      .when('/posts/:postId', {
        templateUrl: 'app/posts/views/postView.html',
        controller: 'PostViewController',
        controllerAs: 'postView'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
