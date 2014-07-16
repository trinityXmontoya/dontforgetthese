var InputView = Backbone.View.extend({
  el: 'div#new-todo',
  events: {
    'keydown': 'createTodo'
  },

  createTodo: function(e){
    var code = e.keyCode || e.which;
    if(code == 13) {
      console.log("your pressed enter! i saw you!")
      var todo_description = this.filterForIcons($('#new-todo-description').val());
      $('#new-todo-description').val('');
      var newTodo = {description: todo_description, done: false};
      this.collection.create(newTodo);
    }
  },

  filterForIcons: function(description){
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
  }

});
