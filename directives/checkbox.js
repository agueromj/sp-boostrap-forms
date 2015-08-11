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
            templateUrl: 'checkbox.html',
            link: function(scope, el, attr, ctrls){
               scope.isChecked = scope.ngModel == true;
            }
        }
    }
}());