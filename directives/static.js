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
                placeholder: '@',
                format: '@',
                labelPosition: '@'
            },
            replace: true, //this will only work if the template returns one element
            transclude: true,
            templateUrl: function(el, attr){
                var labelPosition = attr.labelPosition ? attr.labelPosition : 'left';
                if(labelPosition == 'top')
                    return 'static_top.html';
                else
                    return 'static_left.html'
            },
            link: function(scope, el, attr){
            }
        }
    }
}());