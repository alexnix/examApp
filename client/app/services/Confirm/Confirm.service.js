'use strict';

angular.module('quizPortalApp')
  .factory('confirm', function ( $window, $q ) {

    function confirm( message ){
      var defer = $q.defer();

      if( $window.confirm(message+"@@@@@@") ){
        defer.resolve(true);
      } else {
        defer.resolve(false);
      }

      return ( defer.promise );
    }

    return ( confirm );

  });
