app.event = {
        model:{
          all: [],
          new: (function(){
            var counter = 0;
            var event = function Event(content, source, createdAt, region){
              this.id = ++counter;
              this.content = content;
              this.source = source;
              this.createdAt = createdAt.slice(0,10);
              region.events.push(this);
              app.event.model.all.push(this);
             }
              return event;
              }()),
          delete: (function(){
          })
        }
  }
  
  