/**
 * ============================================
 * INTERACTIVE CLIENT & RECRUITER ENGAGEMENT
 * ============================================
 */

// ==========================================
// 1. INQUIRY FORM HANDLER
// ==========================================
class InquiryFormHandler {
    constructor() {
        this.form = null;
        this.init();
    }

    init() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!this.validateForm(name, email, message)) return;

        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i data-lucide="loader" class="w-5 h-5 animate-spin"></i> Sending...';

        try {
            // Simulate API call - Replace with actual backend
            await this.sendInquiry({ name, email, message });
            this.showSuccess('Message sent! We\'ll respond within 24 hours.');
            this.form.reset();
        } catch (error) {
            this.showError('Failed to send. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i data-lucide="send" class="w-5 h-5"></i> Send Message';
            lucide.createIcons();
        }
    }

    validateForm(name, email, message) {
        if (!name || !email || !message) {
            this.showError('All fields are required');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showError('Please enter a valid email');
            return false;
        }

        if (message.length < 10) {
            this.showError('Message must be at least 10 characters');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async sendInquiry(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Inquiry sent:', data);
                resolve(true);
            }, 1500);
        });
    }

    showSuccess(message) {
        const statusMsg = document.getElementById('statusMessage');
        statusMsg.textContent = `✓ ${message}`;
        statusMsg.classList.remove('hidden', 'bg-red-500/20', 'text-red-300');
        statusMsg.classList.add('bg-solana-green/20', 'text-solana-green');
        
        setTimeout(() => statusMsg.classList.add('hidden'), 5000);
    }

    showError(message) {
        const statusMsg = document.getElementById('statusMessage');
        statusMsg.textContent = `✗ ${message}`;
        statusMsg.classList.remove('hidden', 'bg-solana-green/20', 'text-solana-green');
        statusMsg.classList.add('bg-red-500/20', 'text-red-300');
    }
}

// ==========================================
// 2. CLIENT TESTIMONIALS CAROUSEL
// ==========================================
class TestimonialsCarousel {
    constructor() {
        this.testimonials = [
            {
                name: 'Hospital Manager',
                role: 'Quality Director',
                message: 'Exceptional leadership in implementing quality protocols.',
                rating: 5,
                avatar: '👔'
            },
            {
                name: 'HealFi Professional',
                role: 'Senior Administrator',
                message: 'Outstanding operational management skills.',
                rating: 5,
                avatar: '🏥'
            },
            {
                name: 'HR Director',
                role: 'Human Resources',
                message: 'Excellent understanding of healthcare workforce dynamics.',
                rating: 5,
                avatar: '👥'
            },
            {
                name: 'Clinic Owner',
                role: 'Medical Director',
                message: 'Transformative approach to patient care delivery.',
                rating: 5,
                avatar: '⭐'
            }
        ];

        this.currentIndex = 0;
        this.init();
    }

    init() {
        const carouselContainer = document.getElementById('testimonialsCarousel');
        if (carouselContainer) {
            this.renderCarousel();
            this.setupAutoRotation();
            this.setupNavigation();
        }
    }

    renderCarousel() {
        const container = document.getElementById('testimonialsCarousel');
        if (!container) return;

        const testimonial = this.testimonials[this.currentIndex];
        const starsHtml = '⭐'.repeat(testimonial.rating);

        container.innerHTML = `
            <div class="glass-ultra p-8 rounded-2xl border-animated text-center animate-fade-in-up">
                <div class="text-6xl mb-4">${testimonial.avatar}</div>
                <div class="flex justify-center gap-1 mb-4">${starsHtml}</div>
                <p class="text-gray-300 text-lg mb-6 italic">"${testimonial.message}"</p>
                <h3 class="text-solana-green font-bold text-lg">${testimonial.name}</h3>
                <p class="text-gray-400 text-sm">${testimonial.role}</p>
                <div class="flex justify-center gap-2 mt-6">
                    ${this.testimonials.map((_, idx) => `
                        <button class="carousel-dot w-2 h-2 rounded-full transition-all ${idx === this.currentIndex ? 'bg-solana-green w-6' : 'bg-gray-500'}" 
                                onclick="testimonialsCarousel.goTo(${idx})"></button>
                    `).join('')}
                </div>
            </div>
        `;

        lucide.createIcons();
    }

    setupAutoRotation() {
        setInterval(() => {
            this.next();
        }, 6000);
    }

    setupNavigation() {
        const prevBtn = document.getElementById('prevTestimonial');
        const nextBtn = document.getElementById('nextTestimonial');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
        if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.renderCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.renderCarousel();
    }

    goTo(index) {
        this.currentIndex = index;
        this.renderCarousel();
    }
}

