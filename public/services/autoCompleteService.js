/**
 * Created by Bruno Vais on 9/21/2016.
 */
//this is the AutoComplete service
angular.module('crmApp')
.service('autoCompleteService', ['$timeout', '$q', function ($timeout, $q) {

    this.querySearch = function (array, query, queryBy) {
        var results = query ? array.filter( createFilterFor(query, queryBy) ) : array;
        var deferred = $q.defer();
        $timeout(function () {

            //remove duplicates from the results
            var uniqueArray = [];

            if (queryBy != null) {
                for (var i = 0; i < results.length; i++) {
                    var found = false;
                    for (var j = 0; j < uniqueArray.length; j++) {
                        if (uniqueArray[j][queryBy] == results[i][queryBy]) {
                            found = true;
                            break;
                        }
                    }

                    if (!found) uniqueArray.push(results[i]);
                }
            }
            else uniqueArray = results;

            deferred.resolve( uniqueArray );
        }, Math.random() * 500, false);
        return deferred.promise;
    };

    function createFilterFor(query, queryBy) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(elem) {
            return (angular.lowercase(elem[queryBy])).indexOf(lowercaseQuery) != -1;
        };
    }
}]);