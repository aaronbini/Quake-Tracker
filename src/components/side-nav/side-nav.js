import template from './side-nav.html';
import styles from './side-nav.scss';
import stateArrays from '../../states';

export default {
  template,
  bindings: {
    quakes: '=',
    query: '<',
    queryLocation: '<'
  },
  controller
};

controller.$inject = ['usgsService'];
function controller (usgs) {
  this.$onInit = () => {
    this.range = '';
    this.location = '';
    this.states = stateArrays.abbrevs;
    this.dates = ['hour', 'day', 'week', 'month'];
    this.styles = styles;
    console.log(this.quakes);
    console.log(usgs.countQuakes(this.quakes, stateArrays));
    console.log(usgs.topFive(usgs.quakesByState(this.quakes, 'Oregon', stateArrays)));

  };

  this.goToLocation = (location, zoom) => {
    //call parent-level method
    this.queryLocation(location, zoom);
    this.location = '';
  };

  this.callQuery = (range) => {
    //call parent-level method
    this.query(range);
    this.range = '';
  };
  
};