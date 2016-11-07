angular.module('crmApp')
.controller('crudProductsController', ['$scope', 'productsDataService', '$location', '$routeParams',
    function ($scope, productsDataService, $location, $routeParams) {

    $scope.product = {};
    $scope.editMode = false;
    $scope.manufacturers = [];
    $scope.aircrafts = [];
    $scope.types = [];

    if ($routeParams.id != null) {
        $scope.product = productsDataService.getProduct($routeParams.id);
        $scope.editMode = true;
    }

    productsDataService.getManufacturers()
        .then(function(data) {
            $scope.manufacturers = data;
        }
    );

    productsDataService.getAircrafts()
        .then(function(data) {
                $scope.aircrafts = data;
        }
    );

    productsDataService.getTypes()
        .then(function(data) {
                $scope.types = data;
        }
    );

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
        //the product I get here has the correct a_id, part_type_id and m_id but NOT the correct strings
        product.manufacturer = productsDataService.getManufacturer(product.manufacturer_id).name;
        product.part_type = productsDataService.getType(product.part_type_id).name;
        product.aircraft = productsDataService.getAircraft(product.aircraft_id).name;

        productsDataService.editProduct(product);
        $location.path('/products');
        toastr.success('Updated ' + product.part_number);
    }

    $scope.cancel = function () {
        $location.path('/products');
    }
}]);