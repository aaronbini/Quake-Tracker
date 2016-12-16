import template from './map.html';
import styles from './map.scss';
import stateArrays from '../../states.js';
import moment from 'moment';

export default {
  template,
  controller
};

controller.$inject = ['usgsService', 'mapService'];
function controller (usgs, mapService) {
  
  this.styles = styles;
  this.mapStyles = mapService.mapStyles;
  const element = document.getElementById('map');
  const blueColor = 'hsl(204, 40%, 50%)';

  const popup = new mapService.mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });
  
  this.map = new mapService.mapboxgl.Map({
    container: element, // container id
    style: this.mapStyles[3],
    center: [-122.7,45.5], // starting position
    zoom: 5, // starting zoom
    attributionControl: {
      position: 'top-right'
    }
  });

  const emptyGeojson = {
    'type': 'FeatureCollection',
    'features': []
  };

  this.map.on('load', () => {
    usgs.get()
      .then(data => {

        this.map.addSource('quakes', {
          type: 'geojson',
          data: data
        });

        this.map.addSource('hoveredquake', {
          type: 'geojson',
          data: emptyGeojson
        });

        this.map.addLayer({
          'id': 'earthquakes',
          'type': 'circle',
          'source': 'quakes',
          'maxzoom':8,
          'paint': {
            'circle-color': blueColor,
            'circle-opacity': {
              'base': 1.8,
              'stops': [
                [0, 0.1],
                [11, 0.6],
                [20, 1]
              ]
            },
            'circle-radius': {
              'property': 'mag',
              'base': 1.8,
              'stops': [
                [{zoom: 0, value: 2}, 0.25],
                [{zoom: 0, value: 8}, 32],
                [{zoom: 11, value: 2}, 2],
                [{zoom: 11, value: 8}, 2400],
                [{zoom: 20, value: 2}, 5],
                [{zoom: 20, value: 8}, 6000]
              ]
            }
          }
        });

        this.map.addLayer({
          'id': 'smalldot',
          'type': 'circle',
          'source': 'quakes',
          'layout': {
          },
          'paint': {
            'circle-color': 'white',
            'circle-radius': {
              'base': 1.1,
              'stops': [
                [0, 0.6],
                [20, 10]
              ]
            }
          }
        });

        this.map.on('mousemove', (e) => {
          let features = this.map.queryRenderedFeatures(e.point, { layers: ['smalldot'] });
    
          // Change the cursor style as a UI indicator.
          this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

          if (!features.length) {
            popup.remove();
            return;
          }

          let feature = features[0];
          console.log(feature);
          feature.properties.date = moment(feature.properties.time).format('MMMM Do YYYY');
          if (feature.properties.felt == 1) {
            feature.properties.felt = '1 person.';
          } else if (feature.properties.felt > 1) {
            feature.properties.felt = `${feature.properties.felt} people.`;
          } else {
            feature.properties.felt = '0 people.';
          }

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup.setLngLat(feature.geometry.coordinates)
              .setHTML(`<div class="popup-container">
                          <div class="popup">
                            <h3>Location: ${feature.properties.place}</h3>
                            <ul>
                              <li>Magnitude: ${feature.properties.mag}</li>
                              <li>Date Occurred: ${feature.properties.date}</li>
                              <li>Felt By: ${feature.properties.felt}</li>
                            </ul>
                          </div>
                        </div>`
                      )
              .addTo(this.map);
        });

      })
      .catch(err => console.log(err));

  });
  
};

// function highlightFeature (feature) {
//     var coords = feature.geometry.coordinates.map(function(num){
//       if (num>180) return num%180;
//       else return num;
//     });
//     var hovered = {
//       'type': 'FeatureCollection',
//       'features': [
//         {
//           'type': 'Feature',
//           'properties': feature.properties,
//           'geometry': {type:'Point', coordinates: coords}
//         }
//       ]
//     };

//       // when hovering over tremors
//     if (!feature.layer || feature.layer.id === 'smalldot'){
//       map.getSource('hoveredquake').setData(hovered);

//       var reports = feature.properties.felt === 1 ? '1 report' : feature.properties.felt + ' reports';

//       coords[0] = coords[0]<0 ? coords[0]+360 : coords[0];
//       popup
//           .setLngLat(coords)
//               .setHTML('<h2 class="fl mag">'+feature.properties.mag.toFixed(1)+'</h2>'+feature.properties.place+'<br><span class="italic block translucent">'+feature.properties.depth+' km depth ('+ expressTime(feature.properties.time)[0]+' '+expressTime(feature.properties.time)[1]+' ago)</span>')
//               .addTo(map);
//     }
//   }