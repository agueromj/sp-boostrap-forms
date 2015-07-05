/**
 * Created by jusefbelkasemi on 09/04/15.
 */
(function(){
    describe("Testing dateTime directive", function(){
        var $compile,
            $rootScope,
            scope;

        var vm = {
            dateField: "",
            label: "test label",
            name: "test_name",
            placeholder: "test placeholder",
            hasDatepicker: true,
            dataMask: '',
            init: null
        };

        beforeEach(module('sp.bootstrapForms'));
        beforeEach(module(helper.getModuleRootPath() + 'templates/dateTime.html'));
        beforeEach(module(helper.getModuleRootPath() + 'templates/bootstrap_overrides/simple_timepicker.html'));

        beforeEach(inject(function(_$compile_, _$rootScope_){
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        function create(){
            scope = $rootScope.$new();
            scope.vm = angular.copy(vm);
            var compiledEl = $compile('<abf-datetime label="{{vm.label}}" name="{{vm.name}}" ng-model="vm.dateField" data-mask="{{vm.dataMask}}" data-init="{{vm.init}}" placeholder="{{vm.placeholder}}"></abf-datetime>')(scope);
            scope.$digest();

            return compiledEl;
        }

        it("should have a valid label", function(){
            var element = create();
            expect($(element).find('label:contains("' + vm.label + '")').length).toEqual(1);
        });

        it("should have an input with a valid 'name' attribute", function(){
            var element = create();
            expect(angular.element(element[0].querySelector('input[name="' + vm.name+ '"]')).length).toEqual(1);

        });

        it("should have an input with a valid 'placeholder' attribute", function(){
            var element = create();
            expect(angular.element(element[0].querySelector('input[ng-placeholder="' + vm.placeholder+ '"]')).length).toEqual(1);

        });

        it("should set 'ui-mask' if it was passed to the directive", function(){
            vm.dataMask = '99/99/9999';
            var element = create();
            expect(element.find('input[ui-mask="99/99/9999"], input[data-ui-mask="99/99/9999"]').length).toBe(1);
        });

        xit("should call initialise date to now if an init=now option was passed", function(){
            vm.init = 'now';
            var element = create();

            expect(scope.vm.dateField).toEqual(moment().format('YYYY-MM-DD HH:mm:00'));
        });

        xit("should set date to begin. of the year on init=startofyear", function(){
            vm.init = 'startofyear';
            var element = create();

            expect(scope.vm.dateField).toEqual(moment().startOf('year').format('YYYY-MM-DD HH:mm:00'));
        });

        describe("Test ui.boostrap Datepicker interaction", function(){
            var scope = null;
            var timeout = null;
            var $compile = null;

            beforeEach(inject(function(_$compile_, $rootScope, $timeout) {
                scope = $rootScope.$new();
                timeout = $timeout;
                $compile = _$compile_;
            }));

            function create(){
                scope.dateModel = {};
                scope.vm = angular.copy(vm);
                var compiledEl = $compile('<abf-datetime name="{{vm.name}}" ng-model="dateModel" placeholder="" data-mask="" data-date-picker="date" has-datepicker="true"></abf-datetime>')(scope);
                scope.$digest();

                return compiledEl;
            }

            it("should use ui.bootstrap datepicker when hasDatepicker is set", function(){
                var element = create();
                expect(element.find('input').attr('datepicker-options')).toBeDefined();
            });

            it("should change the value of the ngModel on change of the dateValue", function(){
                var element = create();
                var valToTry = "2015-04-25";

                //the dateValue should always be in ISO format
                element.isolateScope().vm.dateValue = valToTry;
                scope.$digest();

                expect(moment(scope.dateModel).format('YYYY-MM-DD')).toEqual(valToTry);
            });

            it("should not change the value of the ngModel on change of the timeValue if dateValue was nto set", function(){
                var element = create();
                element.isolateScope().vm.timeValue = new Date("2015/04/25");
                element.isolateScope().vm.timeChanged();
                scope.$digest();
                expect(scope.dateModel).toBeNull();
            });

            it("should change the value of the ngModel on change of the timeValue if dateValue is set", function(){
                var element = create();
                var isScope =  element.isolateScope();
                isScope.vm.dateValue = new Date("2015/04/25");
                isScope.vm.timeValue = new Date("2015/04/25 12:00:00");
                scope.$digest();
                var expValue = moment(isScope.vm.timeValue).format('YYYY-MM-DD HH:mm:00')
                expect(scope.dateModel).toEqual(expValue);
            });

        });
    })
}());