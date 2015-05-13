/**
 * Created by jusefbelkasemi on 09/04/15.
 */
(function(){
    describe("Testing dateTime directive", function(){
        var $compile,
            $rootScope;

        var vm = {
            dateField: "",
            label: "test label",
            name: "test_name",
            placeholder: "test placeholder",
            hasDatepicker: true
        };

        beforeEach(module('sp.bootstrapForms'));
        beforeEach(module(helper.getModuleRootPath() + 'templates/dateTime.html'));
        beforeEach(module(helper.getModuleRootPath() + 'templates/bootstrap_overrides/simple_timepicker.html'));

        beforeEach(inject(function(_$compile_, _$rootScope_){
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $rootScope.vm = vm;

        }));

        it("should have a valid label", function(){
            var element = $compile('<abf-datetime label="{{vm.label}}" name="{{vm.name}}" ng-model="vm.dateField"></abf-datetime>')($rootScope);

            $rootScope.$digest();
            expect(element.html()).toContain('<label for="' + vm.name + '">' + vm.label + '</label>');

        });

        it("should have an input with a valid 'name' attribute", function(){
            var element = $compile('<abf-datetime name="{{vm.name}}" ng-model="vm.dateField"></abf-datetime>')($rootScope);
            $rootScope.$digest();
            expect(angular.element(element[0].querySelector('input[name="' + vm.name+ '"]')).length).toEqual(1);

        });

        it("should have an input with a valid 'placeholder' attribute", function(){
            var element = $compile('<abf-datetime name="{{vm.name}}" ng-model="vm.dateField" placeholder="{{vm.placeholder}}"></abf-datetime>')($rootScope);
            $rootScope.$digest();
            expect(angular.element(element[0].querySelector('input[ng-placeholder="' + vm.placeholder+ '"]')).length).toEqual(1);

        });

        it("should set 'ui-mask' if it was passed to the directive", function(){
            var element = $compile('<abf-datetime name="{{vm.name}}" ng-model="vm.dateField" placeholder="{{vm.placeholder}}" data-mask="99/99/9999"></abf-datetime>')($rootScope);
            $rootScope.$digest();
            expect(element.find('input[ui-mask="99/99/9999"], input[data-ui-mask="99/99/9999"]').length).toBe(1);
        });

        xit("should call initialise date function if an initialisation option was passed", function(){
            //TODO: figure out how to spy on directive controller
            //var initDate = spyOn('initDate');
            //$rootScope.initDate = initDate;
            var element = $compile('<abf-datetime name="{{vm.name}}" ng-model="vm.dateField" placeholder="{{vm.placeholder}}" data-mask="99/99/9999" init="now"></abf-datetime>')($rootScope);
            $rootScope.$digest();

            expect(initDate).toHaveBeenCalled();
        });

        describe("Test ui.boostrap Datepicker interaction", function(){
            var element = null;
            var scope = null;

            beforeEach(inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.ngModel = {};
                element = $compile('<abf-datetime name="{{vm.name}}" ng-model="ngModel" placeholder="" data-mask="" data-date-picker="date" has-datepicker="true"></abf-datetime>')(scope);
                scope.$digest();
            }));

            it("should use ui.bootstrap datepicker when hasDatepicker is set", function(){
                expect(element.find('input').attr('datepicker-options')).toBeDefined();
            });

            it("should change the value of the ngModel on change of the dateValue", function(){
                scope.vm.dateValue = new Date("2015/04/25");
                scope.$digest();
                expect(scope.ngModel).toEqual(scope.vm.dateValue);
            });

            it("should change the value of the ngModel on change of the timeValue", function(){
                scope.vm.timeValue = new Date("2015/04/25");
                scope.$digest();
                expect(scope.ngModel).toEqual(scope.vm.timeValue);
            });

        });
    })
}());