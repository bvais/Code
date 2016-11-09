angular.module('crmApp')
.factory('contactsDataService', ['$http', '$q', function($http, $q) {

    var contacts = [];

    function initContacts() {
        var deferred = $q.defer();
        if (contacts.length == 0) {
            $http.get('/contact', {cache: true})
                .success(function (data) {
                    contacts = data;
                    deferred.resolve(contacts);
                });
        }
        else {
            deferred.resolve(contacts);
        }

        return deferred.promise;
    }

    function getContacts() {
        return contacts;
    }

    function addContact(contact) {
        return $http.post('/contact', contact)
            .then(function(data) {
               contact.id = data.data[0][0].returnID;
                contacts.push(contact);
            })
            .catch(function(err) {
                throw err;
            });
    }

    function getContact(id) {
        var contact = {};
        for(var i = 0; i < contacts.length; i++) {
            if (contacts[i].id == id) {
                contact = contacts[i];
                break;
            }
        }

        return contact;
    }

    function editContact(contact) {
        return $http.put('/contact/' + contact.id, contact);
    }

    return {
        initContacts: initContacts,
        getContacts: getContacts,
        addContact: addContact,
        getContact: getContact,
        editContact: editContact
   }
}]);