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
//= require_tree .

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
})();
