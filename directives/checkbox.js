(function(){
    angular.module('sp.bootstrapForms')
        .directive('abfCheckbox', ['MODULE_ROOT_PATH', abfCheckbox]);

    function abfCheckbox(MODULE_ROOT_PATH){
        return{
            restrict: 'EA',
            require: ['ngModel', '?^form'],
            scope: {
                ngModel: '=',
                label: '@',
                name: '@'
            },
            replace: true, //this will only work if the template returns one element
            templateUrl: MODULE_ROOT_PATH + 'templates/checkbox.html',
            link: function(scope, el, attr, ctrls){
               scope.isChecked = scope.ngModel == true;
            }
        }
    }
}());