var listView = Backbone.View.extend({
  el: 'div#all-todo-items',
  initialize: function(){
    this.addTodos();
    this.listenTo(this.collection, 'add', this.addSingleTodo);
  },
  addTodos: function(){
    this.$el.empty();
  },
  addSingleTodo: function(){

  }

});
