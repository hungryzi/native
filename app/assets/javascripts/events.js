(function() {
  $('textarea').focus();

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

  var stopEvent = function(e){
    e.stopPropagation();
    e.preventDefault();
  }

  var getText = function(actionElem){
    var $li = $(actionElem).parents('li.word');
    return $li.find('span.text').text();
  }

  $('li.word span.actions i.remove').on('click', function(e) {
    stopEvent();
    var text = getText(e.target);

    app.db.put('words', { text: text, status: -1 }, {
      error: function(msg){ console.debug('Error: ', msg); },
      success: function(result){ $li.fadeOut('fast', function(){ $(this).remove(); }); }
    });
  });

  $('li.word span.actions i.add').on('click', function(e) {
    stopEvent();
    var text = getText(e.target);

    app.db.put('words', { text: text, status: 1 }, {
      error: function(msg){ console.debug('Error: ', msg); },
      success: function(e){
        $li.addClass('chosen');
        $li.css('background-color', 'blue');
      }
    });
  });
})();
