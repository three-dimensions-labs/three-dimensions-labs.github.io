// Bootstrap Carousel Initialization
(function($) {
  // Function to initialize carousel
  function initializeCarousel() {
    if (typeof $.fn.carousel === 'function') {
      console.log('Initializing carousel from external script');
      $('#carousel').carousel({
        interval: 4000,
        pause: 'hover'
      });
      
      // Add event handlers for manual control
      $('.carousel-control.left').click(function(e){
        e.preventDefault();
        $('#carousel').carousel('prev');
      });
      
      $('.carousel-control.right').click(function(e){
        e.preventDefault();
        $('#carousel').carousel('next');
      });
      
      $('.carousel-indicators li').click(function(e){
        e.preventDefault();
        $('#carousel').carousel($(this).data('slide-to'));
      });
      
      return true;
    }
    return false;
  }

  // Try multiple times to ensure carousel is initialized
  $(document).ready(function() {
    if (!initializeCarousel()) {
      console.log('Trying carousel init again after delay');
      setTimeout(initializeCarousel, 1000);
    }
  });

  $(window).on('load', function() {
    setTimeout(initializeCarousel, 500);
  });
})(jQuery); 