/**
 * Template Name: Personal - v4.8.1
 * Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  'use strict';

  /**
   * Easy selector helper function
   */
  function createProjects() {
    //Line 382 Iterating Through To Make Elements
    const projectsContainer =
      document.getElementsByClassName('projects-container')[0];

    const progressBarContainer1 =
      document.getElementsByClassName('progress-bars-1')[0];
    const progressBarContainer2 =
      document.getElementsByClassName('progress-bars-2')[0];

    const proficient =
      ' Javascript (node.js), Excel, Google Sheets / Documents, React, Redux, HTML 5 / CSS, JWT / bcrypt, PostgreSQL, Sequelize, Express, Howler, Microsoft word, PowerPoint, Outlook'.split(
        ','
      );

    const knowledgeable =
      'Ubuntu, PowerShell, AWS Cloud 9, React-collapse, webpack-cli, babel, React-bootstrap, Python'.split(
        ','
      );
    const projectsArray = [
      {
        name: 'THIS IS THE FIRST World',
        techStack: ['HTML5', 'CSS'],
        dateCompleted: '6/1/22',
      },
      {
        name: 'Second Project',
        techStack: ['CSS', 'React', 'Redux', 'Blah'],
        dateCompleted: '7/2/22',
      },
      {
        name: 'Third',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Fourth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Fifth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Sixth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Sixth',
        techStack: [
          'next',
          'react',
          'this',
          'a',
          'idk',
          'add more',
          'set another',
        ],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Sixth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Sixth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Sixth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Sixth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Sixth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Sixth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Sixth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Sixth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Sixth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Sixth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Sixth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
      {
        name: 'Sixth',
        techStack: ['next', 'react', 'this'],
        dateCompleted: '6/6/22',
      },
    ];

    let techMap = {};

    for (let i = 0; i < projectsArray.length; i++) {
      const p = projectsArray[i];

      const elements = `
      <div class=col-lg-3 col-md-4>
        <div class=icon-box>
          <i class=ri-store-line style=color: #ffbb2c;></i>
          <h3>${p.name}</h3>
      </div>
    </div>`;

      projectsContainer.innerHTML += elements;

      const techStack = p.techStack;

      for (let j = 0; j < techStack.length; j++) {
        const curVal = techStack[j];

        if (techMap[curVal]) techMap[curVal] = techMap[curVal] + 1;
        else techMap[curVal] = 1;
      }
    }
    const projectCount = document.getElementById('project-counter');
    const knowCount = document.getElementById('knowledgeable-counter');
    const profCount = document.getElementById('proficient-counter');

    projectCount.setAttribute(
      'data-purecounter-end',
      `${projectsArray.length}`
    );
    knowCount.setAttribute('data-purecounter-end', `${knowledgeable.length}`);
    profCount.setAttribute('data-purecounter-end', `${proficient.length}`);

    const sortedMap = Object.entries(techMap).sort((a, b) => b[1] - a[1]);
    techMap = {};

    for (let k = 0; k < sortedMap.length; k++) {
      const curVal = sortedMap[k];
      techMap[curVal[0]] = curVal[1];
    }

    //progressBars
    let counter = 0;
    for (let key in techMap) {
      const progressBars = `<div class=progress>
      <span class=skill>${key}<i class=val># Projects Skill Used: ${
        techMap[key]
      }
      </i></span>
      <div class=progress-bar-wrap>
        <div class=progress-bar role=progressbar aria-valuenow=${
          (techMap[key] / projectsArray.length) * 100
        }
         aria-valuemin=0 aria-valuemax=${projectsArray.length}></div>
      </div>
    </div>`;

      counter++;

      if (counter <= (knowledgeable.length + proficient.length) / 2) {
        progressBarContainer1.innerHTML += progressBars;
      } else progressBarContainer2.innerHTML += progressBars;
    }
  }

  const coll = document.getElementsByClassName('collapsible');
  const video = document.getElementById('google-sheets-video');

  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener('click', function () {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
        coll[i].innerText = 'Open Video';
        video.contentWindow.postMessage(
          '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
          '*'
        );
      } else {
        coll[i].innerText = 'Close Video';
        content.style.display = 'block';
        video.contentWindow.postMessage(
          '{"event":"command","func":"' + 'playVideo' + '","args":""}',
          '*'
        );
      }
    });
  }
  createProjects();
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /**
   * Scrool with ofset on links with a class name .scrollto */
  on(
    'click',
    '#navbar .nav-link',
    function (e) {
      let section = select(this.hash);
      if (section) {
        e.preventDefault();

        let navbar = select('#navbar');
        let header = select('#header');
        let sections = select('section', true);
        let navlinks = select('#navbar .nav-link', true);

        navlinks.forEach((item) => {
          item.classList.remove('active');
        });

        this.classList.add('active');

        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          let navbarToggle = select('.mobile-nav-toggle');
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }

        if (this.hash == '#header') {
          header.classList.remove('header-top');
          sections.forEach((item) => {
            item.classList.remove('section-show');
          });
          return;
        }

        if (!header.classList.contains('header-top')) {
          header.classList.add('header-top');
          setTimeout(function () {
            sections.forEach((item) => {
              item.classList.remove('section-show');
            });
            section.classList.add('section-show');
          }, 350);
        } else {
          sections.forEach((item) => {
            item.classList.remove('section-show');
          });
          section.classList.add('section-show');
        }

        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash);

      if (initial_nav) {
        let header = select('#header');
        let navlinks = select('#navbar .nav-link', true);

        header.classList.add('header-top');

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        setTimeout(function () {
          initial_nav.classList.add('section-show');
        }, 350);

        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  console.log('SKIL', skilsContent);

  if (skilsContent) {
    console.log('SKILS EXIST', skilsContent);
    const WP = new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      },
    });
    console.log('WAYPOINT', WP);
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on(
        'click',
        '#portfolio-flters li',
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');

          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter'),
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox',
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh',
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();
