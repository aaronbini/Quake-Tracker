import template from './map.html';
import styles from './map.scss';
import moment from 'moment';
import layers from '../../layers';

export default {
  template,
  bindings: {
    quakes: '='
  },
  controller
};

controller.$inject = ['mapService', '$rootScope'];
function controller (mapService, $rootScope) {
  
  this.styles = styles;
  this.mapStyles = mapService.mapStyles;
  const element = document.getElementById('map');

  const popup = new mapService.mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  mapService.geocode('Vancouver, WA')
    .then(location => console.log('geocoded: ', location.features[0].center));
  
  this.map = new mapService.mapboxgl.Map({
    container: element,
    style: this.mapStyles[1],
    center: [ -125.7, 43.5 ],
    zoom: 5,
    attributionControl: {
      position: 'top-right'
    }
  });

  const emptyGeojson = {
    'type': 'FeatureCollection',
    'features': []
  };

  this.map.on('load', () => {

    this.map.addSource('quakes', {
      type: 'geojson',
      data: this.quakes
    });

    this.map.addSource('hoveredquake', {
      type: 'geojson',
      data: emptyGeojson
    });

    this.map.addLayer(layers.earthquakes);

    this.map.addLayer(layers.highlighted_blur);

    this.map.addLayer(layers.smalldot);

    //current hacky solution to update the map quakes
    $rootScope.$on('query', (e, data) => {
      this.map.removeSource('quakes').addSource('quakes', {
        type: 'geojson',
        data: data.quakes
      });
    });

    $rootScope.$on('location', (e, data) => {
      this.map.flyTo({
        center: data.location,
        zoom: data.zoom,
        speed: 0.9,
        curve: 1,
        easing(t) {
          return t;
        }
      });
      // this.map.setCenter(data.location);
      // this.map.setZoom(8);
    });

    this.map.on('mousemove', (e) => {

      let features = this.map.queryRenderedFeatures(e.point, { layers: ['smalldot'] });
      
      this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

      if (!features.length) {
        popup.remove();
        this.map.getSource('hoveredquake').setData(emptyGeojson);
        return;
      }

      let feature = features[0];
      feature.properties.date = moment(feature.properties.time).format('MMMM Do YYYY');
      if (feature.properties.felt == 1) {
        feature.properties.felt = '1 person.';
      } else if (feature.properties.felt > 1) {
        feature.properties.felt = `${feature.properties.felt} people.`;
      } else {
        feature.properties.felt = '0 people.';
      }

      popup.setLngLat(feature.geometry.coordinates)
          .setHTML(`<div class="popup">
                      <h3>Location: ${feature.properties.place}</h3>
                      <ul>
                        <li>Magnitude: ${feature.properties.mag}</li>
                        <li>Date Occurred: ${feature.properties.date}</li>
                        <li>Felt By: ${feature.properties.felt}</li>
                      </ul>
                    </div>`
                  )
          .addTo(this.map);
    });

  });
  
};