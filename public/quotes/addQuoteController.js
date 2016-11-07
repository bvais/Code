angular.module("crmApp")
    .controller("quotesController", ['$scope', '$http', '$location', '$route', '$routeParams', 'quotesService', 'quotesDataService', 'productsDataService',
        function ($scope, $http, $location, $route, $routeParams, quotesService, quotesDataService, productsDataService) {
        $scope.currentProduct = quotesService.currentProduct;
        $scope.quotes = quotesService.quotes;
        $scope.quote = {};

        $scope.isAddMode = function() {
            return quotesService.addMode;
        };

        /*if ($routeParams.id != null) {
            var allProducts = productsDataService.getProducts();

            for(var j = 0; j < allProducts.length; j++) {
                if (allProducts[j].id == $routeParams.id) {
                    $scope.currentProduct = allProducts[j];
                    break;
                }
            }
        }*/

        $http.get('/quote/product/' + $scope.currentProduct.id)
            .success(function(data) {
                for(var i = 0; i < data.length; i++) {
                    quotesService.quotes.push(data[i]);
                }
            });

        $scope.saveQuote = function () {
            $scope.quote.partno = $scope.currentProduct.part_number;
            $scope.quote.product_id = $scope.currentProduct.id;
            $scope.quote.contact_id = quotesService.currentContact.id;
            $scope.quote.company = quotesService.currentContact.company;

            quotesDataService.addQuote($scope.quote)
                .then(function(data) {
                    $scope.quote = {};
                    $location.path('/opps');
                });
        };

        $scope.addComment = function () {
            console.log($scope.quotes[0]);
            $scope.quotes[0].comments.push({"date": "10.13.2016", "text": $scope.opp.comments});
            $scope.opp.comments = "";
        };

        $scope.cancelQuote = function () {
            $location.path('/opps');
        }



    }]);