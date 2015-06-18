(function(){
    angular.module('sp.bootstrapForms')
        .directive('abfCollection', ['MODULE_ROOT_PATH', abfString]);

    function abfString(MODULE_ROOT_PATH){
        return{
            restrict: 'EA',
            scope: {
                ngModel: '=',
                label: '@',
                name: '@',
                placeholder: '@',
                collection: '=',
                includeBlank: '@',
                onchange: '&',
                blankTitle: '@'
            },
            replace: true, //this will only work if the template returns one element
            templateUrl: MODULE_ROOT_PATH + 'templates/collection.html',
            link: function(scope, el, attr, ctrl){
                scope.blankTitle = scope.blankTitle == null ? 'Select Option': scope.blankTitle;

                scope.$watch('ngModel', function(newVal, oldVal) {

                    if (typeof(scope.onchange) == 'function')
                        scope.onchange();
                });
            }
        }
    }
}());