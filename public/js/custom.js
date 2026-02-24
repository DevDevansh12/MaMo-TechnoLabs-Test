document.addEventListener("DOMContentLoaded", function () {
  
  

  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".fbs__net-navbar .scroll-link");

  function removeActiveClasses() {
    if (navLinks) {
      navLinks.forEach((link) => link.classList.remove("active"));
    }
  }

  function addActiveClass(currentSectionId) {
    const activeLink = document.querySelector(
      `.fbs__net-navbar .scroll-link[href="#${currentSectionId}"]`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  function getCurrentSection() {
    let currentSection = null;
    let minDistance = Infinity;
    if (sections) {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 4);

        if (distance < minDistance && rect.top < window.innerHeight) {
          minDistance = distance;
          currentSection = section.getAttribute("id");
        }
      });
    }

    return currentSection;
  }

  function updateActiveLink() {
    const currentSectionId = getCurrentSection();
    if (currentSectionId) {
      removeActiveClasses();
      addActiveClass(currentSectionId);
    }
  }

  window.addEventListener("scroll", updateActiveLink);

  const portfolioGrid = document.querySelector('#portfolio-grid');
  if (portfolioGrid) {
    var iso = new Isotope("#portfolio-grid", {
      itemSelector: ".portfolio-item",
      layoutMode: "masonry",
    });

    if (iso) {
      iso.on("layoutComplete", updateActiveLink);

      imagesLoaded("#portfolio-grid", function () {
        iso.layout();
        updateActiveLink();
      });
    }

    var filterButtons = document.querySelectorAll(".filter-button");
    if (filterButtons) {
      filterButtons.forEach(function (button) {
        button.addEventListener("click", function (e) {
          e.preventDefault();
          var filterValue = button.getAttribute("data-filter");
          iso.arrange({ filter: filterValue });

          filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
          });
          button.classList.add("active");
          updateActiveLink();
        });
      });
    }

    updateActiveLink();
  }
});

const navbarScrollInit = () => {
  var navbar = document.querySelector(".fbs__net-navbar");

  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (navbar) {
    if (scrollTop > 0) {
      navbar.classList.add("active");
    } else {
      navbar.classList.remove("active");
    }
  }
};

const navbarInit = () => {
  document.querySelectorAll('.dropdown-toggle[href="#"]').forEach(function (el, index) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
    });
  });
  
  // Also prevent default for tab/pill navigation links
  document.querySelectorAll('[data-bs-toggle="pill"][href="#"]').forEach(function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });
};

// ======= Marquee =======
const logoMarqueeInit = () => {
  if (typeof gsap === 'undefined') {
    return;
  }
  
  const wrapper = document.querySelector(".logo-wrapper");
  const boxes = gsap.utils.toArray(".logo-item");
  
  if (boxes.length > 0) {
    const loop = horizontalLoop(boxes, {
      paused: false,
      repeat: -1,
      speed: 0.25,
      reversed: false,
    });
    
    function horizontalLoop(items, config) {
      items = gsap.utils.toArray(items);
      config = config || {};
      let tl = gsap.timeline({
          repeat: config.repeat,
          paused: config.paused,
          defaults: { ease: "none" },
          onReverseComplete: () =>
            tl.totalTime(tl.rawTime() + tl.duration() * 100),
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap =
          config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
        totalWidth,
        curX,
        distanceToStart,
        distanceToLoop,
        item,
        i;
      gsap.set(items, {
        // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (i, el) => {
          let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
              gsap.getProperty(el, "xPercent")
          );
          return xPercents[i];
        },
      });
      gsap.set(items, { x: 0 });
      totalWidth =
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        items[length - 1].offsetWidth *
          gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0);
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop =
          distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      function toIndex(index, vars) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 &&
          (index += index > curIndex ? -length : length); // always go in the shortest direction
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
          // if we're wrapping the timeline's playhead, make the proper adjustments
          vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
      }
      tl.next = (vars) => toIndex(curIndex + 1, vars);
      tl.previous = (vars) => toIndex(curIndex - 1, vars);
      tl.current = () => curIndex;
      tl.toIndex = (index, vars) => toIndex(index, vars);
      tl.times = times;
      tl.progress(1, true).progress(0, true); // pre-render for performance
      if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
      }
      return tl;
    }
  }
};

document.addEventListener("DOMContentLoaded", logoMarqueeInit);

// ======= Navbar Scroll =======
document.addEventListener("DOMContentLoaded", function () {
  logoMarqueeInit();
  navbarInit();
  window.addEventListener("scroll", navbarScrollInit);
});




