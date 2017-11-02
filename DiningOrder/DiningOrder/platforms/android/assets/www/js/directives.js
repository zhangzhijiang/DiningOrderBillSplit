
angular.module("diningorder.directives", [])
    .directive("doDecimalNumber", ['$filter', function ($filter) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelController) {

                ngModelController.$parsers.push(function (data) {
                    //console.log("Parser push called. Convert Data from view to Model, Data is " + data);
                    //convert data from view format to model format
                    var parsed = parseFloat(data);
                    //console.log("Parser push called. Convert Data from view to Model, parsed is " + data);
                    return !isNaN(parsed) ? parsed : 0;

                });

                ngModelController.$formatters.push(function (data) {
                   // console.log("Formatter push called. Convert Data from Model to view, Data is " + data);
                   // console.log("Formatter push called. Convert Data from Model to View,  $filter('number')(data, 2) is " + $filter('number')(data, 2));
                    //convert data from model format to view format
                    var formatted = $filter('number')(ngModelController.$modelValue, 2);
                    element.val(formatted);
                    return formatted;

                });

                element.bind('focus', function () {
                    var formatted = $filter('number')(ngModelController.$modelValue, 2);
                    element.val(formatted);
                });


                element.bind('blur', function () {
                    // Apply formatting on the stored model value for display
                    var formatted = $filter('number')(ngModelController.$modelValue, 2);
                    element.val(formatted);
                });

            }
        };
    }])

.directive('doSelectOnClick', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                this.select();
            });
        }
    };
})

.directive('doValidDecimalNumber', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }
                var clean = val.replace(/[^0-9\.]/g, '');
                var decimalCheck = clean.split('.');

                if (!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0, 2);
                    clean = decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});