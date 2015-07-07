app.factory('bus', ['$http', function($http) { 
  return $http.post('https://smartbuzz.herokuapp.com/path',{curLat:33.77678,curLog:-84.38749,desLat:33.77019,dstLog:-84.39174}) 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);