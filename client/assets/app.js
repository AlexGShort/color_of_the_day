var app = angular.module('app', ['ngRoute']);

// set routes here
app.config(function ($routeProvider) {
    $routeProvider
    .when('/',{
        templateUrl:'partials/index.html',
        controller: 'indexController',
    })
    // .when('/create',{
    //     templateUrl:'partials/new.html',
    //     controller: 'newController'
    // })
    // .when('/show/:id',{
    //     templateUrl:'partials/show.html',
    //     controller:'editController'
    // })
    // .when('/update/:id',{
    //     templateUrl:'partials/edit.html',
    //     controller: 'editController'
    // })
    .otherwise({
        redirectTo:'/'
    });
});


app.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});

app.directive('bgGradient', function(){
    // console.log("bgGradient ran");
    // animated background gradient code from Mario Klingemann's CodePen: https://codepen.io/quasimondo/pen/lDdrF
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            var colors = scope.bg_colors;

            var step = 0;
            //color table indices for:
            // current color left
            // next color left
            // current color right
            // next color right
            // var colorIndices = [0,1,2,3];
            var colorIndices = [
                Math.floor( Math.random() * (colors.length)),
                Math.floor( Math.random() * (colors.length)),
                Math.floor( Math.random() * (colors.length)),
                Math.floor( Math.random() * (colors.length))
            ]

            //transition speed
            var gradientSpeed = 0.002;

            function updateGradient(){

                if ( $===undefined ) return;

                var c0_0 = colors[colorIndices[0]];
                var c0_1 = colors[colorIndices[1]];
                var c1_0 = colors[colorIndices[2]];
                var c1_1 = colors[colorIndices[3]];

                var istep = 1 - step;
                var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
                var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
                var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
                var color1 = "rgb("+r1+","+g1+","+b1+")";

                var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
                var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
                var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
                var color2 = "rgb("+r2+","+g2+","+b2+")";

                element.css({
                    background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"
                }).css({
                    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"
                });

                step += gradientSpeed;
                if ( step >= 1 ){
                    step %= 1;
                    colorIndices[0] = colorIndices[1];
                    colorIndices[2] = colorIndices[3];

                    //pick two new target color indices
                    //do not pick the same as the current one
                    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
                    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

                }
            }

            setInterval(updateGradient, 75);

        }
    }
});
