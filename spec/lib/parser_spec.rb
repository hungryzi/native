require 'spec_helper'

describe Parser do
  describe "#split_words" do
    it "returns words" do
      words = Parser.split_words "all that is gold does not glitter"
      expect(words).to eq %w(all that is gold does not glitter)
    end

    it "turns everything to lower case" do
      words = Parser.split_words "All that is GOLD does not glitter"
      expect(words).to eq %w(all that is gold does not glitter)
    end

    it "strips spaces" do
      words = Parser.split_words "  all   that  is   gold   does not glitter   "
      expect(words).to eq %w(all that is gold does not glitter)
    end

    it "removes punctuation marks" do
      words = Parser.split_words "all, that is \"gold\" does not glitter"
      expect(words).to eq %w(all that is gold does not glitter)
    end

    it "keeps the contracted `not` (n't)" do
      words = Parser.split_words "all that is gold doesn't glitter"
      expect(words).to eq %w(all that is gold doesn't glitter)
    end

    it "removes 's" do
      words = Parser.split_words "all that's gold doesn't glitter"
      expect(words).to eq %w(all that gold doesn't glitter)
    end
  end

  describe "#remove_numbers" do
    it "removes numbers" do
      words = Parser.remove_numbers %w(year 2134 2141 in utopian world 3345436325)
      expect(words).to eq %w(year in utopian world)
    end

    it "removes float numbers too" do
      words = Parser.remove_numbers %w(year 21.34 002.141 in utopian world)
      expect(words).to eq %w(year in utopian world)
    end

    it "doesn't remove weird numbers" do
      words = Parser.remove_numbers %w(ip address 21.34.002.141 in utopian world)
      expect(words).to eq %w(ip address 21.34.002.141 in utopian world)
    end
  end

  describe "#count_occurrences" do
    it "returns a hash with words and their occurrences" do
      words = %w(all that is gold does not glitter not all who wander are lost)
      word_map = Parser.count_occurrences words
      expect(word_map).to eq({
        all: 2,
        that: 1,
        is: 1,
        gold: 1,
        does: 1,
        not: 2,
        glitter: 1,
        who: 1,
        wander: 1,
        are: 1,
        lost: 1
      })
    end
  end
end
