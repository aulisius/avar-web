'use strict'
angular.module('userController', []).controller('mainController', ['$scope', '$http', 'Users', function ($scope, $http, Users) {
    $scope.formData = {}
    $scope.json = {}
    $scope.loading = true

    Users.get()
        .success(data => {
            console.log(data)
            $scope.users = data.data
            $scope.loading = false
        })
        .error(err => {
            console.log(err)
        }) 

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    /*$scope.createTodo = function() {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        if ($scope.formData !== {}) {
            $scope.loading = true 

            // call the create function from our service (returns a promise object)
            Users.create($scope.formData)

                // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    $scope.loading = false 
                    $scope.formData = {}  // clear the form so our user is ready to enter another
                    $scope.todos = data  // assign our new list of todos
                }) 
        }
    } */

    $scope.showJson = (uuid) => {
        Users.find(uuid)
            .success(data => {
                if ($scope.json === data)
                    $scope.json = {}
                else
                    $scope.json = data
            })
            .error(err => {
                $scope.json = {}
            })
    }
        
    // delete a todo after checking it
    $scope.deleteUser = function (id) {
        $scope.loading = true

        Users.delete(id)
            .success(data => {
                $scope.loading = false
                $scope.users = data
            })
    }
}])