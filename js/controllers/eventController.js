app.event.controller = {
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

      })
    }
  }
}
