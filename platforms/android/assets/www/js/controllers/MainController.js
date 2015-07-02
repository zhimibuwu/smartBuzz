app.controller('MainController',['$scope','bus',function($scope,bus){
	bus.success(function(data){

		$scope.--- = data;
	})
}]
);