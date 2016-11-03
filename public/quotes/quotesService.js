angular.module('crmApp')
    .service('quotesService', function() {
        this.currentProduct = {};
        this.currentContact = {};
        this.quotes = [];

        this.addMode = false;
});