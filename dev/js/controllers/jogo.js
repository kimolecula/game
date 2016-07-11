kimolecula.controller('jogoController', function ($http, $rootScope, $scope, $routeParams, sweet) {
    $scope.init = function() {
    }

    $scope.quitGame = function () {
        sweet.show({
            title: 'Tem certeza que deseja abandonar?',
            text: 'Se você abandonar o game agora todos os seus bambús serão perdidos e o professor Panda ficará faminto!',
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
                window.location = '#/home';
            }
        });
    }

    $scope.clainTip = function () {
        sweet.show({
            title: 'Tá precisando de uma dica?',
            text: 'Se você escolher que sim, um bambú será usado para comprar a dica. Quanto menos bambús você tiver, mais fome o professor Panda ficará!',
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
            }
        });
    }

    $scope.init();
});
