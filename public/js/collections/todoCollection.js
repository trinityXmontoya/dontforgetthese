var TodoCollection = Backbone.Collection.extend({
  url: '/api/todos',
  model: Todo
});
