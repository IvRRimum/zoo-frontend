(function() {
  'use strict';

  angular
    .module('rails')
    .controller('PostsController', function($rootScope, $scope, $auth, Post) {
      var vm = this;

      // Fethes all posts
      var post_query = function(){
        Post.query().then(function(posts){
          vm.posts = posts;
        });
      }

      // when the user logs in, fetch the posts
      $rootScope.$on('auth:login-success', function(ev, user) {
        post_query();
      });

      // when the user logs out, remove the posts
      $rootScope.$on('auth:logout-success', function(ev) {
        vm.posts = null;
      });

      // will get a "401 Unauthorized" if the user is not authenticated
      post_query();

      // delete's post when delete button clicked
      this.deletePost = function($event) {
        var element = $event.currentTarget,
            targetUrl = $(element).data('api-url');

        Post.$delete(targetUrl, {}).then(function(){
          post_query();
        });
      };
    });
})();
