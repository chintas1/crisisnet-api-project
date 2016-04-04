app = {};

// Google Map API //
$(function(){
      // In the following example, markers appear when the user clicks on the map.
      // Each marker is labeled with a single alphabetical character.
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var labelIndex = 0;

      function initialize() {
        var initial = { lat: 40.70601833122571, lng: -74.01394844055176 };
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 5,
          center: initial
        });

        // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function(event) {
          var lat = event.latLng.lat();
          var long = event.latLng.lng(); 
          var mark = new app.marker.model.new (lat, long, addMarker(event.latLng, map));
          var region = new app.region.model.new(mark);
          // content, source, createdAt, region
          app.event.controller.adapter.getBy(mark.lat, mark.long, region).then(function(){
            app.region.controller.render(region);
          })
        });

        // Add a marker at the center of the map.
      }

      // Adds a marker to the map.
      function addMarker(location, map) {
        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        var marker = new google.maps.Marker({
          position: location,
          label: labels[labelIndex++ % labels.length],
          map: map
        });

        var cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: location,
          radius: 500000
        });

        return marker;
      }

      google.maps.event.addDomListener(window, 'load', initialize);

})