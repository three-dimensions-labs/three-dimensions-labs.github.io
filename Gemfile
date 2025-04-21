source 'https://rubygems.org'

ruby '~> 3.3.5'  # Match the CI environment's Ruby version

gem 'jekyll', '~> 4.2'
gem 'activesupport', '~> 6.0'

# Core plugins that directly affect site building
group :jekyll_plugins do
    gem 'nokogiri', '~> 1.16.0'  # Version compatible with Ruby 3.3.5
    gem 'jekyll-sass-converter', '~> 2.2.0'  # Use older version to avoid sass-embedded issues
    gem 'jekyll-archives-v2'
    gem 'jekyll-email-protect'
    gem 'jekyll-feed'
    gem 'jekyll-get-json'
    gem 'jekyll-imagemagick'
    gem 'jekyll-jupyter-notebook'
    gem 'jekyll-link-attributes'
    gem 'jekyll-minifier'
    gem 'jekyll-paginate-v2'
    gem 'jekyll-regex-replace'
    gem 'jekyll-scholar'
    gem 'jekyll-sitemap'
    gem 'jekyll-tabs'
    gem 'jekyll-terser', :git => "https://github.com/RobertoJBeltran/jekyll-terser.git"
    gem 'jekyll-toc'
    gem 'jekyll-twitter-plugin'
    gem 'jemoji'

    gem 'classifier-reborn'  # used for content categorization during the build
end

# Gems for development or external data fetching (outside :jekyll_plugins)
group :other_plugins do
    gem 'css_parser', '~> 1.14.0'  # Use newer version compatible with Ruby 3.3.5
    gem 'feedjira'
    gem 'httparty'
    gem 'observer'       # used by jekyll-scholar
    gem 'ostruct'        # used by jekyll-twitter-plugin
    gem 'i18n'           # needed for inspirehep-citations.rb plugin
    # Add gems that will no longer be part of default gems in future Ruby versions
    gem 'logger'
    gem 'csv'
    gem 'base64'
    gem 'bigdecimal'
    gem 'mutex_m'
    # gem 'terser'         # used by jekyll-terser
    # gem 'unicode_utils' -- should be already installed by jekyll
    # gem 'webrick' -- should be already installed by jekyll
end
