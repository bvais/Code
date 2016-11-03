/**
* Created by Bruno Vais on 9/2/2016.
*/
angular.module("crmApp")
.controller("showProductsController", ['$scope', '$timeout', '$q', '$location', 'activePageService',
    'autoCompleteService', 'productsDataService', 'quotesService',
    function ($scope, $timeout, $q, $location, activePageService,
              autoCompleteService, productsDataService, quotesService) {

        $scope.currentPage = 1;
        $scope.data = {};

        //initialize the grid in the scope
        $scope.gridOptions = {
            enableSorting: true,
            enablePaginationControls: false,
            enableRowSelection: true,
            multiSelect : false,
            enableRowHeaderSelection: false,
            enableGridMenu: true,
            exporterMenuPdf: false,
            enableSelectAll: true,
            paginationPageSize: 100,
            columnDefs: [
                {field: 'id', visible: false},
                { field: 'part_number', enableColumnMenu: false },
                { field: 'price', enableColumnMenu: false, cellFilter: 'currency'},
                { field: 'description', enableColumnMenu: false},
                {field: 'aircraft', enableColumnMenu: false},
                {field: 'part_type', enableColumnMenu: false},
                {field: 'pin_length', enableColumnMenu: false},
                {field: 'nha', enableColumnMenu: false},
                {field: '  ', enableColumnMenu: false,
                    cellTemplate: '<div style="text-align:center;" class="ui-grid-cell-contents"><a href="#/productquotes/{{row.entity.id}}">Quotes</a></div>'},
                {field: ' ', enableColumnMenu: false,
                    cellTemplate: '<div style="text-align:center;" class="ui-grid-cell-contents"><a href="#/product/{{row.entity.id}}">Edit</a></div>'}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.serviceGridApi = gridApi;
                $scope.serviceGridApi.grid.registerRowsProcessor(singleFilter, 200 );

                /*$scope.serviceGridApi.selection.on.rowSelectionChanged(null,function(row){
                    productSelected(row.entity);
                });*/
            }
        };

        var singleFilter = function( renderableRows ){
            var matcher = new RegExp($scope.data.searchText);
            renderableRows.forEach( function( row ) {
                var match = false;
                [ 'part_number'].forEach(function( field ){
                    if ( row.entity[field].match(matcher) ){
                        match = true;
                    }
                });
                if ( !match ){
                    row.visible = false;
                }
            });
            return renderableRows;
        };

        productsDataService.initProducts()
            .then(function (data){
                $scope.gridOptions.data = data;
            });


        $scope.querySearch = function (query) {
            return autoCompleteService.querySearch(productsDataService.getProducts(), query, 'part_number');
        };

        $scope.productsLoaded = function () {
            activePageService.activePage = "Product";
        };


        $scope.addProduct = function(opp) {
            opp.contact = $scope.selectedContact.value;
            opp.date = new Date().toDateString();
            oppsGridService.addOpp(opp);
            $location.path('/opps');
        };

        $scope.cancel = function () {
            $location.path('/products');
        };

        $scope.search = function() {
            console.log('iun');
            $scope.serviceGridApi.grid.refresh();
        };

        $scope.getCurrentPage = function () {
            return $scope.currentPage;
        };

        $scope.getTotalPages = function () {
            return $scope.serviceGridApi.pagination.getTotalPages();
        };

        $scope.goNext = function () {
            $scope.serviceGridApi.pagination.nextPage();
            $scope.currentPage = $scope.serviceGridApi.pagination.getPage();
        };

        $scope.goPrevious = function () {
            $scope.serviceGridApi.pagination.previousPage();
            $scope.currentPage = $scope.serviceGridApi.pagination.getPage();
        };

        $scope.addQuoteMode = function () {
            return quotesService.addMode;
        };

        $scope.go = function () {
          console.log("GO");
        };

        productSelected = function (product) {
            if (!quotesService.addMode) {
                //if I'm not adding a quote go to edit
                $location.path('/editproduct/' + product.id);
            }
            else {
                //otherwise go to add quote
                quotesService.currentProduct = product;
                $location.path('/productquotes/' + product.id);
            }
        }
}]);

