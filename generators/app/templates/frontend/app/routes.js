<%= p.projectCamelcaseName %>.config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider){

 $stateProvider
    .state('home',{
      url: '/',
      templateUrl: 'app/modules/home/home.template.html',
      controller: 'homeController'
    })
    .state('securedPage', {
      url: '/secured',
      templateUrl: 'app/modules/home/secured.template.html',
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
      templateUrl: 'app/modules/home/static.template.html',
      controller: 'staticPageCtrl'
    })/*
    .state('login', {
      url: '/login',
      templateUrl: 'app/modules/auth/login.html',
      controller: 'LoginCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/modules/auth/signup.html',
      controller: 'SignupCtrl'
    })
    .state('logout', {
      url: '/logout',
      template: null,
      controller: 'LogoutCtrl'
    })*/;

    $locationProvider.html5Mode(true).hashPrefix('!')

    $urlRouterProvider.otherwise('/');

    $authProvider.httpInterceptor = true; // Add Authorization header to HTTP request
    $authProvider.loginOnSignup = true;
    $authProvider.baseUrl = '/api/' // API Base URL for the paths below.
    $authProvider.loginUrl = 'login';

});
