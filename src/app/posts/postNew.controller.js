(function() {
  'use strict';

  angular
    .module('rails')
    .controller('PostNewController', function($rootScope, $scope, $auth, Post, $routeParams) {
      var vm = this;
      this.post = {'title': '', 'body': '', 'notes': {0: {'title': '', '_destroy': false}}};

      // Save post
      this.savePost = function() {
        vm.successfullSave = false;
        vm.postErrors = null;
        vm.post.notes_attributes = vm.post.notes

        new Post({'post': vm.post}).create().then(
          function(bid) {
            vm.successfullSave = true;
          },

          function(http) {
            vm.postErrors = http.data;
          }
        );
      }

      // Append an empty note
      this.addNote = function() {
        console.log(vm.post.notes);
        vm.post.notes[Object.keys(vm.post.notes).length+1] = {'title': ''};

        return false;
      }
    });
})();