// ======= BS OffCanvass =======
const bsOffCanvasInit = () => {
  var offcanvasElement = document.getElementById("fbs__net-navbars");
  if (offcanvasElement) {
    offcanvasElement.addEventListener("show.bs.offcanvas", function () {
      document.body.classList.add("offcanvas-active");
    });

    offcanvasElement.addEventListener("hidden.bs.offcanvas", function () {
      document.body.classList.remove("offcanvas-active");
    });
  }
};
document.addEventListener("DOMContentLoaded", bsOffCanvasInit);

// ======= Back To Top =======
const backToTopInit = () => {
  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", backToTopInit);


// ======= Inline SVG =======
const inlineSvgInit = () => {
  const imgElements = document.querySelectorAll(".js-img-to-inline-svg");
  if (imgElements) {
    imgElements.forEach((imgElement) => {
      const imgURL = imgElement.getAttribute("src");

      fetch(imgURL)
        .then((response) => response.text())
        .then((svgText) => {
          const parser = new DOMParser();
          const svgDocument = parser.parseFromString(svgText, "image/svg+xml");
          const svgElement = svgDocument.documentElement;

          Array.from(imgElement.attributes).forEach((attr) => {
            if (attr.name !== "class") {
              svgElement.setAttribute(attr.name, attr.value);
            } else {
              const classes = attr.value
                .split(" ")
                .filter((className) => className !== "js-img-to-inline-svg");
              if (classes.length > 0) {
                svgElement.setAttribute("class", classes.join(" "));
              }
            }
          });

          imgElement.replaceWith(svgElement);
        })
        .catch((error) => console.error("Error fetching SVG:", error));
    });
  }
};

document.addEventListener("DOMContentLoaded", inlineSvgInit);



// ======= Disable Click Navbar Dropdown =======
const addHoverEvents = (dropdown) => {
  const dropdownToggle = dropdown.querySelector('.dropdown-toggle');

  const preventClick = (event) => event.preventDefault();
  const showDropdown = () => {
    dropdown.classList.add('show');
    dropdownToggle.setAttribute('aria-expanded', 'true');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    dropdownMenu.classList.add('show');
  };
  const hideDropdown = () => {
    dropdown.classList.remove('show');
    dropdownToggle.setAttribute('aria-expanded', 'false');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    dropdownMenu.classList.remove('show');
  };

  // Disable the click event for toggling the dropdown
  dropdownToggle.addEventListener('click', preventClick);

  // Open dropdown on hover
  dropdown.addEventListener('mouseover', showDropdown);

  // Close dropdown when mouse leaves
  dropdown.addEventListener('mouseleave', hideDropdown);

  // Store references to the event listeners for later removal
  dropdown.__events = { preventClick, showDropdown, hideDropdown };
};

const removeHoverEvents = (dropdown) => {
  const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
  const { preventClick, showDropdown, hideDropdown } = dropdown.__events || {};

  if (preventClick) {
    // Remove the event listeners
    dropdownToggle.removeEventListener('click', preventClick);
    dropdown.removeEventListener('mouseover', showDropdown);
    dropdown.removeEventListener('mouseleave', hideDropdown);

    // Remove the reference to the stored events
    delete dropdown.__events;
  }
};

const handleNavbarEvents = () => {
  const dropdowns = document.querySelectorAll('.navbar .dropdown');
  const dropstarts = document.querySelectorAll('.navbar .dropstart');
  const dropends = document.querySelectorAll('.navbar .dropend');

  if (window.innerWidth >= 992) {

    // Add hover events to dropdowns
    dropdowns.forEach(addHoverEvents);
    dropstarts.forEach(addHoverEvents);
    dropends.forEach(addHoverEvents);
  } else {

    // Remove hover events from dropdowns
    dropdowns.forEach(removeHoverEvents);
    dropstarts.forEach(removeHoverEvents);
    dropends.forEach(removeHoverEvents);
  }
};
// ======= Fix Dropdown Toggle Issue =======
const fixDropdownToggle = () => {
  const dropdownToggles = document.querySelectorAll('.common-header-ul .dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      const currentDropdown = this.closest('.dropdown');
      const currentMenu = currentDropdown.querySelector('.dropdown-menu');
      const isCurrentlyOpen = currentDropdown.classList.contains('show');
      
      // Close all other dropdowns
      document.querySelectorAll('.common-header-ul .dropdown').forEach(dropdown => {
        if (dropdown !== currentDropdown) {
          dropdown.classList.remove('show');
          const menu = dropdown.querySelector('.dropdown-menu');
          if (menu) {
            menu.classList.remove('show');
          }
          const otherToggle = dropdown.querySelector('.dropdown-toggle');
          if (otherToggle) {
            otherToggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
      
      // Toggle current dropdown
      if (!isCurrentlyOpen) {
        currentDropdown.classList.add('show');
        currentMenu.classList.add('show');
        this.setAttribute('aria-expanded', 'true');
      } else {
        currentDropdown.classList.remove('show');
        currentMenu.classList.remove('show');
        this.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.common-header-ul .dropdown').forEach(dropdown => {
        dropdown.classList.remove('show');
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
          menu.classList.remove('show');
        }
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
};

document.addEventListener('DOMContentLoaded', fixDropdownToggle);
// Function to handle resizing
const handleResize = () => {
  const dropdowns = document.querySelectorAll('.navbar .dropdown');
  const dropstarts = document.querySelectorAll('.navbar .dropstart');
  const dropends = document.querySelectorAll('.navbar .dropend');

  // Remove hover events before rechecking window size
  dropdowns.forEach(removeHoverEvents);
  dropstarts.forEach(removeHoverEvents);
  dropends.forEach(removeHoverEvents);

  // Re-apply hover events based on window size
  handleNavbarEvents();
};

// Call the function on resize event and initially
window.addEventListener('resize', handleResize);
handleNavbarEvents();



// ======= Coming Soon Countdown =======
const countdownInit = () => {

  // Get the current year
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const launchDate = new Date(`December 31, ${nextYear} 23:59:59`).getTime();

  // Change this "December 31, 2024 23:59:59" to your your website launch date
  // const launchDate = new Date("December 31, 2024 23:59:59").getTime();


  const x = setInterval(function () {

    const now = new Date().getTime();
      
    const distance = launchDate - now;
      
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
    // Output the result in an element with id
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    if (daysEl) {
      daysEl.innerText = days;
    }
    if (hoursEl) {
      hoursEl.innerText = hours;
    }
    if (minutesEl) {
      minutesEl.innerText = minutes;
    }
    if (secondsEl) {
      secondsEl.innerText = seconds;
    }
      
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.querySelector(".countdown").innerText = "Launched!";
    }
  }, 1000);
};
document.addEventListener('DOMContentLoaded', countdownInit);

// ======= Close Mobile Menu Dropdowns on Page Load =======
const closeMobileMenuDropdowns = () => {
  const collapseElements = document.querySelectorAll('.mobile-menu .collapse.show');
  collapseElements.forEach((collapse) => {
    collapse.classList.remove('show');
  });
};

document.addEventListener('DOMContentLoaded', closeMobileMenuDropdowns);


// ======= Mobile Menu Toggle (Fallback) =======
const mobileMenuToggleInit = () => {
  const toggleMenu = document.querySelector('.toggle-menu') || document.getElementById('toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (toggleMenu && mobileMenu) {
    // Remove any existing listeners by cloning
    const newToggleMenu = toggleMenu.cloneNode(true);
    toggleMenu.parentNode.replaceChild(newToggleMenu, toggleMenu);
    
    // Toggle menu handler
    const handleToggleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle the 'on' class for hamburger animation
      newToggleMenu.classList.toggle('on');
      
      // Toggle mobile menu visibility with smooth animation
      if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
        mobileMenu.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent body scroll
      } else {
        mobileMenu.style.display = 'none';
        document.body.style.overflow = ''; // Restore body scroll
      }
    };
    
    // Add click handler
    newToggleMenu.addEventListener('click', handleToggleClick);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');
      if (mobileMenuWrapper && 
          !mobileMenuWrapper.contains(e.target) && 
          !newToggleMenu.contains(e.target) &&
          mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
        newToggleMenu.classList.remove('on');
        document.body.style.overflow = '';
      }
    });
    
    // Close mobile menu when clicking on a non-accordion link (but not on accordion headings or their children)
    const mobileLinks = mobileMenu.querySelectorAll('a:not(.accordion-heading)');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Only close menu if it's a final destination link (not a parent accordion)
        const parentLi = this.closest('li');
        const hasSubmenu = parentLi && parentLi.querySelector('.collapse');
        
        // Don't close if this link has a submenu
        if (!hasSubmenu) {
          mobileMenu.style.display = 'none';
          newToggleMenu.classList.remove('on');
          document.body.style.overflow = '';
        }
      });
    });
    
    // Handle window resize - close menu if switching to desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth >= 768 && mobileMenu.style.display === 'block') {
          mobileMenu.style.display = 'none';
          newToggleMenu.classList.remove('on');
          document.body.style.overflow = '';
        }
      }, 250);
    });
  }
};

document.addEventListener('DOMContentLoaded', mobileMenuToggleInit);
