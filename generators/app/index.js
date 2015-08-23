'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({

  prompting: function () {
    var done = this.async();

    this.log(
      ' ---------------------------- \n'+
      '| Wikot | ' + chalk.red.bgWhite(' Anglum Generator ') + ' |\n'+
      ' ---------------------------- '
    );

    var prompts = [{
      type    : 'input',
      name    : 'projectName',
      message : 'Your project name',
      default : this.appname, // Default to current folder name
      store   : false
    },{
      type    : 'input',
      name    : 'projectDescription',
      message : 'Your project description',
      default : 'Anglum Generated Project',
      store   : false
    },{
      type    : 'checkbox',
      name    : 'angularDependencies',
      message : 'Confirm your project AngularJS dependencies (installed through bower)',
      choices : [
        {
          name: 'Angulartics + Google Analytics Plugin',
          checked: true,
        },
        {
          name: 'Satellizer',
          checked: true,
        },
        {
          name: 'ng-file-upload',
          checked: true,
        },
        {
          name: 'angular-loading-bar',
          checked: true,
        }
      ],
      store: true
    },{
      type    : 'checkbox',
      name    : 'frontendDependencies',
      message : 'Confirm your project frontend dependencies (installed through bower)',
      choices : [
        {
          name: 'Bootstrap (Recommended. Generated templates use this)',
          checked: true,
        },
        {
          name: 'jQuery',
          checked: false,
        },
        {
          name: 'Animate.css',
          checked: true,
        },
        {
          name: 'Font Awesome',
          checked: false,
        },
        {
          name: 'SocketIO client',
          checked: false,
        }
      ],
      store: true
    },{
      type    : 'text',
      name    : 'googleAnalyticsCode',
      message : 'Insert you Google Analytics Tracking ID',
      default : 'UA-12345678-9',
      when    : function(props){ return ( props.angularDependencies.indexOf('Angulartics + Google Analytics Plugin') >= 0); }
    }];

    this.prompt(prompts, function (props) {

      this.props = props;
      this.props.projectCamelcaseName = _.camelCase(props.projectName);
      this.log(this.props);

      this.props.jsDeps = [];
      this.props.jsInjects = [];
      this.props.bowerOverrides = {};

      if(this.props.angularDependencies.indexOf('Angulartics + Google Analytics Plugin') >= 0){
        this.props.googleAnalytics = true;
        this.props.jsDeps.push('angulartics');
        this.props.jsDeps.push('angulartics-google-analytics');
        this.props.jsInjects.push('angulartics');
        this.props.jsInjects.push('angulartics.google.analytics');
        this.props.bowerOverrides.angulartics = {
          "main": [
            "src/angulartics.js"
          ]
        };
      }

      if(this.props.angularDependencies.indexOf('Satellizer') >= 0){
        this.props.satellizer = true;
        this.props.jsDeps.push('satellizer');
        this.props.jsInjects.push('satellizer');
      }

      if(this.props.angularDependencies.indexOf('ng-file-upload') >= 0){
        this.props.ngFileUpload = true;
        this.props.jsDeps.push('ng-file-upload');
        this.props.jsInjects.push('ng-file-upload');
      }

      if(this.props.angularDependencies.indexOf('angular-loading-bar') >= 0){
        this.props.angularLoadingBar = true;
        this.props.jsDeps.push('angular-loading-bar');
        this.props.jsInjects.push('angular-loading-bar');
        this.props.jsInjects.push('ngAnimate');
      }

      if(this.props.frontendDependencies.indexOf('Bootstrap (Recommended. Generated templates use this)') >= 0){
        this.props.bootstrap = true;
        this.props.jsDeps.push('bootstrap');
        this.props.bowerOverrides.bootstrap = {
          "main": [
            "dist/js/bootstrap.js",
            "dist/css/bootstrap.css",
            "dist/css/bootstrap-theme.css"
          ]
        };
      }

      if(this.props.frontendDependencies.indexOf('jQuery') >= 0){
        this.props.jQuery = true;
        this.props.jsDeps.push('jquery');
      }

      if(this.props.frontendDependencies.indexOf('Animate.css') >= 0){
        this.props.animateCss = true;
        this.props.jsDeps.push('animate.css');
      }

      if(this.props.frontendDependencies.indexOf('Font Awesome') >= 0){
        this.props.fontAwesome = true;
        this.props.jsDeps.push('Font-Awesome');
      }

      if(this.props.frontendDependencies.indexOf('SocketIO client') >= 0){
        this.props.socketIOClient = true;
        this.props.jsDeps.push('socket.io-client');
      }

      this.props.jsInjects = _.uniq(this.props.jsInjects);

      this.props.angularInjects = '"'+this.props.jsInjects.join('","')+'"';

      this.props.bowerOverrides = JSON.stringify(this.props.bowerOverrides);

      this.props.npmDeps = [];

      done();

    }.bind(this));

  },

  writing: {
    app: function () {

      this.fs.copy(
        this.templatePath('lumen/**/*'),
        this.destinationPath('backend/'),
        { p: this.props }
      );
      this.fs.copy(
        this.templatePath('lumen/**/.*'),
        this.destinationPath('backend/'),
        { p: this.props }
      );
      this.fs.copyTpl(
        this.templatePath('frontend/**/*'),
        this.destinationPath('frontend/'),
        { p: this.props }
      );
      this.fs.copyTpl(
        this.templatePath('frontend/**/.*'),
        this.destinationPath('frontend/'),
        { p: this.props }
      );
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { p: this.props }
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        { p: this.props }
      );
      this.fs.copyTpl(
        this.templatePath('_composer.json'),
        this.destinationPath('composer.json'),
        { p: this.props }
      );
      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        { p: this.props }
      );
      this.fs.copy(
        this.templatePath('env.example'),
        this.destinationPath('.env.example'),
        { p: this.props }
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {

    //this.props.npmDeps = ['gulp','bower','wiredep','lodash'];

    this.npmInstall();

    this.props.jsDeps.push('angular','ngAnimate');
    this.bowerInstall(this.props.jsDeps, { 'save': true });
    this.spawnCommand('gulp', ['wiredep']);

    // this.spawnCommand('composer', ['install']);

  },

  end: function (){

    this.config.save();

  }
});
