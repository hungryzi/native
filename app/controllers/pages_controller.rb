class PagesController < ApplicationController
  def home
    @text = params['text'] || ''
    word_occurrences = Parser.count_occurrences(Parser.remove_numbers(Parser.split_words(@text)))
    @sorted = word_occurrences.sort_by { |k, v| v }
  end
end
