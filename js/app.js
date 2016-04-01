app = {};

app.marker = {
  model: {
    all: [],
    new: (function(){
      var counter = 0;
      var marker = function Marker(lat, long){
        this.id = ++counter;
        this.lat = lat;
        this.long = long;
      }
      return marker;
    }),
    find: (function(id){

    }),
    delete: (function(){

    }),
  },
  controller: {
    new: (function(){

    }),
    init: (function(){

    }),
    render: (function(){
      
    })
  }
}

app.region = {
  model: {
    all: [],
    new: (function(){

    }),
    delete: (function(){

    }),
  },
  controller: {
    new: (function(){

    }),
    init: (function(){

    }),
    render: (function(){
      
    })
  }
}

app.event = {
  model: {
    all: [],
    new: (function(){

    }),
    delete: (function(){

    }),
  },
  controller: {
    new: (function(){

    }),
    init: (function(){

    }),
    render: (function(){
      
    })
  }
}
      // In the following example, markers appear when the user clicks on the map.
      // Each marker is labeled with a single alphabetical character.
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var labelIndex = 0;

      function initialize() {
        var initial = { lat: 40.70601833122571, lng: -74.01394844055176 };
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: initial
        });

        // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function(event) {
          console.log(event.latLng.lat());
          console.log(event.latLng.lng());
          addMarker(event.latLng, map);
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
      }

      google.maps.event.addDomListener(window, 'load', initialize);
