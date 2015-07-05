(function(){
    angular.module('sp.bootstrapForms')
        .directive('abfText', ['MODULE_ROOT_PATH', abfString]);

    function abfString(MODULE_ROOT_PATH){
        return{
            restrict: 'EA',
            require: ['ngModel', '?^form'],
            scope: {
                ngModel: '=',
                label: '@',
                name: '@',
                placeholder: '@'
            },
            replace: true, //this will only work if the template returns one element
            templateUrl: MODULE_ROOT_PATH + 'templates/text.html',
            link: function(scope, el, attr, ctrls){
                var formCtrl = ctrls[1];
                scope.errMsgPath = MODULE_ROOT_PATH + 'templates/errorMessages.html';
                scope.ctrl = ctrls[0];
                scope.formCtrl = formCtrl;
            }
        }
    }
}());/**
 * Created by jusefbelkasemi on 23/04/15.
 */
