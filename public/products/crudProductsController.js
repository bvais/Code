angular.module('crmApp')
.controller('crudProductsController', ['$scope', 'productsDataService', '$location', '$routeParams',
    function ($scope, productsDataService, $location, $routeParams) {

    $scope.product = {};
    $scope.editMode = false;

    if ($routeParams.id != null) {
        $scope.product = productsDataService.getProduct($routeParams.id);
        $scope.editMode = true;
    }

    $scope.addProduct = function(product) {
        productsDataService.addProduct(product)
            .then(function(data) {
                $location.path('/products');
                toastr.success('Created ' + product.part_number);
            })
            .catch(function(err) {
                $location.path('/products');
                toastr.error('Error: creating ' + product.part_number + ' ' + err);
            });
    };

    $scope.editProduct = function(product) {
        productsDataService.editProduct(product);
        $location.path('/products');
        toastr.success('Updated ' + product.part_number);
    }
}]);