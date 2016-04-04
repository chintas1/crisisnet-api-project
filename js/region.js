app.region = {
  model: {
    all: [],
    new: (function(){
      var counter = 0;
      var region = function Region(marker){
        this.id = ++counter;
        this.symbol = marker.google_mark.label;
        this.marker = marker;
        this.events = [];
        app.region.model.all.push(this);
       }
        return region;
        }()),
    delete: (function(){

    }),
  }

}