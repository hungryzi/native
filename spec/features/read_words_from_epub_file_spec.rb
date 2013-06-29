require 'spec_helper'

feature 'epub file' do
  scenario 'user can upload an epub file' do
    visit root_path

    page.attach_file 'file', Rails.root.join('spec', 'fixtures', 'test.epub')

    click_on 'Read'

    page.should have_content 'cat'
  end
end
