var Todo = Backbone.Model.extend({
  idAttribute: 'id',
  toggleComplete: function(){
    this.save({done: !this.get('done')});
  }
});
