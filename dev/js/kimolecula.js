/*************************************************************************************************|
|   KI-MOLECULA - LARISSA BENTO/LUIGUI DELYER@KI-MOLECULA - kimolecula@s1x.com.br                 |
|   GITHUB REPO = https://github.com/qumicambu/quimicambu-game.git                                |
|   NPM DEPENDENCES: {                                                                            |
|     "gulp": "^3.9.0",                                                                           |
|     "gulp-jsvalidate": "^2.1.0",                                                                |
|     "gulp-rename": "^1.2.2",                                                                    |
|     "gulp-uglify": "^1.5.1",                                                                    |
|     "gulp-rename": "^1.2.2",                                                                    |
|     "gulp-watch": "^4.3.5",                                                                     |
|   }                                                                                             |
|*************************************************************************************************/
'use strict';

var kimolecula = angular.module('kimolecula', ['ngResource', 'ngRoute', 'ngSanitize', 'ngL20n', 'hSweetAlert'])
.run(['$rootScope', function($rootScope){
    $rootScope.server=function(url){
        return SERVER_URL + url;
    }

    $rootScope.appName = "Kimolécula";

    $rootScope.game = {
        user: ''
    };

}])

.config(['$routeProvider', '$httpProvider', 'l20nProvider', function ($routeProvider, $httpProvider, l20nProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'homeController'
    })
    .when('/fim-do-jogo', {
        templateUrl: 'templates/fim-do-jogo.html',
        controller: 'fimDoJogoController'
    })
    .when('/insira-seu-nome', {
        templateUrl: 'templates/insira-seu-nome.html',
        controller: 'insiraSeuNomeController'
    })
    .when('/instrucoes', {
        templateUrl: 'templates/instrucoes.html',
        controller: 'instrucoesController'
    })
    .when('/jogo', {
        templateUrl: 'templates/jogo.html',
        controller: 'jogoController'
    })
    .when('/sobre', {
        templateUrl: 'templates/sobre.html',
        controller: 'sobreController'
    })
    .when('/tentativas-excedidas', {
        templateUrl: 'templates/tentativas-excedidas.html',
        controller: 'tentativasExcedidasController'
    })
    .when('/um-pouco-de-quimica', {
        templateUrl: 'templates/um-pouco-de-quimica.html',
        controller: 'umPoucoDeQuimicaController'
    })
    .otherwise({
        redirectTo: '/home'
    });
}]);
