$(function() { // on document ready
  var app = {};
  eventsController = new app.event.controller.new();
  eventsController.init();
  tagsController = new app.tag.controller.new();
  tagsController.init();
});