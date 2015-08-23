'use strict';

var <%= p.projectCamelcaseName %> = angular.module("<%= p.projectCamelcaseName %>App",[<%- p.angularInjects %>]);

/**
 *  Main App Controller
 **/

<%= p.projectCamelcaseName %>.controller('<%= p.projectCamelcaseName %>Controller', ['$scope', '$log', function ($scope, $log) {

}]);
