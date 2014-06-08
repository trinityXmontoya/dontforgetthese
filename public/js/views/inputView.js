var InputView = Backbone.View.extend({
  el: 'div#new-todo-item-options',
  events: {
    'click button#add': 'newTodo'
  }
});
