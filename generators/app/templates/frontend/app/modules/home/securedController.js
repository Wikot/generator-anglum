<%= p.projectCamelcaseName %>.controller("securedController", function ($scope, $auth) {

  $scope.anglum = {
    url   : 'http://wikot.io/anglum',
    title : 'Secured Page on <%= p.projectName %>'
  };

  $scope.message = '<%= p.projectDescription %>.';

});
