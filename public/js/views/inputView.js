var InputView = Backbone.View.extend({
  el: 'div#new-todo',
  events: {
    'click button#add-todo': 'createTodo'
  },

  createTodo: function(){
    var todo_description = this.$('#new-todo-description').val();
    this.$('#new-todo-description').val('');
    var newTodo = {description: todo_description, done: false};
    this.collection.create(newTodo);
  }
});
