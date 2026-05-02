// Countdown Timer (3 hari dari sekarang)
function updateCountdown() {
    const now = new Date().getTime();
    const deadline = now + (3 * 24 * 60 * 60 * 1000); // 3 hari
    
    const x = setInterval(function() {
        const distance = deadline - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "<h3>🎉 PROMO SELESAI!</h3>";
        }
    }, 1000);
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Auto-scroll ke products setelah 2 detik
    setTimeout(() => {
        document.querySelector('#products').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }, 3000);
});

// Copy to clipboard for phone number
document.querySelectorAll('.contact-info p i').forEach(icon => {
    icon.parentElement.addEventListener('click', function() {
        if (this.querySelector('i.fa-whatsapp')) {
            navigator.clipboard.writeText('081234567890');
            showNotification('Nomor WA disalin!');
        }
    });
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #00d4ff, #0099cc);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,212,255,0.4);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}