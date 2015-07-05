(function () {
    angular.module('sp.bootstrapForms')
        .directive('abfCurrency', ['sp.bootstrapForms', abfCurrency]);

    function abfCurrency(spBootstrapForms) {
        return {
            restrict: 'EA',
            require: ['ngModel', '?^form'],
            scope: {
                ngModel: '=',
                label: '@',
                name: '@',
                placeholder: '@'
            },
            replace: true, //this will only work if the template returns one element
            templateUrl: spBootstrapForms.rootPath + 'templates/currency.html',
            link: function (scope, el, attr, ctrls) {
                var formCtrl = ctrls[1];
                scope.errMsgPath = spBootstrapForms.rootPath + 'templates/errorMessages.html';
                scope.ctrl = ctrls[0];
                scope.formCtrl = formCtrl;
                scope.currencySymbol = spBootstrapForms.currency;

                //validating currency
                var re = /^(?:\d+(?:,\d{3})*(?:\.\d{2})?|\d+(?:\.\d{3})*(?:,\d{2})?)$/;

                scope.ctrl.$validators.currency = function(modelValue, viewValue){
                    return re.test(modelValue) || modelValue == null;
                }

            }
        }
    }
}());