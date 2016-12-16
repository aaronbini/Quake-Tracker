
usgsService.$inject = ['$http'];
export default function usgsService ($http) {
  const url = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
  //would need to fill in max, min lats and longs
  //const url2 = 'http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=&maxlatitude=&min'


  function crunch (data) {
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

  // const places = data.features.map(e => {
  //     let place = e.properties.place.split(' ');
  //     return place[place.length - 1];
  //   });

  // const convertToState = places.map(e => {
  //     let index = abbrevs.indexOf(e);
  //     if (index > -1) {
  //       return states[index];
  //     } else {
  //       return e;
  //     }
  //   });

  // const stateTallies = places.reduce((prev, curr) => {
  //     if (prev[curr]) { return prev[curr]++; }
  //     else { return prev[curr] = 1; }
  //   }, {});

  return {
    get () {

      return $http.get(url)
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
    },

    

  };
};