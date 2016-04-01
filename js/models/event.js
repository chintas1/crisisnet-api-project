app.event = {
  all: [],
  new: (function(){
    var counter = 0;
    var event = function Event(tag, coords, source, date, content){
      this.tag = tag; //object
      this.tag.events.push(this);
      this.coords = coords; //array
      this.source = source; //string
      this.date = date; //
      this.content = content;
      var that = this;

      function initialize(){
        this.id = ++counter;
        app.event.all.push(that);
      };

      initialize();
    }
    return event;
  }())
}