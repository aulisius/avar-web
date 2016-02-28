angular.module('userService', [])
    .factory('Users', ['$http', ($http) => ({
        get: () => $http.get('/db'),

        create: userData => $http.post('/db/new', userData),
        
        find: uuid => $http.get('db/' + uuid),

        delete: id => $http.delete('/db/remove/' + id)
    })])