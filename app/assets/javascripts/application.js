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
//= require indexeddb-backbone
//= require db
//= require events
//= require_tree .

(function(){
  var logger = function() { console.debug(arguments) };

  var dbRequest = IndexedDBBackbone.indexedDB.open(app.schema.id, app.schema.version());
  dbRequest.onblocked = logger;
  dbRequest.onerror = logger;
  dbRequest.onabort = logger;
  dbRequest.onupgradeneeded = function(e){
    logger("Upgrading database now");
    app.schema.onupgradeneeded(e);
  };

  dbRequest.onsuccess = function(e){
    var db = e.target.result;
    var transaction = db.transaction(['words'], 'readwrite');
    transaction.onerror = logger;
    transaction.oncomplete = logger;
    wordsStore = transaction.objectStore('words');

    // after loading, add all the words to indexeddb
    $('li.word').toArray().forEach(function(li){
      text = $(li).find('span.text').text();
      var getRequest = wordsStore.get(text);
      getRequest.onerror = logger;
      getRequest.onsuccess = function(e){
        var result = e.target.result;

        if (result) {
          if (result.status === -1) {
            $('li.word.rt-' + result.text).remove(); //TODO: transition
          }
        } else {
          wordsStore.add({ text: text, status: 0 });
        }
      };
    });

    db.close();
  };
})();

