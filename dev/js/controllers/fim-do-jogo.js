kimolecula.controller('fimDoJogoController', function ($http, $rootScope, $scope, $routeParams) {
    $scope.finalPanda = {
        image: 'panda-final-12.png',
        text: ''
    };

    $scope.init = function() {
        if (!$rootScope.game.user || !$rootScope.levelScore.bamboo) {
            window.location = '#/insira-seu-nome';
        }
        else {
            if ($rootScope.levelScore.bamboo <= 10) {
                $scope.finalPanda.image = 'panda-final-12.png';
                $scope.finalPanda.text = 'Seu resultado foi insatisfatório e você conseguiu só ' + $rootScope.levelScore.bamboo + ' bambús... Assim o Professor Panda fica com fome! Vamos estudar mais?';
            }
            else if ($rootScope.levelScore.bamboo > 10 && $rootScope.levelScore.bamboo <= 18) {
                $scope.finalPanda.image = 'panda-final-11.png';
                $scope.finalPanda.text = 'Você conseguiu ' + $rootScope.levelScore.bamboo + ' bambús, mas ainda sim o Professor Panda está faminto! Vamos alimentar o Professor de novo? Assim a gente estuda mais um pouco.';
            }
            else if ($rootScope.levelScore.bamboo > 18 && $rootScope.levelScore.bamboo <= 28) {
                $scope.finalPanda.image = 'panda-final-13.png';
                $scope.finalPanda.text = 'Nossa! ' + $rootScope.levelScore.bamboo + ' bambús! Esse número é ótimo e o Professor está bem feliz! Que tal tentar de novo e deixar o Professor Panda totalmente satisfeito?';
            }
            else if ($rootScope.levelScore.bamboo > 28) {
                $scope.finalPanda.image = 'panda-final-10.png';
                $scope.finalPanda.text = 'Espetacular!! Talvez o Professor Panda nunca tenha visto tanta inteligência junta! Você conseguiu ' + $rootScope.levelScore.bamboo + ' bambús! Agora sim o Professor está totalmente satisfeito e muito feliz com você! Que tal agora chamar seus amigos?';
            }
        }
    }

    $scope.init();
});
