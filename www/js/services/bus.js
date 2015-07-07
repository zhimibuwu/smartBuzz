app.factory('bus', ['$http', function($http) { 
  return $http.get('https://smartbuzz.herokuapp.com/users') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);