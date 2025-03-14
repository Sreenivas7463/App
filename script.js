
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const searchInput = document.querySelector('.search-input');
  const exploreButton = document.querySelector('.cta-button');
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  // Show/hide scroll to top button
  window.addEventListener('scroll', () => {
    const halfPageHeight = document.documentElement.scrollHeight / 2;
    if (window.scrollY > halfPageHeight) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Handle smooth scrolling and remove hash
  function smoothScroll(e, element) {
    e.preventDefault();
    const href = element.getAttribute('href');
    const targetId = href.replace('#', '');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      history.pushState({}, '', window.location.pathname);
    }
  }

  // Handle Explore Courses button click
  exploreButton.addEventListener('click', function(e) {
    navLinks.forEach(link => link.classList.remove('active'));
    const coursesLink = document.querySelector('.nav-links a[href="#courses"]');
    coursesLink.classList.add('active');
    smoothScroll(e, coursesLink);
  });

  // Handle navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      smoothScroll(e, this);
    });
  });
  
  // Course suggestions data
  const courses = [
    'PHP with MySQL',
    'Graphic Design',
    'Web Development',
    'UI/UX Design',
    'JavaScript Development',
    'Python Programming',
    'Digital Marketing',
    'Front-end Development',
    'Back-end Development',
    'Mobile App Development'
  ];

  // Create suggestions container
  const suggestionsContainer = document.createElement('div');
  suggestionsContainer.className = 'search-suggestions';
  searchInput.parentNode.appendChild(suggestionsContainer);

  // Handle search input
  searchInput.addEventListener('input', function(e) {
    const value = e.target.value.toLowerCase();
    suggestionsContainer.innerHTML = '';
    
    if (value.length > 0) {
      const filteredCourses = courses.filter(course => 
        course.toLowerCase().includes(value)
      );
      
      filteredCourses.forEach(course => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = course;
        div.addEventListener('click', () => {
          searchInput.value = course;
          suggestionsContainer.innerHTML = '';
        });
        suggestionsContainer.appendChild(div);
      });
    }
  });

  // Close suggestions on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      suggestionsContainer.innerHTML = '';
    }
  });

  // Navigation active state
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
