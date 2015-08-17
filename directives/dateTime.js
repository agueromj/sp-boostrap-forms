(function(){
    /*
    *
    * */
    angular.module('sp.bootstrapForms')
        .directive('abfDatetime', ['MODULE_ROOT_PATH', '$filter', abfDate]);

    function  initDate(initType) {
        switch (initType) {
            case "now":
                return new Date();//moment().toDate();
                break;

            case "startofyear":
                return new moment().startOf('year').toDate();
                break;

            default:
                return null;
        }
    }

    function abfDate(MODULE_ROOT_PATH, $filter){
        return{
            restrict: 'EA',
            require: ['ngModel', '?^form'],
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
                datePickerOptions: '=',
                required: '='
            },
            replace: true, //this will only work if the template returns one element
            templateUrl: 'dateTime.html',
            link: function(scope, el, attr, ctrls){
                var formCtrl = ctrls[1];
                scope.errMsgPath = 'errorMessages.html';
                scope.ctrl = ctrls[0];
                scope.formCtrl = formCtrl;

                var updateDateVal = true;
                scope.showDatePicker = (scope.hasDatepicker == 'true');
                scope.vm = {};
                scope.vm.ngModel = scope.ngModel;
                scope.vm.datePicker = scope.datePicker;
                scope.vm.format = scope.format;
                scope.vm.required = attr.required;

                scope.vm.timeValue = moment().startOf('day').toDate();
                scope.vm.dateValue = null;

                scope.vm.open = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    scope.vm.opened = true;
                };

                scope.$watch('ngModel', function(newVal, oldVal) {

                    if(scope.showDatePicker) {
                        if (newVal != oldVal && updateDateVal) {
                            if (moment(newVal).isValid()) {
                                scope.vm.timeValue = moment(newVal).toDate();
                                scope.vm.dateValue = moment(newVal).format('YYYY-MM-DD');
                                scope.ngModel = $filter('date')(newVal, 'yyyy-MM-dd HH:mm:ss');
                                updateDateVal = false;
                            }
                        } else
                            updateDateVal = true;
                    }else {
                        if (newVal && moment(newVal).isValid()) {
                            updateDateVal = false;
                            scope.vm.dateValue = moment(newVal).format(scope.format);
                        } else
                            updateDateVal = true;
                    }
                    });

                scope.vm.timeChanged = function(){
                    var newDate = moment(scope.vm.dateValue);
                    if (newDate.isValid()) {
                        var newValDate = newDate.toDate();
                        var hour = scope.vm.timeValue ? scope.vm.timeValue.getHours() : 0;
                        var min = scope.vm.timeValue ? scope.vm.timeValue.getMinutes() : 0;
                        scope.ngModel = $filter('date')(new Date(
                            newValDate.getFullYear(),
                            newValDate.getMonth(),
                            newValDate.getDate(),
                            hour,
                            min,
                            0,
                            0), 'yyyy-MM-dd HH:mm:ss');
                    }
                }

                //scope.$watch('vm.dateValue', function(newVal, oldVal){
                //    if (newVal != null) {
                //        if(scope.showDatePicker) {
                //            var hour = 0;
                //            var min = 0;
                //
                //            if (moment(scope.vm.timeValue).isValid()) {
                //                hour = scope.vm.timeValue.getHours();
                //                min = scope.vm.timeValue.getMinutes();
                //            }
                //
                //            debugger
                //            var newValDate = moment(newVal);
                //            if(newValDate.isValid())
                //                scope.ngModel =  newValDate.format('YYYY-MM-DD HH:mm:ss');
                //        }else{
                //            scope.ngModel = moment(newVal, scope.vm.format).format('YYYY-MM-DD HH:mm:ss');
                //        }
                //    }else{
                //        updateDateVal = true;
                //        scope.ngModel = null;
                //    }
                //});

                scope.onChangeDate = function(){
                    var newVal = scope.vm.dateValue;
                    if (newVal != null) {
                        if(scope.showDatePicker) {
                            var hour = 0;
                            var min = 0;

                            if (moment(scope.vm.timeValue).isValid()) {
                                hour = scope.vm.timeValue.getHours();
                                min = scope.vm.timeValue.getMinutes();
                            }

                            var newValDate = moment(newVal);
                            if(newValDate.isValid())
                                scope.ngModel =  newValDate.format('YYYY-MM-DD HH:mm:ss');
                        }else{
                            scope.ngModel = moment(newVal, scope.vm.format).format('YYYY-MM-DD HH:mm:ss');
                        }
                    }else{
                        updateDateVal = true;
                        scope.ngModel = null;
                    }
                }
            }
        }
    }

}());