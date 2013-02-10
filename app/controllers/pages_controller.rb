class PagesController < ApplicationController
  def home
    @text = params['text'] || ''
    @sorted = word_occurrences.sort_by { |k, v| -v }
    word_occurrences = Parser.count_occurrences(Parser.remove_numbers(Parser.split_words(@text)))
  end
end
