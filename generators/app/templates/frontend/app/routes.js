<%= p.projectCamelcaseName %>.config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider){

 $stateProvider
    .state('home',{
      url: '/',
      templateUrl: 'app/modules/home/home.html',
      controller: 'homeController'
    })
    .state('securedPage', {
      url: '/secured',
      templateUrl: 'app/modules/home/secured.html',
      controller: 'securedPageController',
      resolve: {
        authenticated: function($q, $location, $auth) {
          var deferred = $q.defer();
          if (!$auth.isAuthenticated()) {
            $location.path('/login');
          } else {
            deferred.resolve();
          }
          return deferred.promise;
        }
      }
    })
    .state('staticPage', {
      url: '/static',
      templateUrl: 'app/modules/home/static.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/modules/auth/login.html',
      controller: 'loginController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/modules/auth/signup.html',
      controller: 'signupController'
    }).state('recover', {
      url: '/lost-password',
      templateUrl: 'app/modules/auth/lost-password.html',
      controller: 'lostPasswordController'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'app/modules/user/profile.html',
      controller: 'profileController',
      resolve: {
        authenticated: function($q, $location, $auth) {
          var deferred = $q.defer();
          if (!$auth.isAuthenticated()) {
            $location.path('/login');
          } else {
            deferred.resolve();
          }
          return deferred.promise;
        }
      }
    })
    .state('logout', {
      url: '/logout',
      template: null,
      controller: 'LogoutCtrl'
    });

    $locationProvider.html5Mode(true).hashPrefix('!')

    $urlRouterProvider.otherwise('/');

    $authProvider.httpInterceptor = true; // Add Authorization header to HTTP request
    $authProvider.loginOnSignup = true;
    $authProvider.baseUrl = '/api/' // API Base URL for the paths below.
    $authProvider.loginUrl = 'login';

});
