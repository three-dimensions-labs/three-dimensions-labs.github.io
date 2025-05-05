---
layout: home
title: Home
permalink: /

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: false # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: true
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 1 # leave blank to include all the blog posts

latest_articles:
  - embed_code: <blockquote class="twitter-tweet"><p lang="en" dir="ltr">We are a team of scientists and engineers researching and implementing blockchain protocols.</p>&mdash; ThreeDimensionsLabs (@3DimensionsLabs) <a href="https://twitter.com/3DimensionsLabs/status/1916219744203469029?ref_src=twsrc%5Etfw">April 26, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
---

<header markdown="0" class="post-header">
  <h1 class="post-title">
    {% if site.title == 'blank' %}
      <span class="font-weight-bold">{{ site.first_name }}</span> {{ site.middle_name }}
      {{ site.last_name }}
    {% else %}
      {{ site.title }}
    {% endif %}
  </h1>
</header>

Welcome to **Three Dimensions Labs**, a research collective focused on advancing knowledge and tools in blockchain
infrastructure, distributed systems, and application security.

<div markdown="0" id="carousel" class="carousel slide" data-ride="carousel" data-interval="4000" data-pause="hover" >
    <!-- Menu -->
    <ol class="carousel-indicators">
        <li data-target="#carousel" data-slide-to="0" class="active"></li>
        <li data-target="#carousel" data-slide-to="1"></li>
        <li data-target="#carousel" data-slide-to="2"></li>
    </ol>

    <!-- Items -->
    <div class="carousel-inner" markdown="0">
        <div class="item active">
            <img src="assets/img/app_sec.jpg" alt="Slide 1" />
        </div>
        <div class="item">
            <img src="assets/img/block_infra.jpg" alt="Slide 2" />
        </div>
        <div class="item">
            <img src="assets/img/low_infra.jpg" alt="Slide 3" />
        </div>
    </div>

  <a class="left carousel-control" href="#carousel" role="button" data-slide="prev">
    <i class="fa fa-chevron-left"></i>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#carousel" role="button" data-slide="next">
    <i class="fa fa-chevron-right"></i>
    <span class="sr-only">Next</span>
  </a>
</div>

<script type="text/javascript">
  // Direct bootstrap carousel initialization
  (function() {
    // Try multiple approaches to initialize the carousel
    function initCarousel() {
      try {
        // Manual initialization with jQuery
        if (window.jQuery && typeof jQuery.fn.carousel === 'function') {
          jQuery('#carousel').carousel({
            interval: 4000,
            pause: 'hover'
          });
          console.log('Carousel initialized via jQuery plugin');
          return true;
        }
        return false;
      } catch(e) {
        console.error('Error initializing carousel:', e);
        return false;
      }
    }

    // Try immediately
    if (!initCarousel()) {
      // Try again when DOM is ready
      document.addEventListener('DOMContentLoaded', function() {
        if (!initCarousel()) {
          // Try one more time after a delay
          setTimeout(initCarousel, 2000);
        }
      });
      
      // Also try when window is fully loaded
      window.addEventListener('load', function() {
        setTimeout(initCarousel, 500);
      });
    }
  })();
</script>

<!-- Additional jQuery direct handler for carousel -->
<script>
document.write('<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"><\/script>');
document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"><\/script>');
document.write('<script>jQuery(document).ready(function($) { $("#carousel").carousel({interval: 4000, pause: "hover"}); });<\/script>');
</script>

### Our Mission

Our aim is to explore three fundamental dimensions of research:

1. **Blockchain Infrastructure** - Researching and developing solutions that address key blockchain infrastructure
   challenges in the areas of security, decentralization, and scalability.

2. **Distributed Systems** - Exploring the distributed protocols and infrastructure that underpin blockchain systems,
   including consensus mechanisms, peer-to-peer networking, data availability layers, distributed data stores, and
   synchronization techniques.

3. **Application Security** - Researching established security mechanisms such as formal verification, fuzz testing,
   runtime monitoring, static analysis, and threat modeling, and building tools to implement these techniques at scale.

### Our Approach

At Three Dimensions Labs, we believe in an
[open research model](https://www.reading.ac.uk/research/research-environment/open-research/open-research-details) that
combines rigorous research with practical implementation. Our work spans from theoretical contributions to 
production-ready code, with an emphasis on open-source contributions that benefit the entire blockchain ecosystem.

We collaborate closely with industry partners, academic institutions, and the broader developer community to ensure our
research addresses real-world challenges and creates meaningful impact.

### Current Projects

Our lab is currently focused on several groundbreaking initiatives:

- **Jakson** - Jakson is a modular, event-driven security dev-sec-ops infrastructure for smart contracts. It allows
  teams to integrate real-time code analysis, automated monitoring, and secure operational workflows into their smart
  contracts development and deployment lifecycles.

### Work With Us

**We're seeking passionate researchers, engineers, and thought leaders to join our mission.** Whether you're a
cryptographer, distributed systems engineer, economist, or security expert, we offer a collaborative environment to
tackle the most challenging problems in the blockchain space.

Interested in collaborating, supporting our research, or learning more about our work? Send us a message on
[X](https://x.com/3DimensionsLabs) to start a conversation.

[//]: # ([View Open Positions →]&#40;https://example.org/careers&#41;)

[//]: # (### Recent Publications)

[//]: # ()

[//]: # (Our team regularly publishes research in top-tier academic conferences and industry journals. View)

[//]: # (our [publications page]&#40;/publications/&#41; for our latest contributions to the field.)

[//]: # (### Connect With Us)

[//]: # ()

[//]: # (Interested in collaborating, supporting our research, or learning more about our work? [Contact us]&#40;#&#41; to start a)

[//]: # (conversation.)
