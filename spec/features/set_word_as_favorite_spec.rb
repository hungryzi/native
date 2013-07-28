require 'spec_helper'

feature 'favorite word' do
  scenario 'user can favorite words', js: true do
    visit root_path

    find('textarea').set('tioman island')

    click_on 'Read'

    page.should have_css('li', text: 'tioman')
    page.should have_css('li', text: 'island')

    choose_to_favorite 'island'

    page.should have_css('li.favorited', text: 'island')

    Word.where(word: 'island', status: Word::FAVORITED).count.should == 1

    find('textarea').set('long island')

    click_on 'Read'

    page.should have_css('li', text: 'long')
    page.should have_css('li.favorited', text: 'island')
  end

  def choose_to_favorite word
    within "li.rt-#{word}" do
      find('.favorite').click
    end
  end
end

