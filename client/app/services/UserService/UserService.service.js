'use strict';

angular.module('quizPortalApp')
  .service('UserService', function (md5, $http) {
    return {
    	Auth: function() {
    		return $http.get('/api/auth');
    	},

    	Me: function(me){
    		this.me = me;
    	},

    	Register: function(data) {
    		data.hash = md5.createHash( data.password );
    		data.password = data.retype_passwprd = null;
    		return $http.post('/api/auth/local/register', data);
    	},

    	LoginLocal: function(data) {
    		return $http.post('/api/auth/local/login', {
    			username: data.email,
    			password: md5.createHash(data.password),
    		});
    	},

        UpdateProfile: function(data){
            return $http.post('/api/user/update', data);
        },

        GetUser: function(id){
            return $http.get('api/user/get/'+id);
        },

        Logout: function() {
            $http.get("/api/auth/Logout");
        }
    }
  });
