import template from './top-level.html';
import styles from './top-level.scss';
import stateArrays from '../../states.js';
import moment from 'moment';

export default {
  template,
  controller
};

controller.$inject = ['usgsService', '$rootScope', 'mapService'];
function controller (usgs, $rootScope, mapService) {

  this.$onInit = () => {
    this.styles = styles;
    this.errorMessage = null;
    usgs.get('month')
      .then(data => {
        this.quakes = data;
      })
      .catch(() => {
        this.errorMessage = 'Error retrieving USGS Earthquake data.';
      });
  };

  this.queryLocation = (location, zoom) => {
    if (location) {
      mapService.geocode(location)
        .then(geocoded => {
          this.errorMessage = null;
          $rootScope.$broadcast('location', {location: geocoded.features[0].center, zoom});
        })
        .catch(() =>{
          this.errorMessage = 'Error querying location.';
        });
    } else {
      this.errorMessage = null;
      $rootScope.$broadcast('location', {location: [ -125.7, 43.5 ], zoom});
    }
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