// ==========================================
// 3. SERVICE PACKAGES INTERACTIVE
// ==========================================
class ServicePackages {
    constructor() {
        this.packages = [
            {
                name: 'Consultation',
                price: 'Contact',
                duration: '1 hour',
                features: [
                    'Strategic Healthcare Review',
                    'Operations Analysis',
                    'Quality Assessment',
                    'Custom Recommendations'
                ],
                icon: 'briefcase',
                color: 'from-solana-purple to-solana-green'
            },
            {
                name: 'Full Implementation',
                price: 'Custom',
                duration: 'Ongoing',
                features: [
                    'Complete System Design',
                    'Team Training',
                    'Process Optimization',
                    'Performance Monitoring',
                    '24/7 Support'
                ],
                icon: 'zap',
                color: 'from-solana-green to-cyan-400',
                featured: true
            },
            {
                name: 'Audit & Assessment',
                price: 'Competitive',
                duration: '2-4 weeks',
                features: [
                    'Compliance Audit',
                    'Risk Assessment',
                    'Quality Metrics',
                    'Detailed Report'
                ],
                icon: 'clipboard',
                color: 'from-cyan-400 to-blue-500'
            }
        ];

        this.init();
    }

    init() {
        const container = document.getElementById('servicesContainer');
        if (container) {
            this.renderPackages(container);
        }
    }

    renderPackages(container) {
        container.innerHTML = this.packages.map((pkg, idx) => `
            <div class="group glass-ultra rounded-2xl border-animated overflow-hidden transition-all duration-300 ${pkg.featured ? 'md:scale-105 glow-green' : 'hover:scale-105'}" 
                 style="animation: fadeInUp 0.6s ease-out ${idx * 0.1}s both;">
                <div class="p-8 relative">
                    <!-- Header Gradient -->
                    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pkg.color}"></div>

                    <!-- Featured Badge -->
                    ${pkg.featured ? '<div class="absolute top-4 right-4 bg-solana-green/20 text-solana-green px-3 py-1 rounded-full text-xs font-bold">FEATURED</div>' : ''}

                    <!-- Icon -->
                    <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${pkg.color} mb-6 group-hover:scale-125 transition-transform">
                        <i data-lucide="${pkg.icon}" class="w-6 h-6 text-white"></i>
                    </div>

                    <!-- Title & Price -->
                    <h3 class="text-2xl font-bold text-white mb-2">${pkg.name}</h3>
                    <p class="text-3xl font-black bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent mb-1">${pkg.price}</p>
                    <p class="text-gray-400 text-sm mb-6">${pkg.duration}</p>

                    <!-- Features -->
                    <ul class="space-y-3 mb-8">
                        ${pkg.features.map(feature => `
                            <li class="flex items-start gap-3 text-gray-300 hover:text-solana-green transition-colors">
                                <i data-lucide="check-circle" class="w-5 h-5 text-solana-green flex-shrink-0 mt-0.5"></i>
                                <span>${feature}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `).join('');

        lucide.createIcons();
    }
}

// ==========================================
// 4. RECRUITER QUICK MATCH
// ============================================
class RecruiterMatcher {
    constructor() {
        this.matches = [
            {
                type: 'Hospital Management',
                fit: 95,
                icon: 'building-2',
                description: 'Perfect fit for healthcare operations leadership'
            },
            {
                type: 'Quality Assurance',
                fit: 92,
                icon: 'shield-check',
                description: 'Extensive experience in compliance and standards'
            },
            {
                type: 'HR Administration',
                fit: 88,
                icon: 'users',
                description: 'Strong workforce development background'
            },
            {
                type: 'Healthcare Consulting',
                fit: 91,
                icon: 'briefcase',
                description: 'Strategic advisory expertise'
            },
            {
                type: 'Clinic Management',
                fit: 89,
                icon: 'activity',
                description: 'Proven operational excellence'
            },
            {
                type: 'Healthcare IT Implementation',
                fit: 85,
                icon: 'monitor',
                description: 'System optimization knowledge'
            }
        ];

        this.init();
    }

    init() {
        const container = document.getElementById('recruiterMatches');
        if (container) {
            this.renderMatches(container);
        }
    }

    renderMatches(container) {
        container.innerHTML = `
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${this.matches.map((match, idx) => `
                    <div class="glass-ultra p-6 rounded-xl border-animated hover:scale-105 transition-all duration-300 group" 
                         style="animation: fadeInUp 0.6s ease-out ${idx * 0.05}s both;">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center gap-3 flex-1">
                                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-solana-purple to-solana-green flex items-center justify-center group-hover:scale-125 transition-transform">
                                    <i data-lucide="${match.icon}" class="w-5 h-5 text-white"></i>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-bold text-white text-sm">${match.type}</h4>
                                </div>
                            </div>
                        </div>

                        <!-- Match Percentage Bar -->
                        <div class="mb-4">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-xs text-gray-400">Match Score</span>
                                <span class="text-sm font-bold text-solana-green">${match.fit}%</span>
                            </div>
                            <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-solana-purple to-solana-green" 
                                     style="width: ${match.fit}%; animation: slideInLeft 0.8s ease-out ${idx * 0.05}s both;"></div>
                            </div>
                        </div>

                        <p class="text-xs text-gray-400 mb-4">${match.description}</p>
                    </div>
                `).join('')}
            </div>
        `;

        lucide.createIcons();
    }
}

// ==========================================
// 5. GLOBAL INQUIRY FUNCTION
// ==========================================
function inquireAbout(topic) {
    const form = document.getElementById('contactForm');
    const messageField = document.getElementById('message');
    
    if (form && messageField) {
        messageField.value = `I'm interested in: ${topic}\n\nPlease provide more details about...`;
        messageField.focus();
        
        // Smooth scroll to form
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Highlight the form
        form.style.animation = 'pulse 0.5s ease-in-out';
    }
}

// ==========================================
// 6. INTERACTIVE STATISTICS
// ==========================================
class InteractiveStats {
    constructor() {
        this.stats = [
            { label: 'Years Active', value: 2, suffix: '+', icon: 'calendar' },
            { label: 'Successful Projects', value: 15, suffix: '+', icon: 'check-square' },
            { label: 'Clients Satisfied', value: 99, suffix: '%', icon: 'smile' },
            { label: 'Certifications', value: 4, suffix: '', icon: 'award' }
        ];

        this.init();
    }

