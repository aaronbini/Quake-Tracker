import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

export default function mapService () {
  
  const mapStyles = [
    'mapbox://styles/mapbox/streets-v9',
    'mapbox://styles/mapbox/outdoors-v9',
    'mapbox://styles/mapbox/light-v9',
    'mapbox://styles/mapbox/dark-v9',
    'mapbox://styles/mapbox/satellite-v9',
    'mapbox://styles/mapbox/satellite-streets-v9'
  ];

  mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyb25iaW5pIiwiYSI6ImNpcHU3ajc2cjA5eGNmbG0yZmh2a2Fud3EifQ.bMYgeUt9yYRmG3Za0B9lSw';

  // function addSource () {

  // }

  return {
    mapboxgl,
    mapStyles,

  };
};