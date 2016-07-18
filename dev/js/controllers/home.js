kimolecula.controller('homeController', function ($http, $rootScope, $scope, $routeParams) {
    $scope.init = function() {
        $rootScope.game = {
            user: ''
        };
    }

    $scope.init();
});
