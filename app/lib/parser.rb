class Parser
  def self.split_words text
    text.strip.
      downcase.
      gsub(/[^a-z0-9\'\s]+/, "").
      gsub(/\'s/, "").
      split(/\s+/)
  end

  def self.remove_numbers words
    filtered = []
    words.each do |word|
      filtered << word unless /^\d+((,|\.)\d+){0,1}$/.match(word)
    end

    filtered
  end

  def self.count_occurrences words
    word_occurrence_map = {}

    sorted = words.sort

    current_word = nil
    current_counter = 0
    sorted.each do |word|
      if word == current_word
        current_counter += 1
      else
        word_occurrence_map[current_word.to_sym] = current_counter if current_word
        current_word = word
        current_counter = 1
      end
    end
    word_occurrence_map[current_word.to_sym] = current_counter if current_word

    word_occurrence_map
  end
end
