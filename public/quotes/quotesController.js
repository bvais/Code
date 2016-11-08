angular.module("crmApp")
    .controller("quotesController", ['$scope', '$http', '$location', '$route', '$routeParams', 'quotesService', 'quotesDataService', 'productsDataService',
        function ($scope, $http, $location, $route, $routeParams, quotesService, quotesDataService, productsDataService) {
        $scope.currentProduct = quotesService.currentProduct;
        $scope.quotes = quotesService.quotes;
        $scope.quote = {};
        $scope.comments = [];

        $scope.isAddMode = function() {
            return quotesService.addMode;
        };

        //this is called from the products list and from the quotes list
        //the products list already has a productID, and wants the quotes
        //the quotes list has the quoteID and wants more info
        var productID = $routeParams.pid;
        var quoteID = $routeParams.qid;

        if (quoteID == null) {
            //get all the quotes for a given productID
            $http.get('/quote/product/' + $scope.currentProduct.id)
                .success(function (data) {
                    //reset the quotes
                    quotesService.quotes = data;
                }
            );
        }
        else {
            //I already have the quote data, I need the comments
            $http.get('/quote/comments/' + quoteID)
                .success(function (data) {
                        //reset the quotes
                        $scope.comments = data;
                    }
                );
        }

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
            $http.post('/quote/comments', {'quote_id': quoteID, 'comment': $scope.quote.comments})
                .then(function(data) {
                    $scope.comments.push({"date": "10.13.2016", "comment": $scope.quote.comments});
                    $scope.quote.comments = "";
                }
            );
        };

        $scope.cancelQuote = function () {
            $location.path('/opps');
        }



    }]);