

document.querySelectorAll('.nav-link').forEach(item => {
    item.addEventListener('click', function() {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');  // Remove active class from all links
      });
      this.classList.add('active');  // Add active class to clicked link
    });
  });
  





// STRAT mouse scroll navigation feature
/// Add this to a new file named synchronizedScroll.js
document.addEventListener('wheel', function(event) {
  event.preventDefault();
  
  // Get all sections and navigation links
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Find the current visible section
  let currentSection = null;
  let currentIndex = 0;
  
  sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= -100 && rect.top <= 100) {
          currentSection = section;
          currentIndex = index;
      }
  });
  
  if (currentSection) {
      let targetIndex;
      
      // Scrolling down
      if (event.deltaY > 0) {
          targetIndex = Math.min(currentIndex + 1, sections.length - 1);
      }
      // Scrolling up
      else if (event.deltaY < 0) {
          targetIndex = Math.max(currentIndex - 1, 0);
      }
      
      // Update both the section and navigation
      if (targetIndex !== currentIndex) {
          // Scroll to target section
          sections[targetIndex].scrollIntoView({
              behavior: 'smooth'
          });
          
          // Update navigation visual state
          navLinks.forEach(link => {
              link.classList.remove('active');
              link.querySelector('i').style.transform = 'scale(1)';
              link.querySelector('span').style.opacity = '0';
          });
          
          navLinks[targetIndex].classList.add('active');
          navLinks[targetIndex].querySelector('i').style.transform = 'scale(1.2)';
          navLinks[targetIndex].querySelector('span').style.opacity = '1';
      }
  }
}, { passive: false });

