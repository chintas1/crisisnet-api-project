app.marker= {
          model:{

            all: [],
            new: (function(){
                      var counter = 0;
                      var marker = function Marker(lat, long, google_mark){
                        this.id = ++counter;
                        this.lat = lat;
                        this.long = long;
                        this.google_mark = google_mark;
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
            })
          }

          }