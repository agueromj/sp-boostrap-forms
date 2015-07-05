/**
 * Created by jusefbelkasemi on 09/04/15.
 */
(function(){
    describe("Testing currency directive", function(){
        var $compile,
            $rootScope;

        var vm = {
            stringField: "test",
            label: "test label",
            name: "test_name",
            placeholder: "test placeholder"
        };

        beforeEach(module('sp.bootstrapForms'));
        beforeEach(module(helper.getModuleRootPath() + 'templates/currency.html'));

        beforeEach(inject(function(_$compile_, _$rootScope_){
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $rootScope.vm = vm;

        }));

        it("should have a valid label", function(){
            var element = $compile('<abf-string label="{{vm.label}}" name="{{vm.name}}" ng-model="vm.stringField"></abf-string>')($rootScope);

            $rootScope.$digest();
            expect($(element).find('label:contains("' + vm.label + '")').length).toEqual(1);

        });

        it("should have an input with a valid 'name' attribute", function(){
            var element = $compile('<abf-string name="{{vm.name}}" ng-model="vm.stringField"></abf-string>')($rootScope);
            $rootScope.$digest();
            expect(angular.element(element[0].querySelector('input[name="' + vm.name+ '"]')).length).toEqual(1);

        });

        it("should have an input with a valid 'placeholder' attribute", function(){
            var element = $compile('<abf-string name="{{vm.name}}" ng-model="vm.stringField" placeholder="{{vm.placeholder}}"></abf-string>')($rootScope);
            $rootScope.$digest();
            expect(angular.element(element[0].querySelector('input[ng-placeholder="' + vm.placeholder+ '"]')).length).toEqual(1);

        });
    })
}());