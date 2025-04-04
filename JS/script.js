// script.js

// Wait until the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add click events to navigation links
    setupNavigation();
    
    // Current page
    const page = window.location.pathname.split('/').pop() || 'index.html';
    
    if (page === 'index.html' || page === '') {
        setupProductPage();
    } else if (page === 'order.html') {
        setupOrderForm();
    } else if (page === 'about.html') {
        setupAboutPage();
    }
});

// To make navigation links work
function setupNavigation() {
    const links = document.querySelectorAll('.nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Link clicked:', this.textContent);
        });
    });
}

// Product page setup (index.html)
function setupProductPage() {
    const buttons = document.querySelectorAll('.details-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Get car info
            const carBox = this.parentElement;
            const carName = carBox.querySelector('h3').textContent;
            const carPrice = carBox.querySelector('.price').textContent;
            
            // Save car info
            localStorage.setItem('selectedCar', carName);
            
            // Go to order page
            window.location.href = 'order.html';
        });
    });
}

// Order form setup (order.html)
function setupOrderForm() {
    const form = document.querySelector('form');
    const carSelect = document.getElementById('car_model');
    const selectedCar = localStorage.getItem('selectedCar');
    if (selectedCar && carSelect) {
        carSelect.value = selectedCar;
    }
    
    // When form is submitted
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop form from refreshing page
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const car = carSelect.value;
        
        // Check if fields are filled
        if (name === '' || email === '' || car === '') {
            alert('Please fill in all required fields');
            return;
        }
        
        // Show success message
        alert('Thank you ' + name + '! Your order for ' + car + ' is placed. We will contact you as soon as possible');
        form.reset(); // Clear the form
        localStorage.removeItem('selectedCar'); // Clear saved car
    });
}

// About page setup (about.html)
function setupAboutPage() {
    const teams = document.querySelector('.team-member');
    
    if (teams) {
        // Simple fade in effect
        teams.style.opacity = '0';
        setTimeout(() => {
            teams.style.opacity = '1';
            teams.style.transition = 'opacity 1s';
        }, 500);
    }
}