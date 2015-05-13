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
                onchange: '&'
            },
            replace: true, //this will only work if the template returns one element
            templateUrl: MODULE_ROOT_PATH + 'templates/collection.html',
            link: function(scope, el, attr, ctrl){
                scope.hasBlank = scope.includeBlank == 'true';

                scope.$watch('ngModel', function(newVal, oldVal) {
                    if(_.isEmpty(scope.ngModel) && !scope.hasBlank)
                         scope.ngModel = _.first(scope.collection);

                    if (typeof(scope.onchange) == 'function')
                        scope.onchange();
                });
            }
        }
    }
}());