var Todo = Backbone.Model.extend({
  idAttribute: "_id",
  toggleComplete: function(){
    this.save({done: !this.get('done')});
  }

});
