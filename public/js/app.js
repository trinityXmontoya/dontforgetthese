$(document).ready(function(){
  console.log("js loaded baby!");
  loadItem();
  loadBackboneVars();
});

function loadItem(){
  hideNewItem();
  $('#new-todo-button').on('click',showNewItem)
}

function hideNewItem(){
  $('#new-todo-item-options').addClass('hide-me')
};

function showNewItem(){
  $('#new-todo-item-options').toggleClass('hide-me').toggleClass('display-me')
};

function loadBackboneVars(){
  var collection = new TodoCollection();
  var localList = new ListView({collection: collection});
  var input = new InputView({collection: collection});
  collection.fetch({reset: true})
};
