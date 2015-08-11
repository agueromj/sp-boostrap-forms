(function(){
    angular.module('sp.bootstrapForms')
        .directive('abfStatic', ['MODULE_ROOT_PATH', abfStatic]);

    function abfStatic(MODULE_ROOT_PATH){
        return{
            restrict: 'EA',
            scope: {
                ngModel: '=',
                label: '@',
                name: '@',
                placeholder: '@'
            },
            replace: true, //this will only work if the template returns one element
            transclude: true,
            templateUrl: 'static.html',
            link: function(scope, el, attr){
            }
        }
    }
}());