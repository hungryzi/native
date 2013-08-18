class PagesController < ApplicationController
  def home
    file = params['file']

    if file
      @text = Striper.strip_off file.tempfile.path
    else
      @text = params['text'] || ''
    end

    words = Parser.remove_numbers(Parser.split_words(@text))
    word_occurrences = Parser.count_occurrences(words)
    @sorted = word_occurrences.sort_by { |k, v| v }

    @word_status = {}
    Word.where("word IN (?)", words).each do |w|
      @word_status[w.word] = w.status
    end
  end
end

