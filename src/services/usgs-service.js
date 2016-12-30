
usgsService.$inject = ['$http'];
export default function usgsService ($http) {

  return {
    
    get (time) {
      return $http.get(`http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${time}.geojson`)
        .then(res => res.data);
    },
    
    crunch (data) {
      return data.features.map(e => {
        let place = e.properties.place.split(' ');
        return place[place.length - 1];
      }).map(e => {
        let index = abbrevs.indexOf(e);
        if (index > -1) return states[index]; 
        else return e;
      }).reduce((prev, curr) => {
        if (prev[curr]) { return prev[curr]++; }
        else { return prev[curr] = 1; }
      }, {});
    }

  };
};