(function() {
  'use strict';

  angular
    .module('rails')
    .controller('PostEditController', function($rootScope, $scope, $auth, Post, $routeParams) {
      var vm = this;

      // Fethes post
      var post_query = function(){
        Post.get($routeParams.postId).then(function(post){
          vm.post = post;
          
          if(vm.post.notes.length == 0) {
            vm.post.notes[0] = {'title': ''}; 
          }
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

      // Save post
      this.savePost = function() {
        vm.successfullSave = false;
        vm.postErrors = null;
        vm.post.notes_attributes = vm.post.notes

        Post.get($routeParams.postId).then(function(post){

          vm.post.update().then(
            function(bid) {
              post_query();
              vm.successfullSave = true;
            },

            function(http) {
              vm.postErrors = http.data;
            }
          );
        });

        return false;
      }

      // Append an empty note
      this.addNote = function() {
        vm.post.notes.push({'title': ''});

        return false;
      }
    });
})();
