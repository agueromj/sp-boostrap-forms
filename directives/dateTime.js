(function(){
    /*
    *
    * */
    angular.module('sp.bootstrapForms')
        .directive('abfDatetime', ['MODULE_ROOT_PATH', '$filter', abfString]);


    function abfString(MODULE_ROOT_PATH, $filter){
        return{
            restrict: 'EA',
            require: 'ngModel',
            scope: {
                ngModel: '=',
                label: '@',
                name: '@',
                placeholder: '@',
                mask: '@',
                format: '@',
                init: '@',
                hasDatepicker: '@',
                datePicker: '@',
                datePickerOptions: '='
            },
            replace: true, //this will only work if the template returns one element
            templateUrl: MODULE_ROOT_PATH + 'templates/dateTime.html',
            link: function(scope, el, attr, ctrl){
                scope.showDatePicker = (scope.hasDatepicker == 'true');
                scope.vm = {};
                scope.vm.ngModel = scope.ngModel;
                scope.vm.datePicker = scope.datePicker;
                scope.vm.format = scope.format;
                scope.vm.timeValue = moment().startOf('day').toDate();
                scope.vm.dateValue = null;

                scope.vm.open = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    scope.vm.opened = true;
                };

                scope.$watch('ngModel', function(newVal, oldVal) {
                    if(newVal != oldVal){
                        //scope.vm.timeValue = newVal;
                        //scope.vm.dateValue = newVal;
                    }
                });

                scope.vm.timeChanged = function(){
                    if (scope.vm.dateValue) {
                        var hour = scope.vm.timeValue ? scope.vm.timeValue.getHours() : 0;
                        var min = scope.vm.timeValue ? scope.vm.timeValue.getMinutes() : 0;
                        scope.ngModel = $filter('date')(new Date(
                            scope.vm.dateValue.getFullYear(),
                            scope.vm.dateValue.getMonth(),
                            scope.vm.dateValue.getDate(),
                            hour,
                            min,
                            0,
                            0), 'yyyy-MM-dd HH:mm:ss');
                    }
                }

                scope.$watch('vm.dateValue', function(newVal, oldVal){
                    if (newVal != oldVal) {
                        var hour = scope.vm.timeValue ? scope.vm.timeValue.getHours() : 0;
                        var min = scope.vm.timeValue ? scope.vm.timeValue.getMinutes() : 0;
                        scope.ngModel = $filter('date')(new Date(
                            newVal.getFullYear(),
                            newVal.getMonth(),
                            newVal.getDate(),
                            hour,
                            min,
                        0,
                        0), 'yyyy-MM-dd HH:mm:ss');
                    }
                });

                scope.initDate = function(initType) {
                    switch (initType) {
                        case "now":
                            return new Date.now();
                            break;
                    }
                }

            }
        }
    }

}());