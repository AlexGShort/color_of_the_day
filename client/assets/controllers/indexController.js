app.controller('indexController', ['$scope','codsFactory', '$routeParams', '$location', function($scope, codsFactory, $routeParams, $location) {
    $scope.colorLimit = 10;
    $scope.colorBegin = 20;
    $scope.newCod = {};
    $scope.colorObj = {};

    // sets colors for background gradients
    $scope.bg_colors = new Array(
      [62,35,255],
      [60,255,60],
      [255,35,98],
      [45,175,230],
      [255,0,255],
      [255,128,0]
    );

    $scope.modalShown = false;
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };

    // sets the color of the selected color chip
    $scope.setSelected = function(color){
        $scope.selected = color;
        $scope.newCod.colorCode = color;
        $scope.colorObj = w3color(color);
    };

    // changes the color of the color-of-the-day text depending on the background color's lightness value
    $scope.setTextColorClass = function(color){
        if(w3color(color).lightness < 0.4){
            return "white-text"
        } else {
            return "black-text"
        }
    }

    // takes an array of hex code colors and returns an array of RGB lists
    // var bg_colors_arr = function(cods){
    //     bg_colors_arr = [];
    //     for(cod in cods){
    //         var color_obj = w3color(cods[cod].colorCode);
    //         var color_arr = [color_obj.red, color_obj.green, color_obj.blue];
    //         bg_colors_arr.push(color_arr);
    //     }
    //     return bg_colors_arr;
    // }

    // sets up the array for the selection of the color of the day
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
        return colorArray;
    }

    var index = function(){
        console.log('indexController index ran');
        $scope.colors = color_array(pantone_colors, 7);
        codsFactory.index(function(returnedData){
            $scope.cods = returnedData.data;
        });
    }

    index();

    $scope.create = function(){
        console.log("indexController create ran");
        codsFactory.create($scope.newCod, function(){
            $location.url('/index');
        })
        index();
    }

    $scope.delete = function(cod_id){
        if(confirm("Are you sure you want to delete this color?")){
            console.log("confirmed");
            console.log("cod_id:", cod_id);
            codsFactory.delete(cod_id, function(returned_data){
                console.log("indexController delete response", returned_data);
            });
            index();
        };
    }

}]);
