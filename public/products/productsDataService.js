angular.module('crmApp')
.factory('productsDataService', ['$http', '$q', function ($http, $q){

    var products = [];
    var manufacturers = [];

    function initProducts() {
        var dfd = $q.defer();
        if (products.length == 0) {
            $http.get('/product', {cache: true})
                .success(function(data) {
                    products = data;
                    dfd.resolve(products);
                })
        }
        else {
            dfd.resolve(products);
        }

        return dfd.promise;
    }

    function getProducts() {
        return products;
    }

    function getManufacturers() {
        var dfd = $q.defer();
        if (manufacturers.length == 0) {
            $http.get('/manufacturer', {cache: true})
                .success(function(data) {
                    manufacturers = data;
                    dfd.resolve(manufacturers);
                })
        }
        else {
            dfd.resolve(manufacturers);
        }

        return dfd.promise;
    }

    function addProduct(product) {
        return $http.post('/product', product)
            .then(function(data) {
                product.id = data.data[0][0].returnID;
                products.push(product);
            })
            .catch(function(err) {
                throw(err);
            });
    }

    function getProduct(id) {
        var product = {};
        for(var i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                product = products[i];
                break;
            }
        }

        return product;
    }

    function editProduct(product) {
        return $http.put('/product/' + product.id, product);
    }

    return {
        initProducts: initProducts,
        getProducts: getProducts,
        addProduct: addProduct,
        getProduct: getProduct,
        editProduct: editProduct,
        getManufacturers: getManufacturers
   }
}]);