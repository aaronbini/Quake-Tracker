//Populate select dropdown
// d3.select('#sidebar select')
//     .selectAll('option')
//     .data(Object.keys(ms))
//     .enter()
//     .append('option')
//     .attr('value', function(d){return d;})
//     .text(function(d){return d;});

//   AWS.config.update({
//     accessKeyId: 'AKIAJTGKJADCAPFZK7TQ',
//     secretAccessKey: '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'
//   });
//   var lambda = new AWS.Lambda({region:'us-east-1'});

// d3.select('.loader').remove();

// function restoreView() {
//   map.flyTo({center:[0,0],zoom:0, pitch:0});
// }

//     //update 'strongest' and 'most reported' lists ('latest' stays the same)

// function updateLists(subset){
//   var lists = [['mag','mag'], ['felt', 'felt it']];

//   d3.selectAll('.updatable')
//             .remove();
//   lists.forEach(function(list){

//             //get the top 3 by each metric
//     quickselect(subset.features,3, null, null, function(a,b){
//       return (b.properties[list[0]]-a.properties[list[0]]);
//     });

//             //sort the top 3
//     var topThree = subset.features.slice(0,3).sort(function(a,b){
//       return (b.properties[list[0]]-a.properties[list[0]]);
//     });


//     var entry = d3.select('.'+list)
//                 .selectAll('.entry')
//                 .data(topThree)
//                 .enter()
//                 .append('div')
//                 .attr('class', 'entry pad1 clearfix updatable')
//                 .on('mouseenter', function(d){
//                   highlightFeature(d);
//                 })
//                 .on('click', function(d){
//                   map.flyTo({center:d.geometry.coordinates, zoom:12, pitch:0});
//                   d3.select('#restore').style('display', 'block');
//                 });

//     entry
//                 .attr('style', function(d){
//                   var coords = d.geometry.coordinates[0]+','+d.geometry.coordinates[1]+',7';
//                   return 'background-image:url(https://api.mapbox.com/v4/mapbox.satellite/'+coords+'/360x80@2x.png?access_token=pk.eyJ1IjoicGV0ZXJxbGl1IiwiYSI6ImpvZmV0UEEifQ._D4bRmVcGfJvo1wjuOpA1g)';
//                 });

//     entry
//                 .append('span')
//                 .attr('class', 'darkback small code pin-topleft')
//                 .html(function(d){return d.properties.place;});

//     entry
//                 .append('div')
//                 .attr('class', 'fr center col2 pad2y pin-right darkback')
//                 .html(function(d,i){return '<h2 style="margin:0px">'+d.properties[list[0]]+'</h2><div class="translucent small">'+list[1]+'</div>';});
//   });
// }

// get the 3 most recent quakes
//     quickselect(fullset.features,3, null, null, function(a,b){
//     return (b.properties.time-a.properties.time);
//     });

// // isolate and sort the 3 most recent quakes
//     var lastThree = fullset.features.slice(0,3).sort(function(a,b){
//     return (b.properties.time-a.properties.time);
//     });

//     var entry = d3.select('.latest')
//     .selectAll('.entry')
//     .data(lastThree)
//     .enter()
//     .append('div')
//     .attr('class', 'entry clearfix')
//     .on('mouseenter', function(d){
//         highlightFeature(d);
//     })
//     .on('mouseleave', function(){
//         removePopup();
//     })
//     .on('click', function(d){
//         map.flyTo({center:d.geometry.coordinates, zoom:14, pitch:0});
//         d3.select('#restore').style('display', 'block');
//     });

//     entry
//     .attr('style', function(d){
//         var coords = d.geometry.coordinates[0]+','+d.geometry.coordinates[1]+',7';
//         return 'background-image:url(https://api.mapbox.com/v4/mapbox.satellite/'+coords+'/360x80@2x.png?access_token=pk.eyJ1IjoicGV0ZXJxbGl1IiwiYSI6ImpvZmV0UEEifQ._D4bRmVcGfJvo1wjuOpA1g)';
//     });

//     entry
//     .append('span')
//     .attr('class', 'darkback small code pin-topleft')
//     .html(function(d){return d.properties.place;});

//     entry
//     .append('div')
//     .attr('class', 'fr center col2 pad2y pin-right darkback')
//     .html(function(d){return '<h2 style="margin:0px">'+expressTime(d.properties.time)[0]+'</h2><div class="translucent small">'+expressTime(d.properties.time)[1]+' ago</div>';});

// // update total tremor count
//     document.querySelector('#odometer')
//     .innerHTML = fullset.features.length;

//     d3.select('select')
//     .on('change', function(){
//         var subset = {
//         'type': 'FeatureCollection',
//         'features': []
//         };
//         var timeframe = this.value;
//         subset.features = fullset.features.filter(function(ft){
//         return ft.properties.time > Date.now() - ms[timeframe];
//         });

//         // update total tremor count
//         document.querySelector('#odometer')
//             .innerHTML = subset.features.length;

//         //update map rendering
//         map.getSource('quakes').setData(subset);

//         updateLists(subset);
//     });

// seismic checkbox functionality
    // d3.select('#sensor')
    //     .on('click', function(){
    //         if (this.checked) map.addClass('stations');
    //         else map.removeClass('stations');
    //     });

    //   var json = JSON.parse(res.Payload);

    //   window.fullset = json;

    //   fullset.features = fullset.features.map(function(ft){
    //     ft.properties.depth = ft.geometry.coordinates[2].toFixed(2);
    //     ft.geometry.coordinates = ft.geometry.coordinates.slice(0,2);
    //     return ft;
    //   });
    //   updateLists(fullset);