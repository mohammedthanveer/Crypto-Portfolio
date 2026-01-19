// ==========================================
// INTERACTIVE STATISTICS
// ==========================================
const interactiveStats = [
    { label: 'Healthcare Facilities Managed', value: '15+', color: 'from-solana-purple' },

    { label: 'Team Members Led', value: '200+', color: 'from-solana-purple' },
    { label: 'Process Improvements', value: '40+', color: 'from-solana-green' }
];

// ==========================================
// RECRUITER PERFECT MATCHES
// ==========================================
const recruiterMatches = [
    {
        type: 'Hospital Administrator',
        title: 'VP of Hospital Operations',
        fit: 95,
        description: 'Perfect fit for healthcare operations leadership'
    },
    {
        type: 'Healthcare Director',
        title: 'Director of Quality & Safety',
        fit: 92,
        description: 'Excellent match for quality management roles'
    },
    {
        type: 'Executive Role',
        title: 'Chief Healthcare Officer',
        fit: 88,
        description: 'Strong candidate for executive healthcare positions'
    },
    {
        type: 'Management',
        title: 'Department Manager',
        fit: 90,
        description: 'Well-suited for department management roles'
    },
    {
        type: 'Consultant',
        title: 'Healthcare Management Consultant',
        fit: 93,
        description: 'Ideal for healthcare consulting opportunities'
    },
    {
        type: 'Training',
        title: 'Healthcare Training Specialist',
        fit: 87,
        description: 'Great fit for training and development roles'
    }
];

// ==========================================
// CLIENT TESTIMONIALS
// ==========================================
const testimonials = [
    {
        name: 'Dr. Rajesh Sharma',
        role: 'Hospital Administrator',
        text: 'Exceptional leadership and strategic vision transformed our hospital operations completely.',
        avatar: '👨‍⚕️'
    },
    {
        name: 'Ms. Priya Verma',
        role: 'Healthcare Director',
        text: 'Outstanding quality management implementation. Measurable improvements in patient outcomes.',
        avatar: '👩‍⚕️'
    },
    {
        name: 'Dr. Arjun Patel',
        role: 'Medical Director',
        text: 'Expert in bridging clinical excellence with operational effectiveness. Highly recommended.',
        avatar: '👨‍⚕️'
    }
];

// ==========================================
// RENDER INTERACTIVE STATS
// ==========================================
function renderInteractiveStats() {
    const container = document.getElementById('interactiveStats');
    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            ${interactiveStats.map((stat, idx) => `
                <div class="glass-card p-8 rounded-xl text-center group hover:border-solana-purple/50 transition-all">
                    <div class="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} to-solana-green mb-3">
                        ${stat.value}
                    </div>
                    <p class="text-gray-400 text-sm font-medium">${stat.label}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// ==========================================
// RENDER RECRUITER MATCHES
// ==========================================
function renderRecruiterMatches() {
    const container = document.getElementById('recruiterMatches');
    container.innerHTML = `
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${recruiterMatches.map((match, idx) => `
                <div class="glass-card p-6 rounded-xl group hover:border-solana-green/50 transition-all" 
                     style="animation: slideInUp 0.6s ease-out ${idx * 0.05}s both;">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="font-bold text-white text-sm">${match.title}</h3>
                        <span class="text-xs px-2 py-1 bg-solana-purple/20 text-solana-green rounded-full">${match.type}</span>
                    </div>

                    <!-- Match Percentage Bar -->
                    <div class="mb-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-xs text-gray-400">Match Score</span>
                            <span class="text-sm font-bold text-solana-green">${match.fit}%</span>
                        </div>
                        <div class="relative w-full h-3 bg-gradient-to-r from-white/5 to-white/10 rounded-full overflow-hidden border border-white/10 shadow-lg">
                            <div class="absolute inset-0 bg-gradient-to-r from-solana-purple via-solana-green to-solana-purple opacity-20 rounded-full" 
                                 style="width: ${match.fit}%;"></div>
                            <div class="h-full bg-gradient-to-r from-solana-purple to-solana-green rounded-full transition-all duration-700 ease-out" 
                                 style="width: ${match.fit}%; box-shadow: 0 0 20px rgba(20, 241, 149, 0.5), inset 0 1px 2px rgba(255,255,255,0.2);" 
                                 data-fill="${match.fit}"></div>
                        </div>
                    </div>

                    <p class="text-xs text-gray-400 mb-4">${match.description}</p>
                </div>
            `).join('')}
        </div>
    `;
    lucide.createIcons();
}

// ==========================================
// RENDER TESTIMONIALS CAROUSEL
// ==========================================
let currentTestimonial = 0;

function renderTestimonials() {
    const container = document.getElementById('testimonialsCarousel');
    const testimonial = testimonials[currentTestimonial];
    
    container.innerHTML = `
        <div class="glass-card p-12 rounded-xl text-center">
            <div class="text-5xl mb-4">${testimonial.avatar}</div>
            <p class="text-gray-300 text-lg mb-6 italic leading-relaxed">
                "${testimonial.text}"
            </p>
            <div>
                <p class="font-bold text-white">${testimonial.name}</p>
                <p class="text-sm text-solana-green">${testimonial.role}</p>
            </div>
        </div>
    `;
    
    lucide.createIcons();
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    renderTestimonials();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    renderTestimonials();
}

// ==========================================
// EVENT LISTENERS
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    renderInteractiveStats();
    renderRecruiterMatches();
    renderTestimonials();

    // Testimonial buttons
    document.getElementById('nextTestimonial')?.addEventListener('click', nextTestimonial);
    document.getElementById('prevTestimonial')?.addEventListener('click', prevTestimonial);
});

// ==========================================
// INQUIRY FUNCTION
// ==========================================
function inquireAbout(topic) {
    const form = document.getElementById('contactForm');
    const messageField = document.getElementById('message');
    
    if (form && messageField) {
        messageField.value = `I'm interested in: ${topic}\n\nPlease provide more details about...`;
        messageField.focus();
        
        // Smooth scroll to form
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ==========================================
// ANIMATION DEFINITIONS
// ==========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }

    @keyframes fillProgress {
        from {
            width: 0;
            box-shadow: 0 0 10px rgba(20, 241, 149, 0.3);
        }
        to {
            width: 100%;
            box-shadow: 0 0 20px rgba(20, 241, 149, 0.5);
        }
    }
`;
document.head.appendChild(style);

// Animate progress bars on render
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const progressBars = document.querySelectorAll('[data-fill]');
        progressBars.forEach((bar, idx) => {
            const fill = bar.getAttribute('data-fill');
            bar.style.width = fill + '%';
            bar.style.animation = `fillProgress 0.8s ease-out ${idx * 0.05}s forwards`;
        });
    }, 100);
});
