/**
 * Created by Bruno Vais on 9/2/2016.
 */
angular.module('crmApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ui.grid', 'ui.grid.resizeColumns',
    'ui.grid.pagination', 'ui.grid.moveColumns', 'ui.grid.selection', 'ui.grid.exporter'])
.config(function($routeProvider) {
    $routeProvider.when('/contacts', {templateUrl: "contacts/contacts.html"});
    $routeProvider.when('/products', {templateUrl: "products/products.html"});
    $routeProvider.when('/services', {templateUrl: 'views/services.html'});
    $routeProvider.when('/quotes', {templateUrl: 'quotes/quotes.html'});
    $routeProvider.when('/addcontact', {templateUrl: 'contacts/addContact.html'});
    $routeProvider.when('/editcontact/:id', {templateUrl: 'contacts/addContact.html'});
    $routeProvider.when('/addproduct', {templateUrl: 'products/addProduct.html'});
    $routeProvider.when('/product/:id', {templateUrl: 'products/addProduct.html'});
    $routeProvider.when('/productquotes', {templateUrl: "quotes/productQuotes.html"});
    $routeProvider.when('/productquotes/:id', {templateUrl: "quotes/productQuotes.html"});
    $routeProvider.when('/quotes/:id', {templateUrl: "quotes/productQuotes.html"});
    $routeProvider.otherwise({templateUrl: "quotes/quotes.html"});
})
.controller('mainCtrl', ['$scope', '$http', 'activePageService', 'quotesService',
    function ($scope, $http, activePageService, quotesService) {

    $scope.isActive = function(page) {
        if (!quotesService.addMode) {
            return activePageService.activePage == page ? "active" : "";
        }
        else
            return "disableInput";
    }
}]);

//this service is used by the header to track the active page
angular.module('crmApp')
    .service('activePageService', ['$location', 'quotesService', function ($location, quotesService) {
    this.activePage = 'Quotes';

    this.redirect = function(contact) {
        if (this.activePage == 'Quotes') {
            quotesService.currentContact = contact;
            quotesService.addMode = true;
            $location.path('/products');
        }
        else {
            $location.path('/contacts');
        }
    }
}]);

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "2",
    "hideDuration": "3",
    "timeOut": "1500",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

