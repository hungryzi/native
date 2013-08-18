(function() {
  $('textarea').focus();

  $('.word .text').on('click', function(e){
    var keyword = $(e.currentTarget).find('.text').text();
    if (keyword.trim() === '') return;

    $('li.word').removeClass('selected');
    $(e.currentTarget).addClass('selected');

    var $definition = $('.definition');
    $definition.empty();
    offsetTop = $(e.currentTarget).offset().top;
    offsetLeft = $definition.offset().left;
    $definition.offset({ top: offsetTop, left: offsetLeft });

    var url = 'http://www.google.com/dictionary/json?callback=dict_api.callbacks.id100&q='+ keyword +'&sl=en&tl=en&restrict=pr%2Cde&client=te'
    $.ajax(url, {
      dataType: 'jsonp',
      success: function(result){
        var $ul = $('<ul/>');
        if (result.webDefinitions){
          result.webDefinitions[0].entries.forEach(function(entry){
            encoded = entry.terms[0].text;
            decoded = $('<span/>').html(encoded).text();
            $ul.append($('<li/>').text(decoded));
          });
        };
        $definition.html($ul);
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

  $('.word .ignore').on('click', function(e) {
    var text = getText(e.currentTarget);
    var $li = $(e.currentTarget).closest('li');

    var url = '/words/ignore'
    $.ajax(url, {
      method: 'PUT',
      dataType: 'json',
      data: { word: text },
      success: function(response){
        $li.remove();
      },
      error: function(result){
        console.debug('error', arguments);
      }
    });
  });

  $('.word .favorite').on('click', function(e) {
    var text = getText(e.currentTarget);
    var $li = $(e.currentTarget).closest('li');

    var url = '/words/favorite'
    $.ajax(url, {
      method: 'PUT',
      dataType: 'json',
      data: { word: text },
      success: function(response){
        $li.addClass('favorited');
      },
      error: function(result){
        console.debug('error', arguments);
      }
    });
  });
})();
