/**
 * Blog Search Functionality
 * Provides search capability for the blog across paginated content
 */

class BlogSearch {
  constructor(options = {}) {
    this.searchInput = options.searchInput || '#blog-search-input';
    this.resultsContainer = options.resultsContainer || '#blog-search-results';
    this.loadingContainer = options.loadingContainer || '#blog-search-loading';
    this.postsContainer = options.postsContainer || '.post-list';
    this.paginationContainer = options.paginationContainer || '.pagination';
    this.searchJsonPath = options.searchJsonPath || '/search_data.json';
    this.noResultsText = options.noResultsText || 'No results found';
    this.limit = options.limit || 50;
    this.posts = [];
    this.searchActive = false;
    
    // Get base URL correctly - this was problematic
    const baseElement = document.querySelector('base');
    this.baseUrl = baseElement ? baseElement.getAttribute('href') : '';
    
    // If we're on a GitHub Pages site with a custom domain or using a project page
    if (!this.baseUrl) {
      // Extract from pathname if in a GitHub Pages project
      const pathParts = window.location.pathname.split('/');
      if (pathParts.length > 1 && pathParts[1] !== '') {
        this.baseUrl = '/' + pathParts[1];
      }
    }
    
    console.log('Blog search initialized with baseUrl:', this.baseUrl);
    this.init();
  }

