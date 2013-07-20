class WordsController < ApplicationController
  def ignore
    word = Word.find_by word: params[:word]

    if word
      word.update_attribute(:status, Word::IGNORED)
      render json: [], status: :ok
    else
      render json: [], status: :not_found
    end
  end
end
