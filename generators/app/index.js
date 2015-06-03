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
      store   : true
    },{
      type    : 'input',
      name    : 'projectDescription',
      message : 'your project Description',
      default : 'Anglum Generated Project',
      store   : true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.projectCamelcaseName = _.camelCase(props.projectName);
      // To access props later use this.props.someOption;
      this.log(this.props);
      done();
    }.bind(this));
  },

  writing: {
    app: function () {

      this.fs.copy(
        this.templatePath('lumen/**/*'),
        this.destinationPath('backend/')
      );
      this.fs.copy(
        this.templatePath('lumen/**/.*'),
        this.destinationPath('backend/')
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
        this.destinationPath('package.json')
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
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('env.example'),
        this.destinationPath('.env.example')
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
    this.installDependencies();
    this.spawnCommand('composer', ['install']);
  },

  end: function (){

  }
});
