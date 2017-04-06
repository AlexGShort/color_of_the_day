console.log("Cods Factory");
app.factory("codsFactory", ['$http', function($http){
    var factory = {};
    factory.index = function(callback){
        console.log('codsFactory index ran');
        $http.get('/cods').then(function(returned_data){
            console.log('codsFactory returned data: ', returned_data.data);
            callback(returned_data.data);
        });
    }
    // factory.show = function(friend_id, callback){
    //     console.log('friendsFactory show ran');
    //     $http.get('/friends/' + friend_id).then(function(returned_data){
    //         console.log('friendsFactory show returned data: ', returned_data);
    //         callback(returned_data);
    //     })
    //
    // }
    factory.create = function(newCod, callback){
        console.log('codsFactory create ran');
        $http.post('/cods', newCod).then(function(returned_data){
            console.log('codsFactory create returned: ', returned_data.data);
            if (typeof(callback) == 'function'){
                callback(returned_data.data);
            }
        });
    }
    // factory.update = function(id, friend, callback){
    //     console.log("friendsFactory friend update: ", friend);
    //     $http.put('/friends/' + id, friend).then(function(returned_data){
    //         console.log("friendsFactory update returned data: ", returned_data.data);
    //         if (typeof(callback) == 'function'){
    //             callback(returned_data.data);
    //         }
    //     });
    // }
    // factory.delete = function(friend_id){
    //     console.log("friendsFactory delete ran");
    //     $http.delete('/friends/' + friend_id).then(function(returned_data){
    //         console.log(returned_data);
    //     });
    // }
    return factory;
}]);
