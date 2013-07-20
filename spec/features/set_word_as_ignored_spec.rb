require 'spec_helper'

feature 'ignore word' do
  scenario 'user can ignore words', js: true do
    visit root_path

    find('textarea').set('tioman island')

    click_on 'Read'

    page.should have_css('li', text: 'tioman')
    page.should have_css('li', text: 'island')

    Word.where(word: 'tioman').count.should == 1
    Word.where(word: 'island').count.should == 1

    choose_to_ignore 'island'

    page.should have_css('li', text: 'tioman')
    page.should_not have_css('li', text: 'island')

    find('textarea').set('long island')

    click_on 'Read'

    page.should have_css('li', text: 'long')
    page.should_not have_css('li', text: 'island')
  end

  def choose_to_ignore word
    within "li.rt-#{word}" do
      find('.ignore').click
    end
  end
end

