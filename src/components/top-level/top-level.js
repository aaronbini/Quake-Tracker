import template from './top-level.html';
import stateArrays from '../../states.js';
import moment from 'moment';

export default {
  template,
  controller
};

controller.$inject = ['usgsService', '$rootScope'];
function controller (usgs, $rootScope) {

  this.$onInit = () => {
    usgs.get('month')
      .then(data => {
        this.quakes = data;
      })
      .catch(err => {
        this.errorMessage = err.message || 'Error retrieving USGS Earthquake data.';
      });
  };

  this.queryNewRange = (range) => {
    usgs.get(range)
      .then(data => {
        this.quakes = data;
        console.log(this.quakes);
        $rootScope.$broadcast('query', {quakes: this.quakes});
      })
      .catch(err => {
        this.errorMessage = err.message || 'Error retrieving USGS Earthquake data.';
      });
  };

};