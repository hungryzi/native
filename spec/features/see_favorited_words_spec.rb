require 'spec_helper'

feature 'favorited words' do
  scenario 'user can see them', js: true do
    Word.create word: 'island', status: Word::FAVORITED
    Word.create word: 'tioman', status: Word::IGNORED

    visit root_path

    click_on 'Favorite'

    page.should have_css('li', text: 'island')
    page.should_not have_css('li', text: 'tioman')
  end
end

