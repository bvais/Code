angular.module('crmApp')
.directive('contactFields', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'contacts/contactFields.html'
    }
});