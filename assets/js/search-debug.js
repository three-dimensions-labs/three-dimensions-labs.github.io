/**
 * Search Debug Utility
 * This script helps debug issues with the blog search functionality
 */
(function() {
  console.log('Search debug script loaded');
  
  // Check if DOM is already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDebug);
  } else {
    initDebug();
  }
  
  function initDebug() {
    console.log('Initializing search debug utility');
    
    // Check if search elements exist
    const searchInput = document.querySelector('#blog-search-input');
    const searchResults = document.querySelector('#blog-search-results');
    const searchLoading = document.querySelector('#blog-search-loading');
    
    if (searchInput) {
      console.log('✅ Search input found');
    } else {
      console.error('❌ Search input not found');
    }
    
    if (searchResults) {
      console.log('✅ Search results container found');
    } else {
      console.error('❌ Search results container not found');
    }
    
    if (searchLoading) {
      console.log('✅ Search loading indicator found');
    } else {
      console.error('❌ Search loading indicator not found');
    }
    
    // Add a test button to fetch search data directly
    const searchContainer = document.querySelector('.blog-search-container');
    if (searchContainer) {
      const testButton = document.createElement('button');
      testButton.textContent = 'Test Search Data';
      testButton.style.marginTop = '10px';
      testButton.style.padding = '5px 10px';
      testButton.style.backgroundColor = '#f0f0f0';
      testButton.style.border = '1px solid #ddd';
      testButton.style.borderRadius = '4px';
      testButton.style.cursor = 'pointer';
      
      testButton.addEventListener('click', async () => {
        console.log('Testing search data');
        try {
          if (searchLoading) {
            searchLoading.style.display = 'block';
          }
          
          const baseUrl = document.querySelector('base')?.getAttribute('href') || '';
          const searchUrl = window.location.origin + (baseUrl || '') + '/search_data.json';
          console.log('Fetching from:', searchUrl);
          
          const response = await fetch(searchUrl);
          if (!response.ok) {
            throw new Error(`Failed to fetch search data: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          console.log('Search data loaded successfully!');
          console.log(`Found ${data.length} posts`);
          console.log('First post:', data[0]);
          
          if (searchLoading) {
            searchLoading.innerHTML = `
              <div style="padding: 15px; background-color: #d4edda; color: #155724; border-radius: 4px; margin-top: 15px;">
                Search data loaded successfully! Found ${data.length} posts.
              </div>
            `;
          }
        } catch (error) {
          console.error('Error testing search data:', error);
          if (searchLoading) {
            searchLoading.innerHTML = `
              <div style="padding: 15px; background-color: #f8d7da; color: #721c24; border-radius: 4px; margin-top: 15px;">
                Error: ${error.message}
              </div>
            `;
            searchLoading.style.display = 'block';
          }
        }
      });
      
      searchContainer.appendChild(testButton);
      console.log('✅ Debug test button added');
    } else {
      console.error('❌ Search container not found, cannot add test button');
    }
    
    // Check if search script is loaded
    if (typeof BlogSearch !== 'undefined') {
      console.log('✅ BlogSearch class is defined');
    } else {
      console.error('❌ BlogSearch class is not defined. The blog-search.js script may not be loaded correctly.');
    }
    
    // Check for any JavaScript errors
    window.addEventListener('error', function(event) {
      console.error('JavaScript error in search functionality:', event.message);
    });
  }
})(); 