'use strict';

angular.module('quizPortalApp')
  .factory('Timer', function ($interval) {
    return {
      Init: function(seconds, callback){
        this.seconds = seconds;
        this.callback = callback;
      },

      Start: function(){
        var that = this;
        this.tick = $interval(function(){
          that.seconds --;
          if(that.seconds == -2){
            $interval.cancel(that.tick);
            that.callback();
          }
        }, 1000);
      },

      Stop: function() {
        $interval.cancel(this.tick);
      }
    };
  });
