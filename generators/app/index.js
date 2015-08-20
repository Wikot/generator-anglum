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
          name: 'ngProgress',
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
          checked: true,
        },
        {
          name: 'Animate.css',
          checked: true,
        },
        {
          name: 'Font Awesome',
          checked: true,
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

      if(this.props.angularDependencies.indexOf('Angulartics + Google Analytics Plugin') >= 0){
        this.props.googleAnalytics = true;
        this.props.jsDeps.push('angulartics');
        this.props.jsDeps.push('angulartics-google-analytics');
      }

      if(this.props.angularDependencies.indexOf('Satellizer') >= 0){
        this.props.jsDeps.push('satellizer');
      }

      if(this.props.angularDependencies.indexOf('ng-file-upload') >= 0){
        this.props.jsDeps.push('ng-file-upload');
      }

      if(this.props.angularDependencies.indexOf('ngProgress') >= 0){
        this.props.jsDeps.push('ngprogress');
      }

      if(this.props.frontendDependencies.indexOf('Bootstrap (Recommended. Generated templates use this)') >= 0){
        this.props.jsDeps.push('bootstrap');
      }

      if(this.props.frontendDependencies.indexOf('jQuery') >= 0){
        this.props.jsDeps.push('jquery');
      }

      if(this.props.frontendDependencies.indexOf('Animate.css') >= 0){
        this.props.jsDeps.push('animate.css');
      }

      if(this.props.frontendDependencies.indexOf('Font Awesome') >= 0){
        this.props.jsDeps.push('Font-Awesome');
      }

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

    this.props.jsDeps.push('angular');
    this.bowerInstall(this.props.jsDeps, { 'save': true });
    // this.spawnCommand('composer', ['install']);

  },

  end: function (){

  }
});
