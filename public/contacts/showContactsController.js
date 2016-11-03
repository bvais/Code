/**
 * Created by Bruno Vais on 9/2/2016.
 */
angular.module("crmApp")
.controller("showContactsController", ['$scope', 'contactsDataService', '$location', 'activePageService', 'autoCompleteService',
    function ($scope, contactsDataService, $location, activePageService, autoCompleteService) {

        //initialize the grid in the scope
        $scope.currentPage = 1;
        $scope.data = {};

        $scope.gridOptions = {
            enableSorting: true,
            enablePaginationControls: false,
            enableRowSelection: true,
            multiSelect : false,
            enableRowHeaderSelection: false,
            selectionRowHeaderWidth: 35,
            enableGridMenu: true,
            exporterMenuPdf: false,
            enableSelectAll: true,
            paginationPageSize: 100,
            columnDefs: [
                {field: 'id', visible: false},
                { field: 'name', enableColumnMenu: false },
                { field: 'company', enableColumnMenu: false},
                {field: 'email', enableColumnMenu: false},
                {field: 'phone', enableColumnMenu: false},
                {field: 'social', enableColumnMenu: false}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.serviceGridApi = gridApi;
                $scope.serviceGridApi.grid.registerRowsProcessor(singleFilter, 200 );
                $scope.serviceGridApi.selection.on.rowSelectionChanged(null,function(row){
                    contactSelected(row.entity);
                });
            }
        };

        contactsDataService.initContacts()
            .then(function(data) {
                $scope.gridOptions.data = data;
            });



        var singleFilter = function( renderableRows ){
            var matcher = new RegExp($scope.data.searchText);
            console.log(matcher);
            renderableRows.forEach( function( row ) {
                var match = false;
                [ 'name', 'email' ].forEach(function( field ){
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

    $scope.contactLoaded = function () {
        activePageService.activePage = "Contact";
    };

    $scope.querySearch = function (query) {
        return autoCompleteService.querySearch(contactsDataService.getContacts(), query, 'name');
    };

    /**
     * SEARCH
     */
    refresh = function() {
        $scope.serviceGridApi.grid.refresh();
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

    contactSelected = function (contact) {
        $location.path('/editcontact/' + contact.id);
    }

}]);



