
var mouseRadius = 15;
//refactor this code using moment possibly
function expressTime(time){
  var msElapsed = Date.now() - time;
  if (msElapsed<60000*1.5) return [(msElapsed/1000).toFixed(0), 'sec'];
  if (msElapsed<3600000*1.5) return [(msElapsed/60000).toFixed(0), 'min'];
  if (msElapsed<86400000*1.5) return [(msElapsed/3600000).toFixed(0), 'hrs'];
  else return [(msElapsed/86400000).toFixed(0), 'days'];
}

//given a geojson feature, highlight it on the map and draw a popup
function highlightFeature (feature) {
  var coords = feature.geometry.coordinates.map(function(num){
    if (num>180) return num%180;
    else return num;
  });
  var hovered = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': feature.properties,
        'geometry': {type:'Point', coordinates: coords}
      }
    ]
  };

    // when hovering over tremors
  if (!feature.layer || feature.layer.id === 'smalldot'){
    map.getSource('hoveredquake').setData(hovered);

    var reports = feature.properties.felt === 1 ? '1 report' : feature.properties.felt + ' reports';

    coords[0] = coords[0]<0 ? coords[0]+360 : coords[0];
    popup
        .setLngLat(coords)
            .setHTML('<h2 class="fl mag">'+feature.properties.mag.toFixed(1)+'</h2>'+feature.properties.place+'<br><span class="italic block translucent">'+feature.properties.depth+' km depth ('+ expressTime(feature.properties.time)[0]+' '+expressTime(feature.properties.time)[1]+' ago)</span>')
            .addTo(map);
  }
}

function removePopup(){
  popup.remove();
}

var ms = {'month':2678400000000, 'week':604800000, 'day':86400000};

var emptyGeojson = {
  'type': 'FeatureCollection',
  'features': []
};

var feed = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';

map.on('load', function(err, res){
  map.addLayer({
    'id': 'blur',
    'type': 'circle',
    'source': 'quakes',
    'maxzoom':8,
    'paint': {
      'circle-color': blueColour,
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
      },
      'circle-blur': {
        'base': 1.8,
        'property': 'mag',
        'stops': [
          [0, 1],
          [8, 0.6]
        ]
      }
    },
  //   'paint.stations':{
  //     'circle-color':'#666'
  //   }
  })
      .addLayer({
        'id': 'highlighted_blur',
        'type': 'circle',
        'source': 'hoveredquake',
        'maxzoom':8,
        'layout': {
        },
        'paint': {
          'circle-color': 'orange',
          'circle-opacity': 1,
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
          },
          'circle-blur': 0.8
        }
      })
      .addLayer({
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
        },
      //   'paint.stations':{
      //     'circle-color':'#ccc'
      //   }
      });

  // map.setPaintProperty('stations', 'text-opacity', 1, 'stations');

  console.log('loaded');
  
  var mouseRadius = 15;

  map.on('mousemove', function(e) {

    var targetLayer = 'smalldot';
    var feature = map.queryRenderedFeatures([[e.point.x-mouseRadius,e.point.y-mouseRadius],[e.point.x+mouseRadius,e.point.y+mouseRadius]], {layers:[targetLayer]})[0];
    console.log(feature);
    if (feature) map.getCanvas().style.cursor = 'pointer';
    else {
      map.getCanvas().style.cursor = 'pointer';
      removePopup();
      map.getSource('hoveredquake').setData(emptyGeojson);
      return;
    }

    highlightFeature(feature);
  })
      .on('click', function(e){
        console.log('clicked');
        console.log('earthquake: ', e);
        var feature = map.queryRenderedFeatures([[e.point.x-mouseRadius,e.point.y-mouseRadius],[e.point.x+mouseRadius,e.point.y+mouseRadius]], {layers:['smalldot']})[0];
        map.flyTo({center:feature.geometry.coordinates,zoom:6, pitch:0});
      //   d3.select('#restore').style('display', 'block');
      });

});

//disable scrollzoom in iframe
// if (window.location.search.indexOf('embed') !== -1) {
//   map.scrollZoom.disable();
//   map.addControl(new mapboxgl.Navigation());
// }

// var popup = new mapboxgl.Popup({
//   closeButton: false,
//   closeOnClick: false
// });

// var blueColour = 'hsl(204, 40%, 50%)';
