(function() {
  var logger = function() { console.debug(arguments) };

  $('textarea').focus();

  $('#toggle-view').on('click', function(e){
    $('ul.words').toggleClass('show-only-chosen');

    if ($('ul.words').hasClass('show-only-chosen')){
      $('li.word').hide();
      $('li.word.chosen').show();
    } else {
      $('li.word').show();
    }
  });

  $('li.word').on('click', function(e){
    var keyword = $(e.currentTarget).find('.text').text();
    if (keyword.trim() === '') return;

    $('li.word').removeClass('selected');
    $(e.currentTarget).addClass('selected');

    var $definition = $('.definition');
    offsetTop = $(e.currentTarget).offset().top;
    offsetLeft = $definition.offset().left;
    $definition.offset({ top: offsetTop, left: offsetLeft });

    var url = 'http://www.google.com/dictionary/json?callback=dict_api.callbacks.id100&q='+ keyword +'&sl=en&tl=en&restrict=pr%2Cde&client=te'
    $.ajax(url, {
      dataType: 'jsonp',
      success: function(result){
        if (result.webDefinitions){
          encoded = result.webDefinitions[0].entries[0].terms[0].text;
          decoded = $('<span/>').html(encoded).text();
          $definition.text(decoded);
        }
      },
      error: function(result){
        console.debug('error', arguments);
      }
    });
  });

  $('li.word span.actions i.remove').on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();

    var $li = $(e.target).parents('li.word');
    var text = $li.find('span.text').text();

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
      transaction.oncomplete = logger;
      wordsStore = transaction.objectStore('words');
      wordsStore.put({ text: text, status: -1 });

      db.close();
    };

    $li.fadeOut('fast', function(){ $(this).remove(); });
  });

  $('li.word span.actions i.add').on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();

    var $li = $(e.target).parents('li.word');
    var text = $li.find('span.text').text();

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
      transaction.oncomplete = logger;
      wordsStore = transaction.objectStore('words');
      wordsStore.put({ text: text, status: 1 });

      db.close();
    };

    $li.addClass('chosen');
    $li.css('background-color', 'blue');
  });
})();
