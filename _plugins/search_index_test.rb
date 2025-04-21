Jekyll::Hooks.register :site, :post_write do |site|
  search_file_path = File.join(site.dest, "search_data.json")
  
  if File.exist?(search_file_path)
    file_size = File.size(search_file_path)
    content = File.read(search_file_path)
    begin
      data = JSON.parse(content)
      Jekyll.logger.info "Search Index Test:", "✅ search_data.json successfully generated (#{file_size} bytes, #{data.length} posts)"
    rescue JSON::ParserError => e
      Jekyll.logger.error "Search Index Test:", "❌ search_data.json contains invalid JSON: #{e.message}"
    end
  else
    Jekyll.logger.error "Search Index Test:", "❌ search_data.json was not generated"
  end
end 