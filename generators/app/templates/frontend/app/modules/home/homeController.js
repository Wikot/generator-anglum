<%= p.projectCamelcaseName %>.controller("homeController", function ($scope, $auth) {

  $scope.anglum = {
    url   : 'http://wikot.io/anglum',
    title : '<%= p.projectName %>'
  };

  $scope.message = '<%= p.projectDescription %>.';

});
