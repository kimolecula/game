kimolecula.controller('jogoController', function ($http, $rootScope, $scope, $routeParams, sweet, KimoleculaModel) {
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    $scope.init = function() {
        $scope.game = {
            user: '',
            bambooCounter: 6,
            tipCounter: '1',
            levelData: '',
            levelNow: 1,
            actualMolecule: '0',
            attemptsAnswer: '1',
            maxAttemptsAnswer: '6',
            answerChoice: [],
            lastTip: ''
        };

        if (!$rootScope.game.user) {
            window.location = '#/insira-seu-nome';
        }
        else {
            $scope.game.user = $rootScope.game.user;
        }

        $scope.getLevel($scope.game.levelNow);
    };

    $scope.getLevel = function (levelNow) {
        KimoleculaModel.getLevel(levelNow).then(function (data) {
            var newData = shuffle(data.level);

            if ($scope.game.lastTip == newData[$scope.game.actualMolecule].tips[0]) {
                $scope.game.lastTip = newData[$scope.game.actualMolecule].tips[0];
                $scope.getLevel($scope.game.levelNow);
                return;
            }

            var allAnswers = newData[$scope.game.actualMolecule].rightAnswer.concat(newData[$scope.game.actualMolecule].wrongAnswer);
            var regex = /[0-9]\S/g;
            for (var i = 0; i < allAnswers.length; i++) {
                var regexStr = allAnswers[i];
                var regexMatch = regexStr.match(regex);
                var regexReplace = regexStr.replace(regex, "<b>" + regexMatch + "</b>");
                allAnswers[i] = regexReplace;
            }

            $scope.game.levelData = {
                images: shuffle(newData[$scope.game.actualMolecule].imgFile),
                rightAnswer: newData[$scope.game.actualMolecule].rightAnswer,
                allAnswers: shuffle(allAnswers),
                tips: newData[$scope.game.actualMolecule].tips
            };
            // console.log("level loaded", $scope.game.levelData);
            if(!$scope.game.levelData){
                sweet.show({
                    title: 'Ooops...',
                    text: 'Algum erro aconteceu no processamento da fase que você está... Tente novamente, por favor!',
                    imageUrl: 'design/panda-triste-04.png',
                    showCancelButton: false,
                    confirmButtonText: 'Começar de novo!',
                    closeOnConfirm: true
                }, function(isConfirm) {
                    window.location = '#/instrucoes';
                });
            }
        }, function (err) {
            sweet.show({
                title: 'Ooops...',
                text: 'Não consegui encontrar a fase que você está jogando... Tente novamente, por favor!',
                imageUrl: 'design/panda-triste-04.png',
                showCancelButton: false,
                confirmButtonText: 'Começar de novo!',
                closeOnConfirm: true
            }, function(isConfirm) {
                window.location = '#/instrucoes';
            });
        });
    };

    $scope.loseGame = function (type) {
        if (type == 1) {
            sweet.show({
                title: 'Você não tem mais bambus',
                text: 'Infelizmente todos os bambus acabaram e agora o professor Panda ficará faminto! Comece de novo e ajude o professor a ficar com a barriga cheia!',
                imageUrl: 'design/panda-triste-04.png',
                showCancelButton: false,
                confirmButtonText: 'Começar de novo!',
                closeOnConfirm: true
            }, function(isConfirm) {
                window.location = '#/instrucoes';
            });
        }
        else if (type == 2) {
            sweet.show({
                title: 'Suas chances acabaram...',
                text: 'Você utilizou todas as suas chances em tentar responder qual é a molécula apresentada... Assim o professor Panda ficará morrendo de fome! Comece novamente e alimente o professor com os bambus respondendo corretamente as questões...',
                imageUrl: 'design/panda-triste-04.png',
                showCancelButton: false,
                confirmButtonText: 'Começar de novo!',
                closeOnConfirm: true
            }, function(isConfirm) {
                window.location = '#/instrucoes';
            });
        }
    };

    $scope.getBamboo = function(num) {
        if(num < 0){
            $scope.loseGame(1);
            return;
        }
        return new Array(num);
    };

    $scope.letAnswer = function (molecule) {
        for (var i = 0; i < $scope.game.levelData.rightAnswer.length; i++) {
            if ($scope.game.answerChoice[i] == '' || !$scope.game.answerChoice[i]) {
                $scope.game.answerChoice[i] = molecule;

                if (i == $scope.game.levelData.rightAnswer.length - 1) {
                    $scope.checkAnswer();
                    return;
                }
                return;
            }
        }
    };

    $scope.checkAnswer = function () {
        var regex = /<[^>]*>/g;
        var answerChoice = $scope.game.answerChoice;

        for (var i = 0; i < answerChoice.length; i++) {
            var regexStr = answerChoice[i];
            var regexReplace = regexStr.replace(regex, '');
            answerChoice[i] = regexReplace;
        }

        // console.log(answerChoice, $scope.game.levelData.rightAnswer);
        if (JSON.stringify(answerChoice) === JSON.stringify($scope.game.levelData.rightAnswer)) {
            if ($scope.game.levelNow + 1 > 10) {
                // sweet.show({
                //     title: 'PARABÉNS!',
                //     text: 'Você conseguiu passar por todos os desafios e alimentou o professor Panda! Agora convide os seus amigos para que o professor não fique com fome nunca mais!',
                //     imageUrl: 'design/panda-feliz-08.png',
                //     showCancelButton: false,
                //     confirmButtonText: 'Recomeçar!',
                //     closeOnConfirm: true
                // }, function(isConfirm) {
                //     window.location = '#/home';
                // });

                $rootScope.levelScore = {
                    bamboo: $scope.game.bambooCounter
                };

                window.location = '#/fim-do-jogo';
            }
            else {
                sweet.show({
                    title: 'Resposta certa!',
                    text: 'Você acertou! Vamos para a próxima fase!',
                    imageUrl: 'design/panda-feliz-08.png',
                    showCancelButton: false,
                    confirmButtonText: 'Continuar!',
                    closeOnConfirm: true
                }, function(isConfirm) {
                    $scope.game.bambooCounter += 3;
                    $scope.game.tipCounter = 1;
                    $scope.game.answerChoice = [];
                    $scope.game.levelNow++;
                    $scope.game.attemptsAnswer = 1;
                    $scope.getLevel($scope.game.levelNow);
                });
            }
        }
        else {
            if ($scope.game.attemptsAnswer + 1 > $scope.game.maxAttemptsAnswer) {
                $scope.loseGame(2);
                return;
            }
            else {
                sweet.show({
                    title: 'Quaaaase!',
                    text: 'A resposta que você colocou está incorreta!',
                    imageUrl: 'design/panda-triste-04.png',
                    showCancelButton: false,
                    confirmButtonText: 'Tentar novamente',
                    closeOnConfirm: true
                }, function(isConfirm) {
                    $scope.game.attemptsAnswer++;
                    $scope.game.answerChoice = [];
                    $scope.$apply();
                });

            }
        }
    }

    $scope.instructions = function () {
        var gameBody = document.getElementById('game-body');
        if (window.getComputedStyle(gameBody.querySelector(".game-quiz"), null).getPropertyValue("display") == "flex") {
            gameBody.querySelector(".game-quiz").style.display = "none";
            gameBody.querySelector(".game-help").style.display = "block";
        }
        else {
            gameBody.querySelector(".game-quiz").style.display = "flex";
            gameBody.querySelector(".game-help").style.display = "none";
        }
    }

    $scope.quitGame = function () {
        sweet.show({
            title: 'Tem certeza que deseja abandonar?',
            text: 'Se você abandonar o game agora todos os seus bambus serão perdidos e o professor Panda ficará faminto!',
            imageUrl: 'design/panda-triste-04.png',
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
    };

    $scope.changeMolecule = function () {
        if ($scope.game.bambooCounter == 0) {
            sweet.show({
                title: 'Você não pode mais pular',
                text: 'Todos os bambus já foram usados e o professor Panda está faminto! Responda a fórmula molecular para ganhar bambus ou comece novamente.',
                imageUrl: 'design/panda-triste-04.png',
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
                    window.location = '#/home';
                }
            });
        }
        else {
            sweet.show({
                title: 'Tem certeza que deseja pular?',
                text: 'Se você escolher que sim, 1 bambu será usado para encontrar outro composto. Quanto menos bambus você tiver, mais fome o professor Panda ficará!',
                imageUrl: 'design/panda-triste-04.png',
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
                    $scope.getLevel($scope.game.levelNow);
                    $scope.game.attemptsAnswer = 1;
                    --$scope.game.bambooCounter;
                    $scope.getBamboo($scope.game.bambooCounter);
                    $scope.$apply();
                }
            });
        }
    };

    $scope.clainTip = function () {
        var pluralBamboo = $scope.game.tipCounter;

        if(pluralBamboo > 1){
            pluralBamboo = "bambus serão usados";
        }
        else {
            pluralBamboo = "bambu será usado";
        }

        if ($scope.game.tipCounter <= 3) {
            if ($scope.game.bambooCounter >= $scope.game.tipCounter) {
                sweet.show({
                    title: 'Tá precisando de uma dica?',
                    text: 'Se você escolher que sim, ' + $scope.game.tipCounter + ' ' + pluralBamboo + ' para comprar a dica. Quanto menos bambus você tiver, mais fome o professor Panda ficará!',
                    imageUrl: 'design/panda-bamboo-03.png',
                    showCancelButton: true,
                    confirmButtonColor: '#388E3C',
                    confirmButtonText: 'Sim, quero a dica!',
                    cancelButtonText: 'Não, obrigado.',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm) {
                    if (isConfirm) {
                        sweet.show('Dica rápida', $scope.game.levelData.tips[$scope.game.tipCounter - 1], 'success');
                        $scope.game.bambooCounter = $scope.game.bambooCounter - $scope.game.tipCounter;
                        $scope.getBamboo($scope.game.bambooCounter);
                        $scope.game.tipCounter++;
                        $scope.$apply();
                    }
                });
            }
            else {
                sweet.show({
                    title: 'Você não tem bambus suficientes',
                    text: 'A quantidade de bambu que você tem não é suficiente para comprar dicas agora, o professor Panda está ficando faminto! Para continuar, responda a questão para voltar a ganhar bambus ou comece novamente.',
                    imageUrl: 'design/panda-triste-04.png'
                });
            }
        }
        else {
            sweet.show({
                title: 'Você não tem mais dicas',
                text: 'Infelizmente todas as suas dicas acabaram, se concentre, não é difícil!',
                imageUrl: 'design/panda-triste-04.png'
            });
        }
    };

    $scope.init();
});
