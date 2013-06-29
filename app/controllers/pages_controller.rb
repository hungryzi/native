class PagesController < ApplicationController
  def home
    file = params['file']

    if file
      @text = Striper.strip_off file.tempfile.path
    else
      @text = params['text'] || ''
    end

    word_occurrences = Parser.count_occurrences(Parser.remove_numbers(Parser.split_words(@text)))
    @sorted = word_occurrences.sort_by { |k, v| v }
  end
end
