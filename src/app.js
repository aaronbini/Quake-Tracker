import angular from 'angular';
import components from './components';
import services from './services';

const app = angular.module('quakeTracker', [
  components,
  services
]);

angular.bootstrap(document, [app.name]);