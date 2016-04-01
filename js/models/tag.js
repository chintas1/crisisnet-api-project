app.tag = {
  all: [],
  new: (function(){
    var counter = 0;
    var tag = function Tag(name){
      this.name = name;
      this.events = [];
      var that = this;
      function initialize(){
        this.id = ++counter;
        app.tag.all.push(that);
      };

      initialize();
    }
    return tag;
  }())
}