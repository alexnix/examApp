'use strict';

angular.module('quizPortalApp')
  .factory('Timer', function ($interval, $rootScope) {
    return {
      Init: function(seconds, callback){
        this.seconds = seconds;
        this.callback = callback;
      },

      Start: function(){
        var that = this;
        this.tick = $interval(function(){
          if(that.seconds == 1){
            that.Stop();
          }
          that.seconds --;

        }, 1000);
      },

      getSeconds: function(){
        return this.seconds;
      },

      Stop: function() {
        $interval.cancel(this.tick);
        this.callback();
      },

      Cancel: function(){
        $interval.cancel(this.tick);
      },

      Ticker: function(){
        return this;
      }
    };
  });
