var ItemView = Backbone.View.extend({
  tagName: 'div',
  className: 'each-item',
  events: {
    'click input:checkbox' : 'toggleComplete'
  },
  initialize: function(){

  },
  render: function(){

  },
  remove: function(){

  },
  delete: function(){
    this.model.destroy();
  },
  toggleComplete: function(){
    var done = this.$('input:checkbox').is(':checked');
    if (done){
      this.model.set({'done', true});
      this.$el.toggleClass('complete');
    }
    else {
      this.model.set({'done',false});
      this.$el.toggleClass('incomplete');
    }
    this.model.save();
  }
});
