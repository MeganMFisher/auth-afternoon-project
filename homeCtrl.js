angular.module('app').controller('homeCtrl', function($scope, mainSrv, $stateParams){
   
            $scope.friends = mainSrv.friends;

            $scope.getFriendActivity($stateParams.username).then(function(response){
                $scope.friend = response;
            })
            
            $scope.eventData = mainSrv.eventData;
})