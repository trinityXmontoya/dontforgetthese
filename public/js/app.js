$(document).ready(function(){
  console.log("js loaded baby!");
  loadBackboneVars();
  loadKeywordList();
  shareList();
  changeListTitle();
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
};

function shareList(){
  $('.share-list').on('click', function(){
    twitterButton();
    fbookButton();
    $('#modal').toggleClass('display-me');
    $('#share-options').toggleClass('display-me')
  })
}

var twitterButton = function(){
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
}

var fbookButton = function(){
   (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&appId=274400686074344&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));
}


var changeListTitle = function(){
  listTitle = $('.user-list');

  listTitle.on('click', function(){
    $(this).attr('contentEditable',true);
    $(this).css('display','inline-block');
  });

  listTitle.on('keypress', function(e){
    if (e.which == 13){
      e.preventDefault();
      listTitle.blur();
    }
  });

  listTitle.on('focusout', function(){
      postNewTitle();
  });

  var postNewTitle = function(){
    $.ajax({
      url: '/api/lists/new_title',
      method: 'post',
      dataType: 'json',
      data: {title: listTitle.text()}
    }).done( function(data){
      console.log("Title succesfully changed to" + listTitle.text());
    });
  };
};
