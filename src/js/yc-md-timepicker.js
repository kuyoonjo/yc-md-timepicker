angular.module('yc.md.timepicker', [])
    .directive('ycMdTimepicker', function () {
        return {
            restrict: 'E',
            transclude: true,
            require: 'ngModel',
            scope: {
                ngModel: '=ngModel',
                ctrl: '=ctrl',
                showMeridian: '=showMeridian',
                meridian: '=meridian'
            },
            controller: function ($scope) {
                $scope.ctrl = this;
                if(!$scope.ngModel)
                    $scope.ngModel = new Date();
                    
                console.log($scope.ngModel);
                
                $scope.$watch('ngModel', function () {
                    if(!$scope.ngModel)
                        return;
                    if($scope.showMeridian) {
                        $scope.meridians = $scope.meridian || ['AM', 'PM'];
                            
                        var hours = $scope.ngModel.getHours();
                        if(hours > 12) {
                            $scope.ctrl.hours = hours - 12;
                            $scope.ctrl.meridian = $scope.meridians[1];
                        } else if(hours == 0) {
                            $scope.ctrl.hours = 12;
                            $scope.ctrl.meridian = $scope.meridians[0];
                        } else {
                            $scope.ctrl.hours = hours;
                            $scope.ctrl.meridian = $scope.meridians[0];
                        }
                    } else {
                        $scope.ctrl.hours = $scope.ngModel.getHours();
                    }
                    $scope.ctrl.minutes = $scope.ngModel.getMinutes();
                });    
                function check(ctrl) {
                    if($scope.showMeridian) {
                        return ctrl.hours >= 1 && ctrl.hours <= 12 && ctrl.minutes >= 0 && ctrl.minutes <= 59;
                    }
                    return ctrl.hours >= 0 && ctrl.hours <= 23 && ctrl.minutes >= 0 && ctrl.minutes <= 59;
                }
                
                this.swithMeridian = function () {
                    if($scope.ctrl.meridian == $scope.meridians[0])
                        $scope.ctrl.meridian = $scope.meridians[1];
                    else
                        $scope.ctrl.meridian = $scope.meridians[0]    
                };
                    
                $scope.$watch('ctrl', function (ctrl) {
                    if(!$scope.ngModel)
                        return;
                    if(check(ctrl))
                        if($scope.showMeridian) {
                            var hours = ctrl.hours;
                            if(hours == 12)
                                hours -= 12;
                            if(ctrl.meridian == $scope.meridians[1])
                                hours += 12;
                            $scope.ngModel.setHours(hours, ctrl.minutes);
                        } else {
                            $scope.ngModel.setHours(ctrl.hours, ctrl.minutes);
                        }
                }, true);
                
            },
            template: '<ng-transclude></ng-transclude>'
        };
    });