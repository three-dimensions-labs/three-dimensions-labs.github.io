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

Welcome to **Three Dimensions Labs**, a pioneering research collective at the intersection of distributed systems,
cryptography, and economic mechanism design. Based at the [Digital Futures Institute](https://example.org), we're
pushing the boundaries of what's possible in the decentralized world.

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

We explore three fundamental research pillars:

1. **Scaling Blockchain Infrastructure** - Developing layer-1 and layer-2 solutions that address the blockchain trilemma
   of security, decentralization, and scalability.

2. **Zero-Knowledge Applications** - Creating privacy-preserving protocols and applications using zero-knowledge proofs
   that maintain transparency while protecting sensitive data.

3. **Tokenomics & Governance Systems** - Designing economic models and governance frameworks that align incentives
   across decentralized networks and foster sustainable ecosystems.

### Current Projects

Our lab is currently focused on several groundbreaking initiatives:

- **ZK-Rollup Optimization Framework** - A toolkit for efficiently designing and deploying optimized zero-knowledge
  rollups
- **Quantum-Resistant Consensus Mechanisms** - Future-proofing blockchain technology against quantum computing threats
- **Decentralized Identity Solutions** - Self-sovereign identity systems that preserve privacy while enabling verifiable
  credentials
- **Cross-Chain Interoperability Protocols** - Bridging disparate blockchain ecosystems through secure, efficient
  message passing

### Our Approach

We believe in an open research model that combines rigorous academic inquiry with practical implementation. Our work
spans from theoretical foundations to production-ready code, with an emphasis on open-source contributions that benefit
the entire blockchain ecosystem.

We collaborate closely with industry partners, academic institutions, and the broader developer community to ensure our
research addresses real-world challenges and creates meaningful impact.

### Join Our Team

**We're seeking passionate researchers, engineers, and thought leaders to join our mission.** Whether you're a
cryptographer, distributed systems engineer, economist, or security expert, we offer a collaborative environment to
tackle the most challenging problems in the blockchain space.

[View Open Positions →](https://example.org/careers)

### Recent Publications

Our team regularly publishes research in top-tier academic conferences and industry journals. View
our [publications page](/publications/) for our latest contributions to the field.

### Connect With Us

Interested in collaborating, supporting our research, or learning more about our work? [Contact us](#) to start a
conversation.
