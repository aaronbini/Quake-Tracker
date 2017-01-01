
usgsService.$inject = ['$http'];
export default function usgsService ($http) {

  return {
    
    get (time) {
      return $http.get(`http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${time}.geojson`)
        .then(res => res.data);
    },
    
    //returns number of quakest that have occurred in or near a location
    countQuakes (data, statesObj) {
      return data.features.map(quake => {
        //split string and extract quake location
        //return array of locations
        let place = quake.properties.place.split(', ');
        return place[place.length - 1];
      }).map(occurred => {
        //if  location was an abbrev, return corresponding full state name
        let index = statesObj.abbrevs.indexOf(occurred);
        if (index > -1) return statesObj.states[index]; 
        else return occurred;
      }).reduce((accumulator, location) => {
        //build accumulator object to tally quakes by location
        //return object with key of location, value of #quakes occurred
        const lower = location.toLowerCase();
        if (accumulator[lower]) { 
          accumulator[lower]++;
          return accumulator; 
        } else { 
          accumulator[lower] = 1;
          return accumulator; 
        }
      }, {});
    },

    quakesByState (data, state, statesObj) {
      return data.features.filter(quake => {
        //lowercase the state
        let lowerState = state.toLowerCase();
        let locationArray = quake.properties.place.split(', ');
        //get location of quake from place property
        let place = locationArray[locationArray.length - 1].toUpperCase();
        let index = statesObj.states.indexOf(place);
        //if it is a full state name set it to the corresponding abbrev
        if (index > -1) {
          place = statesObj.abbrevs[index].toLowerCase();
        } else {
          place = place.toLowerCase();
        }
        //return the quake if it corresponds to the state requested
        return place === lowerState;
      });
    },

    //get top five quakes per location
    topFive (data) {
      data.sort((previous, current) => {
        return current.properties.mag - previous.properties.mag;
      });
      return data.slice(0, 5);
    }

  };
};