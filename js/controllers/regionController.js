  app.region.controller= {
    new: (function(){

    }),
    init: (function(){

    }),
    render: (function(region){
      var source = $("#region-template").html();
      var template = Handlebars.compile(source);
      var html = template({regions: app.region.model.all});
      $('#regions').html(html);
    })
  }