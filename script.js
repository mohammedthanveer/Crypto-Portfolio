// ==========================================
// 1. INITIALIZE ICONS
// ==========================================
lucide.createIcons();

// ==========================================
// 2. COUNT UP ANIMATION LOGIC
// ==========================================
const counters = document.querySelectorAll('.counter');
const speed = 200; 

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
};

// ==========================================
// 3. INTERSECTION OBSERVER FOR ANIMATION
// ==========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if(entry.target.classList.contains('counter')) {
                animateCounters();
                observer.unobserve(entry.target); 
            }
        }
    });
});

// Trigger stats animation when section is reached
document.querySelector('.counter')?.parentElement?.parentElement?.parentElement && 
observer.observe(document.querySelector('.counter').parentElement.parentElement.parentElement);

// ==========================================
// 4. HERO CANVAS PARTICLE ANIMATION
// ==========================================
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = (Math.random() * 0.4) - 0.2;
        this.directionY = (Math.random() * 0.4) - 0.2;
        this.size = Math.random() * 2;
        this.color = '#5C5C5C';
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Draw lines between particles
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(153, 69, 255,' + opacityValue * 0.15 + ')'; // Solana Purple lines
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

init();
animate();

// ==========================================
// 5. CONTACT FORM HANDLING
// ==========================================
const contactForm = document.getElementById('contactForm');
const statusMessage = document.getElementById('statusMessage');

contactForm?.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !message) {
        showStatus('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showStatus('Please enter a valid email address', 'error');
        return;
    }

    // Disable submit button during sending
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        // Send email using EmailJS service
        if (!window.emailjs) {
            await loadEmailJS();
        }

        emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); // Replace with your EmailJS public key

        const templateParams = {
            to_email: 'Mdmuzzamil52@gmail.com',
            from_name: name,
            from_email: email,
            message: message,
            reply_to: email
        };

        await emailjs.send('service_id', 'template_id', templateParams);
        
        showStatus('✓ Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
    } catch (error) {
        console.error('Error sending message:', error);
        showStatus('Failed to send message. Please try again or contact directly via email.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> Send Message';
        lucide.createIcons();
    }
});

function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.classList.remove('hidden');
    
    if (type === 'success') {
        statusMessage.classList.remove('bg-red-500/20', 'text-red-300');
        statusMessage.classList.add('bg-solana-green/20', 'text-solana-green');
    } else {
        statusMessage.classList.remove('bg-solana-green/20', 'text-solana-green');
        statusMessage.classList.add('bg-red-500/20', 'text-red-300');
    }

    // Auto-hide after 5 seconds
    setTimeout(() => {
        statusMessage.classList.add('hidden');
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function loadEmailJS() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
