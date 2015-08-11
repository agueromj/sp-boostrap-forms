(function () {
    angular.module('sp.bootstrapForms')
        .directive('abfFile', ['MODULE_ROOT_PATH', 'Upload', abfFile]);

    function abfFile(MODULE_ROOT_PATH, Upload) {
        return {
            restrict: 'EA',
            require: ['ngModel', '?^form'],
            scope: {
                ngModel: '=',
                label: '@',
                name: '@',
                placeholder: '@',
                uploadUrl: '@',
                objId: '@',
                imgThumb: '@'
            },
            replace: true, //this will only work if the template returns one element
            templateUrl: 'file.html',
            link: function (scope, el, attr, ctrls) {
                var formCtrl = ctrls[1];
                scope.errMsgPath = 'errorMessages.html';
                scope.ctrl = ctrls[0];
                scope.formCtrl = formCtrl;

                scope.$watch('ngModel', function (newVal) {
                    //this means we already have an uploaded image
                    if(newVal)
                        scope.upload(newVal);
                });

                scope.upload = function (files) {
                    if (files && files.length) {
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            Upload.upload({
                                url: scope.uploadUrl,
                                method: 'POST',
                                fields: {'id': scope.objId},
                                file: file,
                                fileFormDataName: scope.name
                            }).progress(function (evt) {
                                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                            }).success(function (data, status, headers, config) {
                                scope.imgThumb = data.photo_url_thumb;
                                console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                            }).error(function (data, status, headers, config) {
                                console.log('error status: ' + status);
                            })
                        }
                    }
                };
            }
        }
    }
}());