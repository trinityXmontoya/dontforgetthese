var InputView = Backbone.View.extend({
  el: 'div#new-todo-item-options',
  events: {
    'click button#add-todo': 'createTodo'
  },

  createTodo: function(){
    var todo_description = this.$('#new-todo-item-description').val();
    this.$('#new-todo-item-description').val('');
    var newTodo = {description: todo_description, done: false};
    this.collection.create(newTodo);
  }
});
