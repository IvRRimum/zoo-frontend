(function() {
  'use strict';

  angular
    .module('rails')
    .controller('PostViewController', function($rootScope, $scope, $auth, Post, $routeParams) {
      var vm = this;

      // Fethes post
      var post_query = function(){
        Post.get($routeParams.postId).then(function(post){
          vm.post = post;
        });
      }

      // will get a "401 Unauthorized" if the user is not authenticated
      post_query();
    });
})();
