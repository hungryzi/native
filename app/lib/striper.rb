class Striper
  def self.strip_off file
    book = EPUB::Parser.parse file
    text = ''
    book.each_page_on_spine do |page|
      node = Nokogiri::HTML page.read do |config|
        config.noblanks.nonet.noerror
      end
      text += node.text
    end

    text
  end
end
