app.controller('MainController',['$scope','bus',function($scope,bus){
	//bus.success(function(info){

		
	//	$scope.busInfo = info;
	bus.success(function(info){

		$scope.busInfo = info[0];
	})

	//bus2.success(function(data){

	//	$scope.bus = data;
	//})
}]
);