    init() {
        const container = document.getElementById('interactiveStats');
        if (container) {
            this.renderStats(container);
        }
    }

    renderStats(container) {
        container.innerHTML = `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                ${this.stats.map((stat, idx) => `
                    <div class="glass-ultra p-6 rounded-xl text-center card-hover border-animated group" 
                         style="animation: fadeInUp 0.6s ease-out ${idx * 0.1}s both;">
                        <div class="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-solana-purple to-solana-green mb-4 group-hover:scale-125 transition-transform">
                            <i data-lucide="${stat.icon}" class="w-6 h-6 text-white"></i>
                        </div>
                        <div class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-solana-green stat-counter" 
                             data-target="${stat.value}">0</div>
                        <div class="text-sm font-semibold text-solana-green inline">${stat.suffix}</div>
                        <p class="text-xs text-gray-400 mt-3 uppercase tracking-wider">${stat.label}</p>
                    </div>
                `).join('')}
            </div>
        `;

        this.animateCounters();
        lucide.createIcons();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-counter');
        const speed = 30;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;

            const interval = setInterval(() => {
                count += Math.ceil(target / 30);
                if (count >= target) {
                    count = target;
                    clearInterval(interval);
                }
                counter.textContent = count;
            }, speed);
        });
    }
}

// ==========================================
// 7. AVAILABILITY CHECKER
// ==========================================
class AvailabilityChecker {
    constructor() {
        this.init();
    }

    init() {
        const container = document.getElementById('availabilityStatus');
        if (container) {
            this.updateStatus();
            setInterval(() => this.updateStatus(), 60000); // Update every minute
        }
    }

    updateStatus() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay();

        // Working hours: Monday-Friday 9AM-6PM
        const isWorkingHours = day >= 1 && day <= 5 && hour >= 9 && hour < 18;
        const isAvailable = isWorkingHours;

        const container = document.getElementById('availabilityStatus');
        if (!container) return;

        const status = isAvailable ? 
            { text: '● Available Now', color: 'text-solana-green', bg: 'bg-solana-green/10' } :
            { text: '● Back Soon', color: 'text-orange-400', bg: 'bg-orange-400/10' };

        container.innerHTML = `
            <div class="glass-ultra px-4 py-2 rounded-full inline-flex items-center gap-2 ${status.bg} border border-${status.color.split('-')[1]}/20">
                <div class="w-2 h-2 rounded-full ${status.color} animate-pulse"></div>
                <span class="${status.color} text-sm font-bold">${status.text}</span>
            </div>
        `;
    }
}

// ==========================================
// 8. MODAL FOR DETAILED PROPOSALS
// ==========================================
class ProposalModal {
    constructor() {
        this.init();
    }

    init() {
        const modal = document.getElementById('proposalModal');
        const closeBtn = document.querySelector('[data-close-modal]');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        if (modal) {
            window.addEventListener('click', (e) => {
                if (e.target === modal) this.close();
            });
        }
    }

    open(title, content) {
        const modal = document.getElementById('proposalModal');
        if (modal) {
            modal.querySelector('.modal-content').innerHTML = `
                <h2 class="text-2xl font-bold text-white mb-4">${title}</h2>
                <div class="text-gray-300">${content}</div>
            `;
            modal.style.display = 'flex';
            modal.classList.add('animate-fade-in-up');
        }
    }

    close() {
        const modal = document.getElementById('proposalModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// ==========================================
// 9. INITIALIZE ALL ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    new InquiryFormHandler();
    window.testimonialsCarousel = new TestimonialsCarousel();
    new ServicePackages();
    new RecruiterMatcher();
    new InteractiveStats();
    new AvailabilityChecker();
    new ProposalModal();

    console.log('✓ All interactive modules loaded successfully!');
});

// ==========================================
// 10. UTILITY ANIMATIONS
// ==========================================
const animationStyles = `
    @keyframes slideInLeft {
        from {
            width: 0;
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out;
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
