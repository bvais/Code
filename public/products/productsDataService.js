angular.module('crmApp')
.factory('productsDataService', ['$http', '$q', function ($http, $q){

    var products = [];
    var manufacturers = [];
    var aircrafts = [];
    var types = [];

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

    function getAircrafts() {
        var dfd = $q.defer();
        if (aircrafts.length == 0) {
            $http.get('/aircraft', {cache: true})
                .success(function(data) {
                    aircrafts = data;
                    dfd.resolve(aircrafts);
                })
        }
        else {
            dfd.resolve(aircrafts);
        }

        return dfd.promise;
    }

    function getTypes() {
        var dfd = $q.defer();
        if (types.length == 0) {
            $http.get('/ptype', {cache: true})
                .success(function(data) {
                    types= data;
                    dfd.resolve(types);
                })
        }
        else {
            dfd.resolve(types);
        }

        return dfd.promise;
    }

    function addProduct(product) {
        return $http.post('/product', product)
            .then(function(data) {
                product.id = data.data[0][0].returnID;
                product.aircraft = getAircraft(product.aircraft_id).name;
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

    function getAircraft(id) {
        var air = {};
        for(var i = 0; i < aircrafts.length; i++) {
            if (aircrafts[i].id == id) {
                air = aircrafts[i];
                break;
            }
        }

        return air;
    }

    function getType(id) {
        var tp = {};
        for(var i = 0; i < types.length; i++) {
            if (types[i].id == id) {
                tp = types[i];
                break;
            }
        }

        return tp;
    }

    function getManufacturer(id) {
        var mf = {};
        for(var i = 0; i < manufacturers.length; i++) {
            if (manufacturers[i].id == id) {
                mf = manufacturers[i];
                break;
            }
        }

        return mf;
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
        getManufacturers: getManufacturers,
        getAircrafts: getAircrafts,
        getTypes: getTypes,
        getType: getType,
        getAircraft: getAircraft,
        getManufacturer: getManufacturer
   }
}]);