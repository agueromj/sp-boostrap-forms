(function(){
    angular.module('sp.bootstrapForms')
        .directive('abfCollection', [abfString]);

    function abfString(){
        return{
            restrict: 'EA',
            require: ['ngModel', '?^form'],
            scope: {
                ngModel: '=',
                label: '@',
                name: '@',
                placeholder: '@',
                collection: '=',
                includeBlank: '@',
                onChange: '&',
                blankTitle: '@',
                titleField: '@'
            },
            replace: true, //this will only work if the template returns one element
            templateUrl: 'collection.html',
            link: function(scope, el, attr, ctrls){
                scope.title = (attr.titleField == null) ? 'title': attr.titleField;
                var formCtrl = ctrls[1];
                scope.errMsgPath = 'errorMessages.html';
                scope.ctrl = ctrls[0];
                scope.formCtrl = formCtrl;
                scope.blank = scope.blankTitle == null ? 'Select Option': scope.blankTitle;

                scope.$watch('ngModel', function(newVal, oldVal) {

                    if (typeof(scope.onChange) == 'function') {
                        scope.onChange();
                    }
                });
            }
        }
    }
}());