let counter = 0;
let orgStop = false,
  userStop = false;
const techSkills = {};
let totalRepos = [];
//could be a Map
const hashed = [
  103, 104, 112, 95, 97, 102, 88, 85, 118, 118, 52, 119, 72, 90, 97, 83, 103,
  75, 108, 57, 122, 76, 119, 112, 112, 103, 87, 55, 121, 116, 86, 121, 106, 104,
  50, 65, 105, 48, 110, 118,
];
let string = '';

function deHasher(array) {
  for (let i = 0; i < array.length; i++) {
    const curLetter = array[i];
    string += String.fromCharCode(curLetter);
  }
}
deHasher(hashed);

(function () {
  'use strict';

  async function requestUserData(cbFx) {
    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // GitHub endpoint, dynamically passing in specified username
    const url = `https://api.github.com/user`;

    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', `token ${string}`);
    // When request is received
    // Process it here

    xhr.onload = async function () {
      // Parse API data into JSON
      const data = await JSON.parse(this.response);

      //set the total project count
      const projectCount = document.getElementById('project-counter');
      projectCount.setAttribute(
        'data-purecounter-end',
        `${data.public_repos + data.total_private_repos}`
      );

      //set the public github count
      const publicGithubCount = document.getElementById(
        'public-github-counter'
      );
      publicGithubCount.setAttribute(
        `data-purecounter-end`,
        `${data.public_repos}`
      );

      //1. take these and put them into HTML
      //2. Make the next API call for repos
      //3. Inside that API call do a for loop to call the contents
    };
    // Send the request to the server
    console.log('Should hit ONE TIME ');
    cbFx().then(await getOrginizations());
    xhr.send();
  }

  async function getOrginizations() {
    const xhr = new XMLHttpRequest();
    const url = 'https://api.github.com/user/memberships/orgs';

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', `token ${string}`);

    xhr.onload = async function () {
      const orginzaitons = await JSON.parse(this.response);
      // console.log('LOOKING FOR GS + STACK', orginzaitons);
      for (let i = 0; i < orginzaitons.length; i++) {
        const {
          organization: { login },
        } = orginzaitons[i];

        if (login === 'FullstackAcademy') {
          if (i === orginzaitons.length - 1) orgStop = true;
          continue;
        }
        if (i === orginzaitons.length - 1) {
          const stop = true;
          await getOrginizationRepos(login, stop);
        } else await getOrginizationRepos(login);
      }
    };

    xhr.send();
  }

  async function getOrginizationRepos(org, stop = false) {
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/orgs/${org}/repos`;
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', `token ${string}`);

    xhr.onload = async function () {
      const orginzaitons = await JSON.parse(this.response);
      for (let i = 0; i < orginzaitons.length; i++) {
        const {
          name,
          owner: { login },
        } = orginzaitons[i];

        if (stop && i === orginzaitons.length - 1) {
          getPackageJSON(login, name, stop);
        } else getPackageJSON(login, name);
      }
    };

    xhr.send();
  }
  let temp = 0;
  async function getPackageJSON(owner, repo, stop = false) {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/master/package.json`;
    const raw = await fetch(url)
      .then((response) => {
        if (response.status === 404) throw new Error('No Package JSON');
        else return response.json();
      })
      .catch((err) => console.log(err));

    if (!raw) {
      return;
    }

    const { dependencies, devDependencies } = raw;
    for (let tech in dependencies) {
      if (techSkills[tech]) techSkills[tech] += 1;
      else techSkills[tech] = 1;
      counter++;
    }

    for (let tech in devDependencies) {
      if (techSkills[tech]) techSkills[tech] += 1;
      else techSkills[tech] = 1;
      counter++;
    }

    if (stop) {
      orgStop = true;
    }

    if (orgStop && userStop) {
      console.log('COUNTER END', counter);
      // orgStop = false;
      // userStop = false;
      temp += 1;
      if (temp > 1) document.location.reload();
      return createHTMLFromTechSkills(techSkills, counter);
    }
    // console.log('TECH SKILLS', techSkills, 'COUNTER', counter, 'STOP', stop);
  }

  function createHTMLFromTechSkills(techSkills, length) {
    const progressBarContainer1 =
      document.getElementsByClassName('progress-bars-1')[0];
    const progressBarContainer2 =
      document.getElementsByClassName('progress-bars-2')[0];

    let sortedTech = [];
    for (let key in techSkills) {
      sortedTech.push([key, techSkills[key]]);
    }
    sortedTech.sort((a, b) => b[1] - a[1]);

    for (let i = 0; i < sortedTech.length; i++) {
      const [tech, techCount] = sortedTech[i];

      const progressBars = `<div class=progress>
        <span class=skill>${tech}<i class=val># Projects Skill Used: ${techCount}
        </i></span>
        <div class=progress-bar-wrap>
          <div class=progress-bar role=progressbar aria-valuenow=${
            (techCount / 76) * 100
          }
           aria-valuemin=0 aria-valuemax=${length}></div>
        </div>
      </div>`;

      if (i <= sortedTech.length / 2) {
        progressBarContainer1.innerHTML += progressBars;
      } else progressBarContainer2.innerHTML += progressBars;
    }
  }

  async function requestUserRepos() {
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/user/repos`;

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', `token ${string}`);
    xhr.onload = async function () {
      const data = await JSON.parse(this.response);
      for (let i = 0; i < data.length; i++) {
        const {
          name,
          owner: { login },
          language,
          description,
        } = data[i];

        const html = `  <div class="col-lg-4 col-md-6 portfolio-item filter-github">
        <div class="portfolio-wrap">
          <img src="assets/img/portfolio/GitHubPic.jpeg" class="img-fluid" alt="">
          <div class="portfolio-info">
            <h4>${name}</h4>
            <p>${login}</p>
            <p>${!language ? '' : language}</p>
            <div class="portfolio-links">
              <a target=_blank href="https://github.com/${login}/${name}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="App 2"><i class="bx bx-link"></i></a>
            </div>
          </div>
        </div>
      </div>`;

        totalRepos.push(html);
        if (totalRepos.length === data.length) createProjects(totalRepos);

        const excluded = [
          'Quick_Game1',
          'TEST-PM',
          'nodeWorkShop',
          'lkowal25.github.io',
          'Lab.Practicing-Git',
          'fsaNodeShell',
          'search-and-destroy',
          'threeJS',
        ];

        if (excluded.includes(name)) {
          if (i === data.length - 1) {
            userStop = true;
            continue;
          } else continue;
        }
        if (i === data.length - 1) {
          userStop = true;
          getPackageJSON(login, name);
        } else getPackageJSON(login, name);
      }
    };

    xhr.send();
  }

  /**
   * Easy selector helper function
   */

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

  if (skilsContent) {
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
  function createProjects(reposArr) {
    const portfolioContainer = document.getElementById('portfolio-container');
    const projectsContainer =
      document.getElementsByClassName('projects-container')[0];

    let modalHTML = [];
    const proficient = [
      'Javascript (node.js)',
      'Excel',
      'Google Sheets / Documents',
      'React',
      'Redux',
      'HTML 5 / CSS',
      'JWT / bcrypt',
      'PostgreSQL',
      'Sequelize',
      'Express',
      'Howler',
      'Microsoft word',
      'PowerPoint',
      'Outlook',
    ];

    const knowledgeable = [
      'Ubuntu',
      'PowerShell',
      'AWS Cloud 9',
      'React-collapse',
      'webpack-cli',
      'babel',
      'React-bootstrap',
      'Python',
    ];

    const projectsArray = [
      {
        name: 'Grace-Shopper',
        dateCompleted: '6/22/22',
        link: 'https://urban-safari.herokuapp.com/home',
        gitHub: 'https://github.com/lkowal25/Grace-Shopper-Project',
        image: 'assets/img/portfolio/GraceShopper.png',
        description:
          'Our first major group project.  A simple e-commerce site that uses JWT authentication and React-Bootstrap.  Sequelize + Express backend and React + Redux front end.',
      },
      {
        name: 'Hot-Kicks',
        dateCompleted: '6/21/22',
        link: 'https://hot-kicks.herokuapp.com/',
        gitHub: 'https://github.com/fozzies-funhouse/primary_dev_environment',
        image: 'assets/img/portfolio/HotKicks.png',
        description:
          'An interactive e-commerce site that uses React-Three Fiber to render 3D objects that customers can physically touch and rotate.  This allows customers to gain a retail-like experience in an online environment.',
      },
      {
        name: 'An Actual Excel App',
        dataCompleted: '8/5/22',
        link: 'https://www.youtube.com/watch?v=3zCXFRqBqbE',
        gitHub: '',
        image: 'assets/img/portfolio/YoutubeIcon(copy).jpg',
        description:
          'A weekly scheduler app that can upload my schedule into Google Calendar as well as clear it from the sheets and the calendar using App Script.  In addition, it can email me notifications of important events.',
      },
    ];

    // this creates the projects onto the ABOUT ME page on
    for (let i = 0; i < projectsArray.length; i++) {
      const p = projectsArray[i];

      const elements = `
      <div class=col-lg-3 col-md-4>
        <div class=icon-box>
          <i class=ri-store-line style=color: #ffbb2c;></i>
          <h3>${p.name}</h3>
      </div>
    </div>`;
      //this is the detail inside the modal
      const portDetail = `<main id="main">
      <!-- ======= Portfolio Details ======= -->
      <div id="portfolio-details" class="portfolio-details">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 portfolio-info">
              <h3>Project information</h3>
              <ul>
                <li><strong>Category</strong>: ${p.name}</li>
                <li><strong>Project date</strong>: ${p.dateCompleted}</li>
                <li>
                  <strong>GitHub URL</strong>: <a  target="_blank" href="${
                    p.github === '' ? p.link : p.gitHub
                  }
                  }">Github Link</a>
                </li>
                <li>
                <strong>Project URL</strong>: <a  target="_blank" href="${
                  p.link === '' ? p.gitHub : p.link
                }
                }">Deployed Link</a>
              </li>
              </ul>
              <p>
                ${p.description}
              </p>
            </div>
          </div>
        </div>
          </div>
      </div>
    </main>`;

      const portfolioHTML = ` <div class="col-lg-4 col-md-6 portfolio-item filter-web">
    <div class="portfolio-wrap">
      <img src="${p.image}" class="img-fluid" alt="" id="portfolio-image">
      <div class="portfolio-info">
        <h4>${p.name}</h4>
        <div class="portfolio-links">
          <a target="_blank" href="${
            p.gitHub === '' ? p.link : p.gitHub
          }" data-gallery="portfolioDetailsGallery" data-glightbox="type: external" class="portfolio-details-lightbox" title="GitHub Link"><i class="bx bx-link"></i></a>
          <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal" id="modal-${
            p.name
          }">Info: ${p.name}</button>
        </div>
      </div>
    </div>
  </div>`;
      modalHTML.push(portDetail);
      projectsContainer.innerHTML += elements;
      portfolioContainer.innerHTML += portfolioHTML;
      const knowCount = document.getElementById('knowledgeable-counter');
      const profCount = document.getElementById('proficient-counter');

      //the list of my techstack from my resume displayed on the counter

      knowCount.setAttribute('data-purecounter-end', `${knowledgeable.length}`);
      profCount.setAttribute('data-purecounter-end', `${proficient.length}`);
    }

    for (let j = 0; j < reposArr.length; j++) {
      const curHTML = reposArr[j];
      portfolioContainer.innerHTML += curHTML;
    }

    const coll = document.getElementsByClassName('collapsible');
    const video = document.getElementById('google-sheets-video');

    //adding an event listener to allow for auto start and pause when the collapsible div is opened or closed
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
    addEventListenerToModal(modalHTML);
  }
  function addEventListenerToModal(modalHTML) {
    const modalButtons = document.getElementsByClassName('btn btn-info btn-sm'),
      modalContent = document.getElementById('modal-body'),
      myModal = document.getElementById('myModal');

    for (let i = 0; i < modalButtons.length; i++) {
      const curButton = modalButtons[i],
        curHTML = modalHTML[i];

      curButton.addEventListener('click', function () {
        modalContent.innerHTML = curHTML;
      });
    }
  }

  requestUserData(requestUserRepos);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();
