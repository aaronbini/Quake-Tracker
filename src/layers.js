export default {
  earthquakes: {
    'id': 'earthquakes',
    'type': 'circle',
    'source': 'quakes',
    'maxzoom':8,
    'paint': {
      'circle-color': 'red',
      'circle-opacity': {
        'base': 1.8,
        'stops': [
          [0, 0.3],
          [11, 0.6],
          [20, 1]
        ]
      },
      'circle-radius': {
        'property': 'mag',
        'base': 1.8,
        'stops': [
          [{zoom: 0, value: 2}, 0.25],
          [{zoom: 0, value: 8}, 16],
          [{zoom: 11, value: 2}, 2],
          [{zoom: 11, value: 8}, 1200],
          [{zoom: 20, value: 2}, 5],
          [{zoom: 20, value: 8}, 3000]
        ]
      }
    }
  },
  highlighted_blur: {
    'id': 'highlighted_blur',
    'type': 'circle',
    'source': 'hoveredquake',
    'maxzoom':8,
    'layout': {
    },
    'paint': {
      'circle-color': 'crimson',
      'circle-opacity': 1,
      'circle-radius': {
        'property': 'mag',
        'base': 1.8,
        'stops': [
          [{zoom: 0, value: 2}, 0.25],
          [{zoom: 0, value: 8}, 18],
          [{zoom: 11, value: 2}, 2],
          [{zoom: 11, value: 8}, 1400],
          [{zoom: 20, value: 2}, 5],
          [{zoom: 20, value: 8}, 3200]
        ]
      },
      'circle-blur': 0.8
    }
  },
  smalldot: {
    'id': 'smalldot',
    'type': 'circle',
    'source': 'quakes',
    'layout': {
    },
    'paint': {
      'circle-color': 'maroon',
      'circle-radius': {
        'base': 1.1,
        'stops': [
          [0, 0.6],
          [20, 10]
        ]
      }
    }
  }
};