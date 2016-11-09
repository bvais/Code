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

    $scope.redirect = function () {
        if (quotesService.addMode) {
            quotesService.currentContact = $scope.contact;
            $location.path('/products');
        }
        else $location.path('/contacts');
    };


    $scope.addContact = function() {
        if ($scope.contact.id > 0) {
            //show the success notification
            toastr.success('Selected ' + $scope.contact.name);

            //and redirect
            $scope.redirect();
        }
        else {
            contactsDataService.addContact($scope.contact)
                .then(function (data) {
                    //show the success notification
                    toastr.success('Created ' + $scope.contact.name);

                    //and redirect
                    $scope.redirect();
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
                $scope.redirect();
            })
            .catch(function(err) {
                toastr.error('Error: updating ' + $scope.contact.name + ' ' + err);

                //in case of error get out of addMode
                quotesService.addMode = false;
                $scope.redirect();
            });
    };

    $scope.cancel = function() {
        if (quotesService.addMode == true) {
            quotesService.addMode = false;
            $location.path('/quotes');
        }
        else $location.path('/contacts');
    }
}]);