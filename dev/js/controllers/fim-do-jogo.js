kimolecula.controller('fimDoJogoController', function ($http, $rootScope, $scope, $routeParams) {
    $scope.finalPanda = {
        image: 'panda-final-12.png',
        text: ''
    };

    $scope.init = function() {
        if (!$rootScope.game.user) {
            window.location = '#/insira-seu-nome';
        }
        else {
            if ($rootScope.levelScore.bamboo <= 10) {
                var bambu = $rootScope.levelScore.bamboo == 1 ? 'bambu' : 'bambus';
                $scope.finalPanda.image = 'panda-final-12.png';
                $scope.finalPanda.text = 'Seu resultado foi insatisfatório e você conseguiu só ' + $rootScope.levelScore.bamboo + ' ' + bambu + '... Assim o Professor Panda fica com fome! Vamos estudar mais?';
            }
            else if ($rootScope.levelScore.bamboo > 10 && $rootScope.levelScore.bamboo <= 18) {
                $scope.finalPanda.image = 'panda-final-11.png';
                $scope.finalPanda.text = 'Você conseguiu ' + $rootScope.levelScore.bamboo + ' bambus, mas ainda assim o Professor Panda está faminto! Vamos alimentar o Professor de novo? Assim a gente estuda mais um pouco.';
            }
            else if ($rootScope.levelScore.bamboo > 18 && $rootScope.levelScore.bamboo <= 28) {
                $scope.finalPanda.image = 'panda-final-13.png';
                $scope.finalPanda.text = 'Nossa! ' + $rootScope.levelScore.bamboo + ' bambus! Esse número é ótimo e o Professor está bem feliz! Que tal tentar de novo e deixar o Professor Panda totalmente satisfeito?';
            }
            else if ($rootScope.levelScore.bamboo > 28) {
                $scope.finalPanda.image = 'panda-final-10.png';
                $scope.finalPanda.text = 'Espetacular! Talvez o Professor Panda nunca tenha visto tanta inteligência junta! Você conseguiu ' + $rootScope.levelScore.bamboo + ' bambus! Agora sim o Professor está totalmente satisfeito e muito feliz com você! Que tal chamar seus amigos para jogar também?';
            }
        }
    }

    $scope.init();
});
