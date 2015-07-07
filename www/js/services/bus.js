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
  }
 	headers: {
   	'Content-Type': 'application/x-www-form-urlencoded'
 	},
 	data: { curLat:33.77678, curLog:-84.38749, desLat:33.77019, desLog:-84.39174 }
	}


  return $http(req)
            //.success(function(info) {
              //return info; 
              .success(function(data) {
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);