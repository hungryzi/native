class PagesController < ApplicationController
  def home
    file = params['file']

    if file
      @text = Striper.strip_off file.tempfile.path
    else
      @text = params['text'] || ''
    end

    active_words = []
    words = Parser.remove_numbers(Parser.split_words(@text))
    words.each do |word|
      w = Word.find_by(word: word) || Word.create(word: word, status: Word::ACTIVE)

      if w.status == Word::ACTIVE
        active_words << w
      end
    end
    word_occurrences = Parser.count_occurrences(active_words.map(&:word))
    @sorted = word_occurrences.sort_by { |k, v| v }
  end
end
