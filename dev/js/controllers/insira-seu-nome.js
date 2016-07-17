kimolecula.controller('insiraSeuNomeController', function ($http, $rootScope, $scope, $routeParams, sweet) {
    $scope.init = function() {
        $scope.game = {
            user: ''
        };
    };

    $scope.validateUser = function () {
        if ($scope.game.user.length >= 3) {
            $rootScope.game = {
                user: $scope.game.user
            };
            window.location = '#/instrucoes';
        }
        else {
            sweet.show('Quem é você?', 'Preciso saber o seu nome para podermos jogar melhor...', 'error');
        }
    };

    $scope.init();
});
