<%= p.projectCamelcaseName %>.controller('loginCtrl', function($scope, $alert, $auth) {

    $scope.login = function() {
      $auth.login({ email: $scope.email, password: $scope.password }, '/')
        .then(function() {
          $alert({
            content: 'Has ingresado exitósamente',
            animation: 'fadeZoomFadeDown',
            duration: 3,
            type: 'success',
            container: '#global-alerts'
          });
        })
        .catch(function(response) {
          $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'danger',
            container: '#login-message'
          });
        });
    };

  });
