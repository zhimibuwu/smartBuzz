app.factory('bus', ['$http', function($http) { 

	var req = {
 	//method: 'GET',
  //url: 'https://smartbuzz.herokuapp.com/users',
  method: 'POST',
 	url: 'https://smartbuzz.herokuapp.com/path',
  //headers: {
  //  'Content-Type': 'application/json'
  //},
  //data: {"format": "json", "topic": "order/created", "url": "http://myshop.example.com/notify_me"}
  //}
 	headers: {
   	'Content-Type': 'application/json'
 	},
 	data: { curLat:33.7744, curLog:-84.3938, desLat:33.7763, desLog:-84.3883 }
	}


  return $http(req)
            //.success(function(info) {
              //return info; 
              .success(function(info) {
              return info; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);