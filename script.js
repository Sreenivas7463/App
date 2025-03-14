
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const searchInput = document.querySelector('.search-input');
  const exploreButton = document.querySelector('.cta-button');
  
  // Handle Explore Courses button click
  exploreButton.addEventListener('click', function() {
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector('.nav-links a[href="#courses"]').classList.add('active');
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
