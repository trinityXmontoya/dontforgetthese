var listView = Backbone.View.extend({
  el: 'div#all-todo-items',
  initialize: function(){
    this.addAllTodos();
    this.listenTo(this.collection, 'add', this.addSingleTodo);
    this.listenTo(this.collection, 'reset', this.addAllTodos);
  },
  addAllTodos: function(){
    this.$el.empty();
    this.collection.each(this.addSingleTodo, this);
  },
  addSingleTodo: function(todoModel){
    var todoView = new ItemView({model: todoModel});
    $(todoView.el).hide().appendTo(this.$el).slideDown(1000);
  }
});
