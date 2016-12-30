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

app.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('deep-orange')
    .backgroundPalette('teal')
    .warnPalette('red');
}]);

angular.bootstrap(document, [app.name]);