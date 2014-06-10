var ListView = Backbone.View.extend({
  el: 'div#all-todos',
  initialize: function(){
    this.addAllTodos();
    this.listenTo(this.collection, 'add', this.addSingleTodo);
    this.listenTo(this.collection, 'reset', this.addAllTodos);
    this.render();
  },
  addAllTodos: function(){
    this.$el.empty();
    this.collection.each(this.addSingleTodo, this);
  },
  addSingleTodo: function(todoModel){
    var todoView = new TodoView({model: todoModel});
    if (todoModel.get('done') == true){
      $(todoView.el).hide().appendTo($('#completed-todos')).slideDown(500);
    }
    else {
      $(todoView.el).hide().appendTo($('#incomplete-todos')).slideDown(500);
    }
  }
});


