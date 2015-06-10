<%= p.projectCamelcaseName %>.controller("homeController", function ($scope, $rootScope, User) {

  $scope.anglum = {
    url   : 'http://wikot.io/anglum',
    title : '<%= p.projectName %>'
  };

  $scope.message = '<%= p.projectDescription %>.';

});
