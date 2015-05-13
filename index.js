(function(){
    var basePath = 'src/shared/sp-boostrap-forms/';
    var app = angular.module('sp.bootstrapForms', ['ui.bootstrap']);
    app.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }]);
    app.constant('MODULE_ROOT_PATH', basePath);
    app.config(['$provide', Decorate]);

    //we can use this function to load template overrides for the ui.boostrap templates
    function Decorate($provide) {
        $provide.decorator('timepickerDirective', function($delegate) {
            var directive = $delegate[0];
            directive.templateUrl = basePath + 'templates/bootstrap_overrides/simple_timepicker.html';
            return $delegate;
        });
    }
}());