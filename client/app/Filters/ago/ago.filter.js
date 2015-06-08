'use strict';

angular.module('quizPortalApp')
  .filter("ago", ['$filter', function($filter){
    return function(then){
        if (then === 0)
            return "";
        var diff = {
            set: function(x){
                this.x = x;
            },
            in: function(a, b){
                if(this.x>a && this.x<b)
                    return true;
                else
                    return false;
            },
            get: function(){
                return this.x;
            }
        };
        var now = new Date().getTime();
        diff.set(Math.round((now - then)/1000));

        if( diff.in(0, 60) )
            return diff.get() + " seconds ago";

        if( diff.in(61, 3600) )
            return Math.round(diff.get()/60) + " minutes ago";

        if( diff.in(3601, 3600*24) )
            return Math.round(diff.get()/3600) + " hours ago";

        if( diff.in(3600*24+1, 3600*24*31) )
            return Math.round(diff.get()/(3600*24)) + " days ago";

        return $filter('date')(then);
    };
}]);
