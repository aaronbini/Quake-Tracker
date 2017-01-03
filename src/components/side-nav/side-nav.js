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

controller.$inject = ['usgsService', '$rootScope'];
function controller (usgs, $rootScope) {
  
  this.$onInit = () => {
    this.range = 'month';
    this.location = '';
    this.state = 'OR';
    this.fullState = 'Oregon';
    this.states = stateArrays.abbrevs;
    this.dates = ['hour', 'day', 'week', 'month'];
    this.traveled = false;
    this.styles = styles;
    this.stateQuakes = usgs.quakesByState(this.quakes, this.state, stateArrays);
    this.topFive = usgs.topFive(usgs.quakesByState(this.quakes, this.state, stateArrays));
  };

  this.updateState = (abbrev, quakes) => {
    this.stateQuakes = usgs.quakesByState(quakes, this.state, stateArrays);
    this.topFive = usgs.topFive(usgs.quakesByState(quakes, this.state, stateArrays));
    let index = stateArrays.abbrevs.findIndex(state => state === abbrev);
    this.fullState = stateArrays.states[index];
  };

  this.goToLocation = (location, zoom) => {
    //call parent-level method
    console.log('go to location');
    this.queryLocation(location, zoom);
    this.location = '';
    this.traveled = !this.traveled;
  };

  this.callQuery = (range) => {
    //call parent-level method
    this.query(range);
  };
    
  //current hacky solution to update the state quakes
  $rootScope.$on('query', (e, data) => {
    this.updateState(this.state, data.quakes);
  });
  
};