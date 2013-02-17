// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require underscore-min
//= require backbone-min
//= require indexeddb-wrapper
//= require db
//= require events
//= require_tree .

(function(){
  // after loading, add all the words to indexeddb
  var options = function(text){
    return {
      error: function(msg){
        if (msg == "Not Found"){
          app.db.add('words', { text: text, status: 0 });
        }
      },
      success: function(result){
        if (result.status === -1) {
          $('li.word.rt-' + result.text).remove(); //TODO: transition
        }
      }
    };
  };

  app.db.begin(['words'], {
    complete: function(e) { console.debug('complete'); },
    abort: function(e) { console.debug('abort'); }
  });
  $('li.word').toArray().forEach(function(li){
    var text = $(li).find('span.text').text();
    app.db.get('words', { text: text }, options(text));
  });
  app.db.commit();

})();

