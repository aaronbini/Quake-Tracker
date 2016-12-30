import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

mapService.$inject = ['$http', 'mapToken'];
export default function mapService ($http, mapToken) {
  
  const mapStyles = [
    'mapbox://styles/mapbox/streets-v9',
    'mapbox://styles/mapbox/outdoors-v9',
    'mapbox://styles/mapbox/light-v9',
    'mapbox://styles/mapbox/dark-v9',
    'mapbox://styles/mapbox/satellite-v9',
    'mapbox://styles/mapbox/satellite-streets-v9'
  ];

  mapboxgl.accessToken = mapToken;

  // const geocodingURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

  //https://api.mapbox.com/geocoding/v5/mapbox.places/Chester.json?country=us&access_token=pk.my-token-value

  function geocode (location) {
    return $http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=us&access_token=${mapToken}`)
      .then(res => res.data);
  }

  return {
    mapboxgl,
    mapStyles,
    geocode
  };
};