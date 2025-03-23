// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
	  e.preventDefault(); // Prevent default anchor behavior
	  const targetId = this.getAttribute('href').substring(1); // Get the target section ID
	  const targetSection = document.getElementById(targetId); // Find the target section
	  if (targetSection) {
		targetSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
	  }
	});
  });
  
  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
	contactForm.addEventListener('submit', function (e) {
	  e.preventDefault(); // Prevent default form submission
  
	  // Get form data
	  const name = document.getElementById('name').value;
	  const email = document.getElementById('email').value;
	  const message = document.getElementById('message').value;
  
	  // Basic validation
	  if (!name || !email || !message) {
		alert('Please fill out all fields.');
		return;
	  }
  
	  // Simulate form submission (you can replace this with an actual API call)
	  console.log('Form submitted:', { name, email, message });
	  alert('Thank you for your message! I will get back to you soon.');
  
	  // Clear the form
	  contactForm.reset();
	});
  }
  
  // Optional: Add interactivity to project cards
  document.querySelectorAll('.project-card').forEach(card => {
	card.addEventListener('mouseenter', () => {
	  card.style.transform = 'scale(1.05)';
	  card.style.transition = 'transform 0.3s ease';
	});
  
	card.addEventListener('mouseleave', () => {
	  card.style.transform = 'scale(1)';
	});
  });