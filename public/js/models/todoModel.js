var Todo = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: function(){
    return{
      done: false
    }
  },
  toggleComplete: function(){
    this.save({done: !this.get('done')});
  }
});
