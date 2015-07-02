app.factory('bus', ['$http', function($http) { 
  return $http.get('http://--.json') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);