angular.module('app').service('mainSrv', function($http){
    this.getFollowing = function() {
        return $http({
            method: 'GET',
            url: '/api/github/following' 
        }).then(function(response){
            this.friends = response.data;
        })
    }

    this.getFriendActivity = function(username) {
        return $http({
            method: 'GET',
            url: '/api/github/' + username + '/activity'
        }).then(function(response){
            this.eventData = response.data;
        })
    }
})