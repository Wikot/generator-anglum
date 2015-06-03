'use strict';

var <%= p.projectCamelcaseName %> = angular.module("<%= p.projectCamelcaseName %>App",["ngRoute","satellizer","ui.bootstrap", "ngFileUpload", "ngProgress"]);

/**
 *  Main App Controller
 **/

<%= p.projectCamelcaseName %>.controller('<%= p.projectCamelcaseName %>Controller', ['$scope', function ($scope) {

}]);
