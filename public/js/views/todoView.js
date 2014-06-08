var TodoView = Backbone.View.extend({
  tagName: 'li',
  className: 'each-todo',

  events: {
    'click span' : 'deleteTodo',
    'click input:checkbox' : 'toggleComplete'
  },

  initialize: function(){
    this.template = _.template($('#todo-template').html());
    this.listenTo(this.model, 'remove', this.remove);
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function(){
    var description = this.model.get('description');
    var complete = this.model.get('done');
    var compiledView = this.template(this.model.toJSON());
    if (complete) {
      this.$el.addClass('completed');
    }
    else {
      this.$el.removeClass('completed').addClass('incomplete')
    }
    this.$el.html(compiledView);
  },

  remove: function(){
    this.$el.slideUp(500, this.remove.bind(this));
  },

  deleteTodo: function(){
    this.model.destroy();
  },

  toggleComplete: function(){
    var complete = this.$('input:checkbox').is(':checked');
    if (complete){
      this.model.set('done', true);
    }
    else {
      this.model.set('done',false);
    }
    this.model.save();
  }
});
