app.controller('indexController', ['$scope','codsFactory', '$routeParams', '$location', function($scope, codsFactory, $routeParams, $location) {
    $scope.colorLimit = 10;
    $scope.colorBegin = 20;
    $scope.newCod = {};
    $scope.colorObj = {};

    $scope.modalShown = false;
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };


    $scope.setSelected = function(color){
        $scope.selected = color;
        $scope.newCod.colorCode = color;
        $scope.colorObj = w3color(color);
    };

    $scope.setTextColorClass = function(color){
        if(w3color(color).lightness < 0.4){
            return "white-text"
        } else {
            return "black-text"
        }
    }

    var color_array = function(array, rowItems){
        colorArray = [];
        row = [];
        numRows = 0;
        for(var i = 0; i < Math.floor(array.length / rowItems); i++){
            for(var k = 0; k < rowItems; k++){
                row.push(array[(rowItems * i)+k]);
            }
            colorArray.push(row);
            row = [];
            numRows += 1;
        }
        if(array.length % rowItems != 0){
            for(var i = (numRows + 1) * rowItems; i < array.length; i++){
                row.push(array[i]);
            }
            colorArray.push(row);
        }
        console.log("colorArray:", colorArray);
        return colorArray;
    }

    var index = function(){
        $scope.colors = color_array(pantone_colors, 7);
        console.log('indexController index ran');
        codsFactory.index(function(returnedData){
        $scope.cods = returnedData.data;
        // $scope.cods = ['red','blue'];
        });
    }

    index();

    $scope.create = function(){
        console.log("indexController create ran");
        codsFactory.create($scope.newCod, function(){
            $location.url('/index');
        })
    }


}]);
