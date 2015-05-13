(function(){
     describe("Test collection directive", function(){
         var $compile,
             $rootScope;
         var vm = {};
         var defaultVm = {
             model: {},
             collection: [
                 {
                     id: 1,
                     name: 'option1'
                 },
                 {
                     id: 2,
                     name: 'option2'
                 }
             ],
             includeBlank: false,
             label: "test label",
             name: "test_name",
             placeholder: "test placeholder",
             onChange: null
         };

         function compileTemplate($scope){
             var el = $compile('<abf-collection label="{{vm.label}}" name="{{vm.name}}" ng-model="vm.model" collection="vm.collection" data-include-blank="{{vm.includeBlank}}" onchange="vm.onChange()"></abf-collection>')($scope);
             $scope.$digest();
             //console.log(el.html());
             return el;

         }

         beforeEach(module('sp.bootstrapForms'));
         beforeEach(module(helper.getModuleRootPath() + 'templates/collection.html'));

         beforeEach(inject(function(_$compile_, _$rootScope_){
             $compile = _$compile_;
             $rootScope = _$rootScope_;
             vm = angular.copy(defaultVm);
             $rootScope.vm = vm;
         }));

         it("should have a valid label", function(){
             var element = compileTemplate($rootScope);

             expect(element.html()).toContain('<label for="' + vm.name + '">' + vm.label + '</label>');
         });

         it("should have a select with a valid 'name' attribute", function(){
             var element = compileTemplate($rootScope);
             expect(angular.element(element[0].querySelector('select[name="' + vm.name+ '"]')).length).toEqual(1);

         });

         it("should create an option tag for each collection item", function(){
             var element = compileTemplate($rootScope);

             expect(element.find('option').length).toEqual(vm.collection.length);
         });

         it("should include a blank option if includeBlank is set to true", function(){
             vm.includeBlank = true;
             var element = compileTemplate($rootScope);

             expect(element.find('option').length).toEqual(vm.collection.length + 1);
         });

         it("should execute the onchange event if passed to the directive", function(){
             var onChangeFunction = jasmine.createSpy('onChangeFunction');

             vm.onChange = onChangeFunction;
             $rootScope.vm.model = _.findWhere(vm.collection, {id: 1});
             var element = compileTemplate($rootScope);

             $rootScope.$apply(function() {
                 $rootScope.vm.model = _.findWhere(vm.collection, {id: 2});
             });

             expect(onChangeFunction.callCount).toBe(2);
         });

         it("should select the first option if set to no blank", function(){
             vm.includeBlank = false;
             var element = compileTemplate($rootScope);
             expect($rootScope.vm.model).toBe(_.findWhere(vm.collection, {id: 1}));
         });
     });
}());