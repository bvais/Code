angular.module('crmApp')
.factory('quotesDataService', ['$http', '$q', 'quotesService', function ($http, $q, quotesService) {

    var quotes = [];

    function initQuotes() {
        var deferred = $q.defer();
        if (quotes.length == 0) {
            $http.get('/quote', {cache: true})
                .success(function (data) {
                    quotes = data;
                    deferred.resolve(quotes);
                });
        }
        else {
            deferred.resolve(quotes);
        }

        return deferred.promise;
    }

    function addQuote(quote) {
        return $http.post('/quote', quote)
            .then(function(data) {
                quote.id = data.data.insertId;
                quotes.push(quote);
            })
            .catch(function(err) {
                throw err;
            });
    }

    return {
        initQuotes: initQuotes,
        addQuote: addQuote
    }
}]);