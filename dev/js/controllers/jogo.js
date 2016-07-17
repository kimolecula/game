kimolecula.controller('jogoController', function ($http, $rootScope, $scope, $routeParams, sweet) {
    $scope.init = function() {
        $scope.game = {
            user: '',
            bambooCounter: 6,
            tipCounter: '1'
        };

        if (!$rootScope.game.user) {
            // window.location = '#/insira-seu-nome';
        }
        else {
            $scope.game.user = $rootScope.game.user;
        }
    }

    $scope.loseGame = function () {
        sweet.show({
            title: 'Você não tem mais bambus',
            text: 'Infelizmente todos os bambus acabaram e agora o professor Panda ficará faminto! Comece de novo e ajude o professor a ficar com a barriga cheia!',
            imageUrl: '../design/panda-triste-04.png'
        });
        window.location = '#/instrucoes';
    }

    $scope.getBamboo = function(num) {
        console.log(num);
        if(num < 0){
            $scope.loseGame();
            return;
        }
        return new Array(num);
    }

    $scope.quitGame = function () {
        sweet.show({
            title: 'Tem certeza que deseja abandonar?',
            text: 'Se você abandonar o game agora todos os seus bambus serão perdidos e o professor Panda ficará faminto!',
            imageUrl: '../design/panda-triste-04.png',
            showCancelButton: true,
            confirmButtonText: 'Quero continuar!',
            cancelButtonText: 'Sim, vou abandonar...',
            confirmButtonColor: '#388E3C',
            closeOnConfirm: true,
            closeOnCancel: true
        }, function(isConfirm) {
            if (isConfirm) {
            }
            else {
                $scope.game.bambooCounter = 0;
                $scope.getBamboo($scope.game.bambooCounter);
                $scope.$apply();
                window.location = '#/home';
            }
        });
    }

    $scope.changeMolecule = function () {
        if ($scope.game.bambooCounter == 0) {
            sweet.show({
                title: 'Você não pode mais pular',
                text: 'Todos os bambus já foram usados e o professor Panda está faminto! Responda a fórmula molecular para ganhar bambus ou comece novamente.',
                imageUrl: '../design/panda-triste-04.png',
                showCancelButton: true,
                confirmButtonText: 'Vou responder!',
                cancelButtonText: 'Vou abandonar...',
                confirmButtonColor: '#388E3C',
                closeOnConfirm: true,
                closeOnCancel: true
            }, function(isConfirm) {
                if (isConfirm) {
                }
                else {
                    $scope.game.bambooCounter = 0;
                    $scope.$apply();
                    window.location = '#/instrucoes';
                }
            });
        }
        else {
            sweet.show({
                title: 'Tem certeza que deseja pular?',
                text: 'Se você escolher que sim, 1 bambu será usado para encontrar outro composto. Quanto menos bambus você tiver, mais fome o professor Panda ficará!',
                imageUrl: '../design/panda-triste-04.png',
                showCancelButton: true,
                confirmButtonText: 'Não quero pular!',
                cancelButtonText: 'Sim, quero pular...',
                confirmButtonColor: '#388E3C',
                closeOnConfirm: true,
                closeOnCancel: true
            }, function(isConfirm) {
                if (isConfirm) {
                }
                else {
                    --$scope.game.bambooCounter;
                    $scope.getBamboo($scope.game.bambooCounter);
                    $scope.$apply();
                }
            });
        }

    }

    $scope.clainTip = function () {
        var pluralBamboo = $scope.game.tipCounter;

        if(pluralBamboo > 1){
            pluralBamboo = "bambús";
        }
        else {
            pluralBamboo = "bambú";
        }

        if ($scope.game.tipCounter <= 3) {
            sweet.show({
                title: 'Tá precisando de uma dica?',
                text: 'Se você escolher que sim, ' + $scope.game.tipCounter + ' ' + pluralBamboo + ' será usado para comprar a dica. Quanto menos bambus você tiver, mais fome o professor Panda ficará!',
                imageUrl: '../design/panda-bamboo-03.png',
                showCancelButton: true,
                confirmButtonColor: '#388E3C',
                confirmButtonText: 'Sim, quero a dica!',
                cancelButtonText: 'Não, obrigado.',
                closeOnConfirm: false,
                closeOnCancel: true
            }, function(isConfirm) {
                if (isConfirm) {
                    sweet.show('Monóxido de carbono', 'O Monóxido de Carbono (CO) é um gás levemente inflamável, incolor, inodoro e muito perigoso devido à sua grande toxicidade. É produzido pela queima em condições de pouco oxigênio (combustão incompleta) e/ou alta temperatura de carvão ou outros materiais ricos em carbono, como derivados de petróleo.\nO monóxido de carbono é um agente redutor, retirando oxigênio de muitos compostos em processos industriais (formando CO2), como na produção de ferro e outros metais a partir de seus minérios e hidrogênio a partir da água. Também se combina com o níquel metálico produzindo um composto volátil que é usado na purificação deste metal (processo Mond). Também é usado na síntese de vários compostos orgânicos, como ácido acético (processo Monsanto), plásticos, metanol e formatos.', 'success');
                    $scope.game.bambooCounter = $scope.game.bambooCounter - $scope.game.tipCounter;
                    $scope.getBamboo($scope.game.bambooCounter);
                    $scope.game.tipCounter++;
                    $scope.$apply();
                }
            });
        }
        else {
            sweet.show({
                title: 'Você não tem mais dicas',
                text: 'Infelizmente todas as suas dicas acabaram, se concentre, não é difícil!',
                imageUrl: '../design/panda-triste-04.png'
            });
        }
    }

    $scope.init();
});
