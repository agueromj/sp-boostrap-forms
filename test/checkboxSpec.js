/**
 * Created by jusefbelkasemi on 09/04/15.
 */
(function(){
    describe("Testing checkbox directive", function(){
        var $compile,
            $rootScope,
            scope;

        //All available attributes
        var vm = {
            stringField: "test",
            label: "test label",
            name: "test_name",
            isChecked: true
        };

        beforeEach(module('sp.bootstrapForms'));
        beforeEach(module(helper.getModuleRootPath() + 'templates/checkbox.html'));

        beforeEach(inject(function(_$compile_, _$rootScope_){
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        function create(){
            scope = $rootScope.$new();
            scope.vm = vm;
            var compiledEl = $compile('<abf-checkbox label="{{vm.label}}" name="{{vm.name}}" ng-model="vm.stringField"></abf-checkbox>')(scope);
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

    })
}());