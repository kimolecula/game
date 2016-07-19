kimolecula.factory('kmlAPI', function ($http) {
    var makeHttp = function (url, data) {
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        if (!data) data = {};

        return $http({
            method: 'GET',
            url: 'levels/' + url,
            data: data
        }).then(function (response) {
            return response.data;
        }, function (err) {
            throw err;
        });
    };

    return {
        getLevel: function (actualLevel) {
            return makeHttp('kml-lvl-' + actualLevel + '.json');
        }
    };
})
;
