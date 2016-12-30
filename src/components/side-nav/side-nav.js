import template from './side-nav.html';
import styles from './side-nav.scss';
import stateArrays from '../../states';

export default {
  template,
  bindings: {
    quakes: '=',
    query: '<'
  },
  controller
};

function controller () {
  this.range = '';
  this.dates = ['hour', 'day', 'week', 'month'];
  this.styles = styles;
  this.$onInit = () => {
  };

  this.callQuery = (range) => {
    this.query(range);
  };
  
};