$(document).ready(function(){
  console.log("js loaded baby!");
  loadBackboneVars();
  loadKeywordList();
});

function loadBackboneVars(){
  var collection = new TodoCollection();
  var localList = new ListView({collection: collection});
  var input = new InputView({collection: collection});
  collection.fetch({reset: true})
};

function loadKeywordList(){
  $('#keywords h4').on('click', function(){
    $('#keyword_list').toggleClass('display-me')
  })
}
