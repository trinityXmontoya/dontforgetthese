var TodoView = Backbone.View.extend({
  className: 'each-todo',

  events: {
    'click span.todo-destroy' : 'deleteTodo',
    'click span.todo-edit' : 'editTodo',
    'click i.todo-check' : 'markComplete'
  },

  initialize: function(){
    this.template = _.template($('#todo-template').html());
    this.listenTo(this.model, 'remove', this.remove);
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function(){
    var description = this.model.get('description').html_safe;
    var complete = this.model.get('done');
    var compiledView = this.template(this.model.toJSON());
    if (complete) {
      this.$el.addClass('completed')
    }
    else {
      this.$el.removeClass('completed').addClass('incomplete')
    }
    this.$el.html(compiledView);
  },

  editTodo: function(){
    console.log('hi')
  },

  remove: function(){
    this.$el.slideUp(300, this.remove.bind(this));
  },

  deleteTodo: function(){
    this.model.destroy();
  },

  markComplete: function(){
    this.model.set('done', true).save();
  }
});
