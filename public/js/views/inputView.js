var InputView = Backbone.View.extend({
  el: 'div#new-todo',
  events: {
    'keydown': 'createTodo'
  },

  createTodo: function(e){
    var code = e.keyCode || e.which;
    var description = $('#new-todo-description').val()
    if(code == 13 && description) {
      console.log("your pressed enter! i saw you!")
      $('#new-todo-description').val('');
      var newTodo = {description: description, done: false};
      this.collection.create(newTodo);
    }
  }
});