  async init() {
    this.searchInputElement = document.querySelector(this.searchInput);
    this.resultsContainerElement = document.querySelector(this.resultsContainer);
    this.loadingElement = document.querySelector(this.loadingContainer);
    this.postsContainerElement = document.querySelector(this.postsContainer);
    this.paginationElement = document.querySelector(this.paginationContainer);
    
    if (!this.searchInputElement || !this.resultsContainerElement) {
      console.error('Search elements not found:', {
        searchInput: this.searchInput,
        resultsContainer: this.resultsContainer,
        searchInputElement: this.searchInputElement,
        resultsContainerElement: this.resultsContainerElement
      });
      return;
    }
    
    console.log('Search elements found');
    this.originalPosts = this.postsContainerElement ? this.postsContainerElement.innerHTML : '';
    this.originalPagination = this.paginationElement ? this.paginationElement.innerHTML : '';
    
    try {
      // Construct the full URL for the search data JSON
      // Always start with window.location.origin to get the absolute URL
      const searchUrl = window.location.origin + (this.baseUrl || '') + this.searchJsonPath;
      console.log('Fetching search data from:', searchUrl);
      
      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch search data: ${response.status} ${response.statusText}`);
      }
      
      this.posts = await response.json();
      console.log(`Loaded ${this.posts.length} posts for search`);
      
      // Notify user if we successfully loaded posts
      if (this.posts.length > 0) {
        console.log('Search is ready to use');
      } else {
        console.warn('No posts loaded for search. The search data JSON might be empty.');
      }
    } catch (error) {
      console.error('Error loading search data:', error);
      // Display error in the UI
      if (this.loadingElement) {
        this.loadingElement.innerHTML = `<div class="alert alert-danger">Failed to load search data: ${error.message}</div>`;
        this.loadingElement.style.display = 'block';
      }
      return;
    }
    
    this.bindEvents();
  }

  bindEvents() {
    console.log('Binding search events');
    this.searchInputElement.addEventListener('input', this.debounce(() => {
      const query = this.searchInputElement.value.trim();
      console.log('Search input event, query:', query);
      if (query.length >= 2) {
        this.search(query);
      } else if (this.searchActive) {
        this.resetSearch();
      }
    }, 300));
    
    // Add clear button functionality
    const clearButton = document.querySelector('#blog-search-clear');
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        console.log('Clear button clicked');
        this.searchInputElement.value = '';
        this.resetSearch();
      });
    } else {
      console.warn('Clear button not found');
    }
    
    // Add submit button functionality
    const submitButton = document.querySelector('#blog-search-submit');
    if (submitButton) {
      submitButton.addEventListener('click', () => {
        console.log('Submit button clicked');
        const query = this.searchInputElement.value.trim();
        if (query.length >= 2) {
          this.search(query);
        }
      });
    } else {
      console.warn('Submit button not found');
    }
    
    // Add keyboard event for Enter key
    this.searchInputElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        console.log('Enter key pressed');
        const query = this.searchInputElement.value.trim();
        if (query.length >= 2) {
          this.search(query);
        }
      }
    });
    
    console.log('Search events bound successfully');
  }

  search(query) {
    console.log(`Searching for: "${query}"`);
    this.searchActive = true;
    
    // Show loading indicator
    if (this.loadingElement) {
      this.loadingElement.style.display = 'block';
    }
    
    if (this.paginationElement) {
      this.paginationElement.style.display = 'none';
    }
    
    if (this.postsContainerElement) {
      this.postsContainerElement.style.display = 'none';
    }
    
    // Use setTimeout to allow the UI to update before performing the search
    setTimeout(() => {
      const results = this.getResults(query);
      console.log(`Found ${results.length} results for "${query}"`);
      
      // Hide loading indicator
      if (this.loadingElement) {
        this.loadingElement.style.display = 'none';
      }
      
      if (results.length === 0) {
        this.resultsContainerElement.innerHTML = `<p class="search-no-results">${this.noResultsText}</p>`;
        this.resultsContainerElement.style.display = 'block';
      } else {
        this.renderResults(results, query);
        this.resultsContainerElement.style.display = 'block';
      }
    }, 300);
  }

  getResults(query) {
    query = query.toLowerCase();
    const terms = query.split(' ').filter(term => term.length > 0);
    
    return this.posts
      .filter(post => {
        const titleMatch = post.title?.toLowerCase().includes(query) || false;
        const contentMatch = post.content?.toLowerCase().includes(query) || false;
        const descriptionMatch = post.description ? post.description.toLowerCase().includes(query) : false;
        
        // Tags and categories may be arrays or empty
        const tagsMatch = post.tags && post.tags.length > 0 ? 
          post.tags.some(tag => tag?.toLowerCase().includes(query)) : 
          false;
          
        const categoriesMatch = post.categories && post.categories.length > 0 ? 
          post.categories.some(category => category?.toLowerCase().includes(query)) : 
          false;
        
        // Also check individual terms for multi-word searches
        if (terms.length > 1) {
          const termMatches = terms.every(term => {
            return (post.title && post.title.toLowerCase().includes(term)) || 
                  (post.content && post.content.toLowerCase().includes(term)) ||
                  (post.description ? post.description.toLowerCase().includes(term) : false) ||
                  (post.tags && post.tags.length > 0 ? post.tags.some(tag => tag?.toLowerCase().includes(term)) : false) ||
                  (post.categories && post.categories.length > 0 ? post.categories.some(category => category?.toLowerCase().includes(term)) : false);
          });
          
          return titleMatch || contentMatch || descriptionMatch || tagsMatch || categoriesMatch || termMatches;
        }
        
        return titleMatch || contentMatch || descriptionMatch || tagsMatch || categoriesMatch;
      })
      .sort((a, b) => {
        // Sort by date (newer first)
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      })
      .slice(0, this.limit);
  }

  highlightText(text, query) {
    if (!text) return '';
    
    const terms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    if (terms.length === 0) return text;
    
    try {
      let highlightedText = text;
      const regex = new RegExp(`(${terms.map(term => this.escapeRegExp(term)).join('|')})`, 'gi');
      
      highlightedText = highlightedText.replace(regex, '<span class="search-highlight">$1</span>');
      
      return highlightedText;
    } catch (error) {
      console.error('Error highlighting text:', error);
      return text; // Return original text if highlighting fails
    }
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  renderResults(results, query) {
    try {
      let html = '<ul class="post-list">';
      
      results.forEach(post => {
        const date = new Date(post.date);
        const year = date.getFullYear();
        const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        
        // Highlight title and description
        const highlightedTitle = this.highlightText(post.title, query);
        const highlightedDescription = this.highlightText(post.description, query);
        
        // Start the list item
        html += '<li>';
        
        // If there's a thumbnail, wrap content in a row
        if (post.thumbnail) {
          html += '<div class="row"><div class="col-sm-9">';
        }
        
        // Title and basic post info
        html += `
          <h3>
            <a class="post-title" href="${this.baseUrl}${post.url}">${highlightedTitle}</a>
          </h3>
          <p>${highlightedDescription || ''}</p>
          <p class="post-meta">
            ${post.readtime || '3'} min read &nbsp; &middot; &nbsp;
            ${formattedDate}
            ${post.external_source ? `&nbsp; &middot; &nbsp; ${post.external_source}` : ''}
          </p>
          <p class="post-tags">
            <a href="${this.baseUrl}/blog/${year}/">
              <i class="fa-solid fa-calendar fa-sm"></i> ${year} </a>
        `;
        
        // Add tags if available
        if (post.tags && post.tags.length > 0) {
          html += `&nbsp; &middot; &nbsp;`;
          post.tags.forEach((tag, index) => {
            if (tag) { // Ensure tag is not null or undefined
              const highlightedTag = this.highlightText(tag, query);
              html += `
                <a href="${this.baseUrl}/blog/tag/${this.slugify(tag)}/">
                  <i class="fa-solid fa-hashtag fa-sm"></i> ${highlightedTag}</a>
              `;
              if (index < post.tags.length - 1) {
                html += `&nbsp;`;
              }
            }
          });
        }
        
        // Add categories if available
        if (post.categories && post.categories.length > 0) {
          html += `&nbsp; &middot; &nbsp;`;
          post.categories.forEach((category, index) => {
            if (category) { // Ensure category is not null or undefined
              const highlightedCategory = this.highlightText(category, query);
              html += `
                <a href="${this.baseUrl}/blog/category/${this.slugify(category)}/">
                  <i class="fa-solid fa-tag fa-sm"></i> ${highlightedCategory}</a>
              `;
              if (index < post.categories.length - 1) {
                html += `&nbsp;`;
              }
            }
          });
        }
        
        html += `</p>`;
        
        // Close the column if there's a thumbnail and add the thumbnail column
        if (post.thumbnail) {
          html += `
            </div>
            <div class="col-sm-3">
              <img class="card-img" src="${this.baseUrl}${post.thumbnail}" style="object-fit: cover; height: 90%" alt="image">
            </div>
          </div>
          `;
        }
        
        // Close the list item
        html += `</li>`;
      });
      
      html += '</ul>';
      this.resultsContainerElement.innerHTML = html;
    } catch (error) {
      console.error('Error rendering results:', error);
      this.resultsContainerElement.innerHTML = `<p class="search-no-results">Error rendering results: ${error.message}</p>`;
    }
  }

  resetSearch() {
    console.log('Resetting search');
    this.searchActive = false;
    
    if (this.loadingElement) {
      this.loadingElement.style.display = 'none';
    }
    
    this.resultsContainerElement.style.display = 'none';
    this.resultsContainerElement.innerHTML = '';
    
    if (this.postsContainerElement) {
      this.postsContainerElement.style.display = 'block';
      if (this.originalPosts) {
        this.postsContainerElement.innerHTML = this.originalPosts;
      }
    }
    
    if (this.paginationElement) {
      this.paginationElement.style.display = 'block';
      if (this.originalPagination) {
        this.paginationElement.innerHTML = this.originalPagination;
      }
    }
  }

  // Utility functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  slugify(text) {
    if (!text) return '';
    
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
}

// Initialize the search when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing blog search');
  const blogSearch = new BlogSearch();
}); 