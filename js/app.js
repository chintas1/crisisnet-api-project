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
                        app.marker.model.all.push(this);
                       }
                return marker;
                }()),


            find: (function(id){ 
                return $.grep(app.marker.model.all, function(mark){
                     return mark.id === id })[0]

            }),

            delete: (function(id){
              var marker;
              var index;
              marker = app.marker.model.find(id);
              index= app.marker.model.all.indexOf(marker);
              return app.marker.model.all.splice(index, 1);
            }),

          },
          controller: {
            new: (function(){

            }),
            init: (function(){

            }),
            render: (function(){
              
            }),
        }
      }

app.region = {
  model: {
    all: [],
    new: (function(){
      var counter = 0;
      var region = function Region(marker){
        this.id = ++counter;
        this.marker = marker;
        this.events = [];
        app.region.model.all.push(this);
       }
        return region;
        }()),
    delete: (function(){

    }),
  },
  controller: {
    new: (function(){

    }),
    init: (function(){

    }),
    render: (function(region){
      // $('#regions').append(
      //   "<h1>" + marker.id + "</h1>
      //   "
      //   )
    })
  }
}

app.event = {
  model: {
    all: [],
    new: (function(){
      var counter = 0;
      var event = function Event(content, source, createdAt, region){
        this.id = ++counter;
        this.content = content;
        this.source = source;
        this.createdAt = createdAt;
        region.events.push(this);
        app.event.model.all.push(this);
       }
        return event;
        }()),
    delete: (function(){

    }),
  },
  controller: {
    new: (function(){

    }),
    init: (function(){

    }),
    render: (function(){
      
    }),

      adapter: {
    getBy: function(lat, long, region){
      return $.ajax({
        method: "GET",
        url: "http://api.crisis.net/item?location=" + lat + "%2C" + long + "&distance=" + 500 + "&apikey=56fd9790d15eddf7785a9a75",
      }).then(function(data){
        // return events sorted by date

      var sortedEvents = data.data.sort(function(a, b) {
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        else if (a.createdAt > b.createdAt) {
          return -1;
        }
        else {
          return 0;
        }
      }).splice(0,10) // return 10 most recent events

      sortedEvents.forEach(function(event){
        var content = event.content;
        var createdAt = event.createdAt;
        var source = event.source;
        new app.event.model.new(content, source, createdAt, region);
      })

      }
      )
    }
  }
  }
  }


// Google Map API //
$(function(){
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
          var lat = event.latLng.lat();
          var long = event.latLng.lng(); 
          addMarker(event.latLng, map);
          var mark = new app.marker.model.new(lat, long);
          var region = new app.region.model.new(mark);
          // content, source, createdAt, region
          app.event.controller.adapter.getBy(mark.lat, mark.long, region);
          app.region.controller.render(region);

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
      }

      google.maps.event.addDomListener(window, 'load', initialize);

})