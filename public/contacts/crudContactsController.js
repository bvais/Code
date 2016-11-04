angular.module('crmApp')
.controller('crudContactsController', ['$scope', '$location', 'autoCompleteService', 'contactsDataService', 'activePageService', '$routeParams', 'quotesService',
    function($scope, $location, autoCompleteService, contactsDataService, activePageService, $routeParams, quotesService) {

    $scope.contact = {};
    $scope.editMode = false;

    //initialize contacts so I have them if the user goes straight to add quote
    contactsDataService.initContacts();

    if ($routeParams.id != null) {
        $scope.contact = contactsDataService.getContact($routeParams.id);
        $scope.editMode = true;
    }

    $scope.selectedName = function (contact) {
        $scope.contact.company = contact.company;
        $scope.contact.email = contact.email;
        $scope.contact.phone = contact.phone;
        $scope.contact.id = contact.id;
    };

    $scope.querySearch = function (query) {
        return autoCompleteService.querySearch(contactsDataService.getContacts(), query, 'company');
    };

    $scope.contactSearch = function (query) {
        if ($scope.contact.company != null && $scope.contact.company.length > 0)
            return autoCompleteService.querySearch(contactsDataService.getContacts().filter(function(elem, pos) {
                return elem["company"] == $scope.contact.company;
            }), query, 'name');
        else
            return autoCompleteService.querySearch(contactsDataService.getContacts(), query, 'name');
    };


    $scope.addContact = function() {
        if ($scope.contact.id > 0) {
            toastr.success('Selected ' + $scope.contact.name);
            activePageService.redirect($scope.contact);
        }
        else {
            contactsDataService.addContact($scope.contact)
                .then(function (data) {
                    toastr.success('Created ' + $scope.contact.name);
                    activePageService.redirect($scope.contact);

                })
                .catch(function (err) {
                    toastr.error('Error: creating ' + $scope.contact.name + ' ' + err);
                });
        }
    };

    $scope.editContact = function() {
        contactsDataService.editContact($scope.contact)
            .then(function(data) {
                toastr.success('Updated ' + $scope.contact.name);
                activePageService.redirect($scope.contact);
            })
            .catch(function(err) {
                toastr.error('Error: updating ' + $scope.contact.name + ' ' + err);
                activePageService.redirect($scope.contact);
            });
    };

    $scope.cancel = function() {
        quotesService.addMode = false;
        $location.path('/quotes');
    }
}]);