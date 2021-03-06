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
    var description = filterForIcons(this.model.get('description'));
    var complete = this.model.get('done');
    var compiledView = this.template({
                        description: description,
                        done: complete});
    if (complete) {
      this.$el.addClass('completed')
    }
    else {
      this.$el.removeClass('completed').addClass('incomplete')
    }
    this.$el.html(compiledView);
  },

  editTodo: function(){
    var that = this;
    span = this.$el.find($('.description'));
    span.attr('contentEditable',true);
    span.css('opacity','.4')
    span.on('focusout', function(){
      span.attr('contentEditable',false)
      span.css('opacity','1')
    });

    span.on('keydown', function(e){
      var code = e.keyCode || e.which;
      var description = span.text();
      if(code == 13 && description){
        that.model.set({description: description})
                  .save();
        return false
      }
    });
    },

  remove: function(){
    this.$el.slideUp(300);
  },

  deleteTodo: function(){
    this.model.destroy();
  },

  markComplete: function(){
    this.model.toggleComplete();
    this.$el.hide()
            .removeClass('incomplete')
            .addClass('completed')
            .appendTo($('#completed-todos'))
            .slideDown(500);
  }
});


var filterForIcons = function(description){
    var keywordList = [
    "anchor","ambulance","android","apple","automobile","bell","bitcoin","bomb","book","briefcase","bug","cab","calendar","camera","car","child","cloud","coffee","cutlery","dollar","dropbox","drupal","envelope","facebook","fire-extinguisher","gear","gift","git","github","google","graduation-cap","heart","headphones","home","instagram","jsfiddle","laptop","list","microphone","minus","money","music","pencil","phone","pinterest","plane","plus","question","reddit","rocket","scissors","search","spoon","star","suitcase","taxi","ticket","tree","trophy","truck","twitter","unlock","wheelchair","youtube"
    ]
    var result = ""
    function filter(word){
      if (keywordList.indexOf(word)>-1){
        word = word.replace(/(.*)/,"<i class='fa fa-" + word + "'></i>")
      }
      return result += " " + word
    }
    description.split(' ').forEach(filter)
    return result
  };
