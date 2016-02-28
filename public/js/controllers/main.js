'use strict'
angular.module('userController', [])
// inject the Todo service factory into our controller
    .controller('mainController', ['$scope', '$http', 'Users', function ($scope, $http, Users) {
        $scope.formData = {}
        $scope.json = []
        $scope.loading = true

        Users.get()
            .success(function (data) {
                $scope.users = data.data 
                $scope.loading = false 
            }) 

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
		/*$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
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

                    let len = $scope.json.length

                    $scope.json = $scope.json.filter((user) => user.uuid !== uuid)

                    if ($scope.json.length === len)
                        $scope.json.push(data)

                })
                .error(err => {
                    $scope.json = {}
                })
        }
        
        // DELETE ==================================================================
        // delete a todo after checking it
        $scope.deleteUser = function (id) {
            $scope.loading = true

            Users.delete(id)
            // if successful creation, call our get function to get all the new todos
                .success(function (data) {
                    $scope.loading = false
                    $scope.users = data // assign our new list of todos
                })
        }
    }])