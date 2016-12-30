import angular from 'angular';
import components from './components';
import services from './services';
import md from 'angular-material';
import './scss/main.scss';
import 'angular-material/angular-material.css';

const app = angular.module('quakeTracker', [
  components,
  services,
  md
]);

app.constant('mapToken', process.env.MAPBOX_TOKEN || 'pk.eyJ1IjoiYWFyb25iaW5pIiwiYSI6ImNpcHU3ajc2cjA5eGNmbG0yZmh2a2Fud3EifQ.bMYgeUt9yYRmG3Za0B9lSw');

app.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('forest')
    .primaryPalette('teal')
    .accentPalette('deep-orange')
    .backgroundPalette('teal')
    .warnPalette('red');
}]);

angular.bootstrap(document, [app.name]);