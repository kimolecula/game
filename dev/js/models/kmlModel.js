kimolecula.factory('KimoleculaModel', function ($rootScope, kmlAPI) {
    return {
        getLevel: function (actualLevel) {
            return kmlAPI.getLevel(actualLevel);
        }
    };
})
