var Todo = Backbone.Model.extend({
  defaults: function(){
    return{
      done: false
    }
  }
  toggleComplete: function(){
    this.save({done: !this.get('done')});
  }
});
