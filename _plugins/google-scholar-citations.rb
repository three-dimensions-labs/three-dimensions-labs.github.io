require 'nokogiri'
require 'open-uri'
require 'uri'

module Jekyll
  class GoogleScholarCitations < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @text = text.strip
    end

    def render(context)
      # Parse the parameters
      params = @text.split(' ')
      scholar_userid = context[params[0]] || params[0]
      citation_id = context[params[1]] || params[1]
      
      begin
        # Return a default value if no citation_id is provided
        return "0" if citation_id.nil? || citation_id.empty?
        
        # Build the URL for the Google Scholar citation
        url = "https://scholar.google.com/citations?user=#{scholar_userid}&view_op=view_citation&citation_for_view=#{citation_id}"
        
        # Use a simple cache to avoid repeatedly fetching the same citation
        @@citation_cache ||= {}
        cache_key = "#{scholar_userid}-#{citation_id}"
        
        # Return cached value if available
        return @@citation_cache[cache_key] if @@citation_cache.key?(cache_key)
        
        # Fetch and parse the citation page
        doc = Nokogiri::HTML(URI.open(url))
        citation_count = doc.css('.gsc_oci_value').detect { |el| el.previous_element.text.include?('Citations') }
        citation_text = citation_count ? citation_count.text.strip : "0"
        
        # Cache the result
        @@citation_cache[cache_key] = citation_text
        return citation_text
      rescue => e
        puts "Error fetching Google Scholar citation: #{e.message}"
        return "0"
      end
    end
  end
end

Liquid::Template.register_tag('google_scholar_citations', Jekyll::GoogleScholarCitations) 