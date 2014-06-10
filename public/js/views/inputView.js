var InputView = Backbone.View.extend({
  el: 'div#new-todo',
  events: {
    'keydown': 'createTodo'
  },

  createTodo: function(e){
    var code = e.keyCode || e.which;
    if(code == 13) {
      console.log("your pressed enter! i saw you!")
      var todo_description = $('#new-todo-description').val();
      $('#new-todo-description').val('');
      var newTodo = {description: todo_description, done: false};
      this.collection.create(newTodo);
    }
  }
});
