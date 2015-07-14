app.factory('bus', ['$http', function($http) { 

  var current = localStorage.getItem("current");
  var destination = localStorage.getItem("destination");
  var cur = current.split(",");
  var dest = destination.split(",");
  var cLat = parseFloat(cur[0]);
  var cLng = parseFloat(cur[1]);
  var dLat = parseFloat(dest[0]);
  var dLng = parseFloat(dest[1]);

	// var req = {
 // 	//method: 'GET',
 //  //url: 'https://smartbuzz.herokuapp.com/users',
 //  method: 'POST',
 // 	url: 'https://smartbuzz.herokuapp.com/path',
 //  //headers: {
 //  //  'Content-Type': 'application/json'
 //  //},
 //  //data: {"format": "json", "topic": "order/created", "url": "http://myshop.example.com/notify_me"}
 //  //}
 // 	headers: {
 //   	'Content-Type': 'application/json'
 // 	},
 // 	data: { curLat:cLat, curLog:cLng, desLat:dLat, desLog:dLng }
	// }


 //  return $http(req)
 //            //.success(function(info) {
 //              //return info; 
 //              .success(function(info) {
 //              return info; 
 //            }) 
 //            .error(function(err) { 
 //              return err; 
 //            }); 
   var req = $http.post('https://smartbuzz.herokuapp.com/path',{ curLat:cLat, curLog:cLng, desLat:dLat, desLog:dLng });

   var req2 = $http.get('http://m.gatech.edu/widget/buses/content/api/position');


  //  return $q.all([req,req2])
  return req
        .success(function(info) {
            return info;
        })
        .error(function(err) {
            return err;
        });
}]);