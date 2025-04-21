require 'json'

module Jekyll
  class SearchIndexGenerator < Jekyll::Generator
    safe true
    priority :lowest

    def generate(site)
      # Debug info
      Jekyll.logger.info "SearchIndexGenerator:", "Generating search index with #{site.posts.docs.count} posts"
      
      # Create a page for the search data
      search_page = Jekyll::PageWithoutAFile.new(site, site.source, "", "search_data.json")
      search_page.content = ""
      search_page.data["layout"] = nil
      search_page.data["permalink"] = "/search_data.json"
      
      # Generate search data
      posts_data = []
      
      site.posts.docs.each do |post|
        begin
          post_data = {}
          post_data["title"] = post.data["title"].to_s
          post_data["url"] = post.url.to_s
          post_data["date"] = post.date.strftime('%Y-%m-%d')
          post_data["description"] = post.data["description"].to_s
          
          # Strip HTML and limit content size to avoid huge files
          content = post.content.to_s.gsub(/<\/?[^>]*>/, "")
          # Limit content to ~1000 words to keep the JSON file size reasonable
          content = content.split(/\s+/).first(1000).join(" ") if content.split(/\s+/).length > 1000
          post_data["content"] = content
          
          # Handle optional fields
          post_data["external_source"] = post.data["external_source"].to_s if post.data["external_source"]
          post_data["thumbnail"] = post.data["thumbnail"].to_s if post.data["thumbnail"]
          
          # Calculate read time
          if post.data["read_time"]
            post_data["readtime"] = post.data["read_time"].to_i 
          else
            words = post.content.gsub(/<\/?[^>]*>/, "").split.size
            post_data["readtime"] = (words / 180.0).ceil
          end
          
          # Process tags and categories - ensure they're arrays of strings
          tags = post.data["tags"]
          tags = [tags] if tags && !tags.is_a?(Array)
          post_data["tags"] = tags ? tags.map(&:to_s) : []
          
          categories = post.data["categories"]
          categories = [categories] if categories && !categories.is_a?(Array)
          post_data["categories"] = categories ? categories.map(&:to_s) : []
          
          # Add to posts data array
          posts_data << post_data
          
        rescue => e
          Jekyll.logger.error "SearchIndexGenerator:", "Error processing post #{post.url}: #{e.message}"
          # Continue with next post rather than failing completely
        end
      end
      
      # Set the page output to the JSON data
      Jekyll.logger.info "SearchIndexGenerator:", "Generated search index with #{posts_data.size} posts"
      
      # Ensure proper encoding to avoid JSON issues
      search_page.output = posts_data.to_json.encode('UTF-8', :invalid => :replace, :undef => :replace)
      
      # Add the page to the site
      site.pages << search_page
    end
  end
end 