// Add click event listeners to navigation links
document.querySelectorAll('.nav-link').forEach((link, index) => {
  link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active state from all links
      document.querySelectorAll('.nav-link').forEach(l => {
          l.classList.remove('active');
          l.querySelector('i').style.transform = 'scale(1)';
          l.querySelector('span').style.opacity = '0';
      });
      
      // Add active state to clicked link
      this.classList.add('active');
      this.querySelector('i').style.transform = 'scale(1.2)';
      this.querySelector('span').style.opacity = '1';
      
      // Scroll to corresponding section
      const targetId = this.getAttribute('href').substring(1);
      document.getElementById(targetId).scrollIntoView({
          behavior: 'smooth'
      });
  });
});


    // END mouse scroll navigation feature


    // STRAT contact form 
  // Wait for DOM to be fully loaded
 // Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add the modal HTML to the document
    const modalHTML = `
        <div class="modal fade" id="successModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body p-4 text-center">
                        <h5 class="mb-3">පණිවිඩය සාර්ථකව යවා ඇත!</h5>
                        <button type="button" class="btn btn-primary px-4" data-bs-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Initialize the modal
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    
    // Get form element
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Reset errors
            document.querySelectorAll('.error').forEach(error => {
                error.classList.add('d-none');
            });
            
            let isValid = true;
            
            // Validation logic here...
            // [Previous validation code remains the same]
            
            if (isValid) {
                const formData = new FormData(this);
                const submitButton = this.querySelector('button[type="submit"]');
                
                try {
                    submitButton.disabled = true;
                    
                    const response = await fetch('../assets/process.php', {
                        method: 'POST',
                        body: formData
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        // Clear form
                        contactForm.reset();
                        
                        // Show success modal
                        successModal.show();
                        
                        // Replace URL without refreshing to prevent resubmission dialog
                        history.replaceState({}, document.title, window.location.href);
                    } else {
                        alert(data.message || 'දෝෂයක් ඇති විය. නැවත උත්සාහ කරන්න.');
                    }
                } catch (error) {
                    alert('දත්ත යැවීමේ දෝෂයක් ඇති විය. නැවත උත්සාහ කරන්න.');
                } finally {
                    submitButton.disabled = false;
                }
            }
        });
    }

    // Handle modal close event
    document.querySelector('#successModal button[data-bs-dismiss="modal"]').addEventListener('click', function() {
        // Clear URL parameters if any
        history.replaceState({}, document.title, window.location.pathname);
    });
});

// end contact form 




// STRAT gallary 
// Improved Filter Gallery Function
function filterGallery(category, element) {
    let items = document.querySelectorAll(".gallery-item");
    let buttons = document.querySelectorAll(".btn-animate");
    
    // Remove active class from all buttons and set the selected button
    buttons.forEach(btn => btn.classList.remove("btn-primary", "active"));
    buttons.forEach(btn => btn.classList.add("btn-secondary"));
    element.classList.remove("btn-secondary");
    element.classList.add("btn-primary", "active");
    
    // If showing all items
    if (category === "all") {
      items.forEach(item => {
        item.style.display = "flex";
        item.style.opacity = "1";
        item.style.width = "200px";
        item.style.height = "220px";
        item.style.margin = "5px";
      });
    } else {
      // For filtered categories
      items.forEach(item => {
        if (item.classList.contains(category)) {
          item.style.display = "flex";
          item.style.opacity = "1";
          item.style.width = "200px";
          item.style.height = "220px";
          item.style.margin = "5px";
        } else {
          item.style.display = "none";
          item.style.opacity = "0";
        }
      });
    }
  }
  
    // Full-screen Image Viewer
    function openFullScreen(imgElement) {
        let modal = document.getElementById("fullScreenModal");
        let modalImg = document.getElementById("fullScreenImg");
        modal.style.display = "block";
        modalImg.src = imgElement.src;
      }
      
      // Close Full-screen
      function closeFullScreen() {
        document.getElementById("fullScreenModal").style.display = "none";
      }




      
// Updated Full-screen Image Viewer with Correct Filtering
let currentIndex = 0;
let filteredItems = [];

function openFullScreen(imgElement) {
    let modal = document.getElementById("fullScreenModal");
    let modalImg = document.getElementById("fullScreenImg");
    modal.style.display = "block";
    modalImg.src = imgElement.src;

    // Check if "All" is active
    let activeFilter = document.querySelector(".btn-animate.active").innerText.trim();
    
    if (activeFilter === "All") {
        // If "All" is selected, include all gallery items
        filteredItems = [...document.querySelectorAll(".gallery-item img")];
    } else {
        // Otherwise, only include the visible items
        filteredItems = [...document.querySelectorAll(".gallery-item")]
            .filter(item => item.style.display === "flex")
            .map(item => item.querySelector("img"));
    }

    currentIndex = filteredItems.findIndex(img => img.src === imgElement.src);
}

function closeFullScreen() {
    document.getElementById("fullScreenModal").style.display = "none";
}

// Navigate through images inside full-screen mode
function changeImage(direction) {
    if (filteredItems.length === 0) return;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = filteredItems.length - 1;
    } else if (currentIndex >= filteredItems.length) {
        currentIndex = 0;
    }

    document.getElementById("fullScreenImg").src = filteredItems[currentIndex].src;
}
  
  // end gallary 


   // STRAT gallary  Show More

  // Add this JavaScript function to your script
function toggleAdditionalRows() {
    const hiddenItems = document.querySelectorAll('.hidden-row');
    const toggleBtn = document.getElementById('toggleRowsBtn');
    
    hiddenItems.forEach(item => {
        if (item.style.display === 'none' || getComputedStyle(item).display === 'none') {
            item.style.display = 'block';
            toggleBtn.textContent = 'Show Less';
        } else {
            item.style.display = 'none';
            toggleBtn.textContent = 'Show More';
        }
    });
}

// Initialize - make sure items with 'hidden-row' class are hidden on page load
document.addEventListener('DOMContentLoaded', function() {
    const hiddenItems = document.querySelectorAll('.hidden-row');
    hiddenItems.forEach(item => {
        item.style.display = 'none';
    });
});

// Your existing filter gallery function (assuming you have one)
function filterGallery(category, btn) {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.btn-group .btn');
    buttons.forEach(button => {
        button.classList.remove('active');
        button.classList.remove('btn-primary');
        button.classList.add('btn-secondary');
    });
    
    // Add active class to clicked button
    btn.classList.add('active');
    btn.classList.remove('btn-secondary');
    btn.classList.add('btn-primary');
    
    // Filter gallery items
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = item.classList.contains('hidden-row') ? 'none' : 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Reset the toggle button text
    document.getElementById('toggleRowsBtn').textContent = 'Show More';
}

// Your existing fullscreen functions
function openFullScreen(img) {
    const modal = document.getElementById('fullScreenModal');
    const fullImg = document.getElementById('fullScreenImg');
    modal.style.display = 'block';
    fullImg.src = img.src;
}

function closeFullScreen() {
    document.getElementById('fullScreenModal').style.display = 'none';
}

function changeImage(direction) {
    // Implementation for image navigation
    const fullImg = document.getElementById('fullScreenImg');
    const images = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"]) img'));
    let currentIndex = images.findIndex(img => img.src === fullImg.src);
    
    currentIndex += direction;
    if (currentIndex >= images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = images.length - 1;
    
    fullImg.src = images[currentIndex].src;
}

 
 // END gallary  Show More



// START Mobile Navbar with Hamburger Icon
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const toggleButton = document.getElementById("sidebar-toggle");

    function handleResize() {
      if (window.innerWidth < 768) {
        sidebar.classList.add("d-none"); // Hide sidebar on mobile
      } else {
        sidebar.classList.remove("d-none"); // Show on desktop
      }
    }

    toggleButton.addEventListener("click", function () {
      sidebar.classList.toggle("d-none");
    });

    // Initial check
    handleResize();

    // Also adjust on window resize
    window.addEventListener("resize", handleResize);
  });
// END Mobile Navbar with Hamburger Icon 


