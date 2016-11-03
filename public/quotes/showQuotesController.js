/**
 * Created by Bruno Vais on 9/2/2016.
 */
angular.module("crmApp")
.controller("showQuotesController", ['$scope', 'contactsDataService', 'quotesDataService', '$location', 'activePageService',
    'productsDataService', 'autoCompleteService',
    function ($scope, contactsDataService, quotesDataService, $location, activePageService,
              productsDataService, autoCompleteService) {

        $scope.currentPage = 1;
        $scope.data = {};

        $scope.gridOptions = {
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            enableSorting: true,
            enablePaginationControls: false,
            multiSelect : false,
            enableGridMenu: true,
            exporterMenuPdf: false,
            enableSelectAll: false,
            paginationPageSize: 100,
            columnDefs: [
                {field: 'id', visible: false},
                { field: 'type', enableColumnMenu: false },
                { field: 'partno', enableColumnMenu: false },
                { field: 'company', enableColumnMenu: false},
                {field: 'quantity', enableColumnMenu: false},
                {field: 'condition', enableColumnMenu: false},
                {field: 'price', enableColumnMenu: false, cellFilter: 'currency'},
                {field: 'date', enableColumnMenu: false},
                {field: 'pin', enableColumnMenu: false},
                {field: 'leadtime', enableColumnMenu: false},
                {field: ' ', enableColumnMenu: false,
                    cellTemplate: '<div style="text-align:center;" class="ui-grid-cell-contents"><a href="#/quote/{{row.entity.id}}">View</a></div>'}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.serviceGridApi = gridApi;
                $scope.serviceGridApi.grid.registerRowsProcessor(singleFilter, 200 );
                $scope.serviceGridApi.selection.on.rowSelectionChanged(null,function(row){
                    selectedOpp(row.entity);
                });
            }
        };

        quotesDataService.initQuotes()
            .then(function(data) {
                $scope.gridOptions.data = data;
            });

        var singleFilter = function( renderableRows ){
            var matcher = new RegExp($scope.data.searchText);
            renderableRows.forEach( function( row ) {
                var match = false;
                ['partno'].forEach(function( field ){
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

    $scope.querySearch = function (query) {
        return autoCompleteService.querySearch(contactsDataService.getContacts(), query, 'company');
    };

    $scope.queryOpps   = function (query) {
        return autoCompleteService.querySearch(productsDataService.getProducts(), query, 'part_number');
    };

    $scope.oppsLoaded = function () {
        activePageService.activePage = "Quotes";
    };


    $scope.cancel = function () {
        $location.path('/opps');
    };

    /**
     * SEARCH
     */
    $scope.search = function() {
        $scope.serviceGridApi.grid.refresh();
    };

    /**
     * PAGINATION
     */
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

    selectedOpp = function (opp) {
        quotesService.quotes.length = 0;
        for(var i = 0; i < this.gridOptions.data.length; i++) {
            if (this.gridOptions.data[i]['q_id'] == opp.q_id) {
                quotesService.quotes.push(this.gridOptions.data[i]);
            }
        }

        var allProducts = productsDataService.getProducts();

        for(var j = 0; j < allProducts.length; j++) {
            if (allProducts[j]['part_number'] == opp.partno) {
                quotesService.currentProduct  = allProducts[j];
                break;
            }
        }

        quotesService.addMode = false;
        $location.path('/quotes/' + opp.q_id);
    };
}]);

