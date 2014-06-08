var listView = Backbone.View.extend({
  el: 'div#all-todos',
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
    var todoView = new TodoView({model: todoModel});
    $(todoView.el).hide().appendTo(this.$el).slideDown(1000);
  }
});

