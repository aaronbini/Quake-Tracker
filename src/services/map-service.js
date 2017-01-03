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

  function geocode (location) {
    return $http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?&access_token=${mapToken}`)
      .then(res => res.data);
  }

  //unused for now but will incorporate later
  function calculateDistance(lat1,lon1,lat2,lon2) {
    const radius = 6371; // Radius of the earth in km
    const dLat = deg2rad( lat2 - lat1 );  // deg2rad below
    const dLon = deg2rad( lon2 - lon1 ); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = radius * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * ( Math.PI / 180 );
  }

  return {
    mapboxgl,
    mapStyles,
    geocode,
    calculateDistance
  };
};