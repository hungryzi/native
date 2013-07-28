class WordsController < ApplicationController
  def favorite
    word = Word.where(word: params[:word]).first_or_create
    word.update_attribute(:status, Word::FAVORITED)
    render json: [], status: :ok
  end

  def ignore
    word = Word.where(word: params[:word]).first_or_create
    word.update_attribute(:status, Word::IGNORED)
    render json: [], status: :ok
  end
end
