'use strict';

/**
 * @ngdoc service
 * @name ArrebolApp.jobs
 * @description
 * # jobs
 * Factory in the ArrebolApp.
 */
angular.module('ArrebolApp')
  .factory('jobs', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  }
  );

angular.module('ArrebolServices').service(
  'Session',
  function () {
    var session = {};
    session.user = {
      name: undefined,
      login: undefined,
      pass: undefined,
      token: undefined
    };

    if (window.sessionStorage.user) {
      if (JSON.parse(window.sessionStorage.user).login !== undefined) {
        session.user = JSON.parse(window.sessionStorage.user);
      }
    } else {
      window.sessionStorage.user = JSON.stringify(session.user);
    }

    if (JSON.parse(window.sessionStorage.user).login === undefined) {
      window.sessionStorage.user = JSON.stringify(session.user);
    } else {
      session.user = JSON.parse(window.sessionStorage.user);
    }

    session.createTokenSession = function (userName, userToken) {
      console.log('Creating Token Session');
      session.user = {
        name: userName,
        token: userToken
      };
      window.sessionStorage.user = JSON.stringify(session.user);
    };
    session.createBasicSession = function (userName, login, pass) {
      console.log('Creating Basic Session');
      session.user = {
        name: userName,
        login: login,
        pass: pass
      };
      window.sessionStorage.user = JSON.stringify(session.user);
    };
    session.destroy = function () {
      session.user = {
        name: undefined,
        login: undefined,
        pass: undefined,
        token: undefined
      };
      window.sessionStorage.user = JSON.stringify(session.user);
    };
    session.getUser = function () {
      return JSON.parse(window.sessionStorage.user);
    };
    return session;
  }
);

angular.module('ArrebolServices').service(
  'NonceService',
  function ($http, appConfig) {
    var nonceServ = {};

    var resourceNonceUrl = appConfig.host + appConfig.nonceEndpoint;

    nonceServ.getNonce = function (callbackSuccess, callbackError) {
      var successCallback = function (response) {
        callbackSuccess(response.data);
      };
      $http
        .get(resourceNonceUrl)
        .then(successCallback, callbackError);
    };

    return nonceServ;
  }
);

angular.module('ArrebolServices').service(
  'AuthenticationService',
  function ($http, appConfig, NonceService, Session) {
    var authServ = {};

    var resourceAuthUrl = appConfig.host + appConfig.userEndpoint;

    authServ.checkUser = function () {
      var user = Session.getUser();
      if (user.pass === undefined && user.token === undefined) {
        return false;
      } else {
        return true;
      }
    };

    authServ.getUsername = function () {
      var user = Session.getUser();
      return user.name;
    }

    authServ.basicSessionLogin = function (userLogin, password, callbackSuccess, callbackError) {
      var userName = userLogin; //For now user name is the login.
      Session.createBasicSession(userName, userLogin, password);

      var loginSuccessHandler = function (response) {
        callbackSuccess(response);
      };
      var loginErrorHandler = function (error) {
        Session.destroy();
        callbackError(error);
      };

      var nonceCallback = function (nonce) {
        var cred = {
          username: userLogin,
          password: password,
          nonce: nonce
        };
        var data = {
          'X-auth-credentials': angular.toJson(cred)
        };
        $http.post(
          resourceAuthUrl,
          $.param(data)
        ).then(loginSuccessHandler, loginErrorHandler);
      };
      NonceService.getNonce(nonceCallback, loginErrorHandler);
    };

    authServ.doLogout = function () {
      Session.destroy();
    };

    return authServ;
  }
);

angular.module('ArrebolServices').service(
  'TasksService',
  function ($http, appConfig, NonceService, Session) {
    var tasksService = {};

    var resourceJobUrl = appConfig.host + appConfig.jobEndpoint;

    tasksService.getTasksList = function (callbackSuccess, callbackError) {
      var nonceCallback = function (nonce) {
        var successCallback = function (response) {
          callbackSuccess(response.data);
        };

        var user = Session.getUser();
        var creds = {
          username: user.name,
          password: user.pass,
          nonce: nonce
        }
        $http.get(
          resourceJobUrl,
          { headers: { 'X-auth-credentials': JSON.stringify(creds) } }
        ).then(
          successCallback,
          callbackError
          );
      }
      NonceService.getNonce(nonceCallback, callbackError);
    };

    tasksService.getTask = function(jobId, callbackSuccess, callbackError) {
      var nonceCallback = function (nonce) {
        var successCallback = function (response) {
          callbackSuccess(response.data);
        };

        var user = Session.getUser();
        var creds = {
          username: user.name,
          password: user.pass,
          nonce: nonce
        }
        $http.get(
          resourceJobUrl + '/' + jobId,
          { headers: { 'X-auth-credentials': JSON.stringify(creds) } }
        ).then(
          successCallback,
          callbackError
          );
      }
      NonceService.getNonce(nonceCallback, callbackError);
    }

    tasksService.uploadFile = function (jdffile, callbackSuccess, callbackError) {
      var nonceCallback = function (nonce) {
        var user = Session.getUser();
        var creds = {
          username: user.name,
          password: user.pass,
          nonce: nonce
        }

        var form = new FormData();
        form.append('jdffilepath', jdffile);
        form.append('X-auth-credentials', angular.toJson(creds));

        $http.post(
          resourceJobUrl,
          form,
          {
            headers: {
              'Content-type': undefined
            }
          }
        ).then(
          callbackSuccess,
          callbackError
          );
      }
      NonceService.getNonce(nonceCallback, callbackError);
    };

    return tasksService;
  }
);
