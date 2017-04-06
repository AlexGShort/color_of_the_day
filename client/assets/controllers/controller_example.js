app.controller('editController', ['$scope','friendsFactory', '$routeParams', '$location', function($scope, friendsFactory, $routeParams, $location) {

    var show = function(friend_id){
        console.log('editController show ran');
        friendsFactory.show(friend_id, function(returnedData){
            var birthdate = new Date(returnedData.data.data.birthday);
            var createdate = new Date(returnedData.data.data.createdAt);
            $scope.friend = returnedData.data.data;
            $scope.friend.birthday = birthdate;
            $scope.friend.createdAt = createdate;
        });
    }

    show($routeParams.id);

    $scope.update = function(friend_id){
        console.log("editController update ran");
        friendsFactory.update(friend_id, $scope.friend, function(){
            $location.url('/index');
        })
    }

}]);
