/*
 * ARCADE NOIR PORTFOLIO - JAVASCRIPT
 * Interactive features and animations
 */

// Global state management
const PortfolioApp = {
  isLoaded: false,
  soundEnabled: false,
  currentSection: 'home',
  konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'],
  konamiIndex: 0,
  
  // Audio context for sound effects
  audioContext: null,
  
  // Intersection Observer for scroll animations
  observer: null,
  
  // Animation frame IDs
  animationFrames: {
    matrix: null,
    particles: null,
    cursor: null
  },
  
  // Cursor position tracking
  cursor: {
    x: 0,
    y: 0,
    trails: []
  }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  console.log('🚀 Initializing Arcade Noir Portfolio...');
  
  // Start loading sequence
  startLoadingSequence();
  
  // Initialize audio context
  initializeAudio();
  
  // Setup event listeners
  setupEventListeners();
  
  // Initialize background effects
  initializeBackgroundEffects();
  
  // Setup intersection observer
  setupScrollAnimations();
  
  // Initialize custom cursor
  initializeCustomCursor();
  
  // Setup navigation
  initializeNavigation();
  
  // Initialize sections
  initializeSections();
  
  console.log('✅ Portfolio initialized successfully!');
}

/* ==========================================
   LOADING SEQUENCE
   ========================================== */

function startLoadingSequence() {
  const loadingScreen = document.getElementById('loading-screen');
  const progressFill = document.getElementById('progress-fill');
  const progressPercentage = document.getElementById('progress-percentage');
  const loadingText = document.getElementById('loading-text-content');
  
  const loadingMessages = [
    'INITIALIZING SYSTEMS...',
    'LOADING DIGITAL REALITY...',
    'COMPILING CREATIVITY...',
    'SYNCING INNOVATION...',
    'CALIBRATING EXCELLENCE...',
    'PREPARING PORTFOLIO...'
  ];
  
  let progress = 0;
  let messageIndex = 0;
  
  const updateProgress = () => {
    progress += Math.random() * 15 + 5;
    
    if (progress >= 100) {
      progress = 100;
      progressFill.style.width = '100%';
      progressPercentage.textContent = '100%';
      
      setTimeout(() => {
        loadingText.textContent = 'SYSTEM READY';
        loadingText.style.color = 'var(--color-accent-bright)';
        loadingText.style.textShadow = '0 0 20px rgba(0, 255, 65, 0.8)';
        
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          PortfolioApp.isLoaded = true;
          
          // Trigger initial animations
          triggerHeroAnimations();
          
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 500);
        }, 1000);
      }, 500);
    } else {
      progressFill.style.width = progress + '%';
      progressPercentage.textContent = Math.floor(progress) + '%';
      
      // Update loading message
      if (progress > messageIndex * 16.67) {
        if (messageIndex < loadingMessages.length - 1) {
          messageIndex++;
          typewriterEffect(loadingText, loadingMessages[messageIndex]);
        }
      }
      
      setTimeout(updateProgress, Math.random() * 200 + 100);
    }
  };
  
  setTimeout(updateProgress, 500);
}

function typewriterEffect(element, text, speed = 50) {
  element.textContent = '';
  let i = 0;
  
  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  
  type();
}

/* ==========================================
   AUDIO SYSTEM
   ========================================== */

function initializeAudio() {
  try {
    PortfolioApp.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    console.warn('Audio context not supported');
  }
}

function playSound(frequency = 800, duration = 100, type = 'sine') {
  if (!PortfolioApp.soundEnabled || !PortfolioApp.audioContext) return;
  
  const oscillator = PortfolioApp.audioContext.createOscillator();
  const gain = PortfolioApp.audioContext.createGain();
  
  oscillator.connect(gain);
  gain.connect(PortfolioApp.audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gain.gain.setValueAtTime(0.1, PortfolioApp.audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, PortfolioApp.audioContext.currentTime + duration / 1000);
  
  oscillator.start(PortfolioApp.audioContext.currentTime);
  oscillator.stop(PortfolioApp.audioContext.currentTime + duration / 1000);
}

/* ==========================================
   EVENT LISTENERS
   ========================================== */

function setupEventListeners() {
  // Sound toggle
  const soundToggle = document.getElementById('sound-toggle');
  soundToggle.addEventListener('click', toggleSound);
  
  // Navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });
  
  // CTA buttons
  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach(button => {
    button.addEventListener('click', handleCTAClick);
  });
  
  // Contact form
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', handleFormSubmit);
  
  // Project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', handleProjectClick);
    card.addEventListener('mouseenter', handleProjectHover);
  });
  
  // Modal close
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.getElementById('project-modal');
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  
  // Filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', handleFilterClick);
  });
  
  // Scroll events
  window.addEventListener('scroll', handleScroll);
  
  // Resize events
  window.addEventListener('resize', handleResize);
  
  // Keyboard events for Konami code and accessibility
  document.addEventListener('keydown', handleKeyDown);
  
  // Mouse events for custom cursor
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mouseup', handleMouseUp);
}

/* ==========================================
   NAVIGATION SYSTEM
   ========================================== */

function initializeNavigation() {
  updateActiveNavLink();
  updateScrollProgress();
}

function handleNavClick(e) {
  e.preventDefault();
  const targetSection = e.target.getAttribute('data-section');
  scrollToSection(targetSection);
  playSound(600, 100);
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 80; // Account for header height
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

function handleScroll() {
  updateScrollProgress();
  updateActiveNavLink();
  updateNavHeader();
}

function updateScrollProgress() {
  const scrollProgress = document.getElementById('scroll-progress');
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  scrollProgress.style.width = `${Math.min(progress, 100)}%`;
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = 'home';
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      currentSection = section.id;
    }
  });
  
  if (currentSection !== PortfolioApp.currentSection) {
    PortfolioApp.currentSection = currentSection;
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSection) {
        link.classList.add('active');
      }
    });
  }
}

function updateNavHeader() {
  const navHeader = document.getElementById('nav-header');
  if (window.scrollY > 100) {
    navHeader.classList.add('scrolled');
  } else {
    navHeader.classList.remove('scrolled');
  }
}

/* ==========================================
   CUSTOM CURSOR
   ========================================== */

function initializeCustomCursor() {
  const cursor = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursor-trail');
  
  // Only show custom cursor on desktop
  if (window.innerWidth > 768) {
    cursor.style.display = 'block';
    cursorTrail.style.display = 'block';
  }
}

function handleMouseMove(e) {
  if (window.innerWidth <= 768) return;
  
  PortfolioApp.cursor.x = e.clientX;
  PortfolioApp.cursor.y = e.clientY;
  
  const cursor = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursor-trail');
  
  if (cursor && cursorTrail) {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    
    // Add trail effect
    PortfolioApp.cursor.trails.push({
      x: e.clientX - 3,
      y: e.clientY - 3,
      life: 1
    });
    
    // Limit trail length
    if (PortfolioApp.cursor.trails.length > 10) {
      PortfolioApp.cursor.trails.shift();
    }
    
    updateCursorTrail();
  }
}

function updateCursorTrail() {
  const cursorTrail = document.getElementById('cursor-trail');
  if (!cursorTrail || PortfolioApp.cursor.trails.length === 0) return;
  
  const latestTrail = PortfolioApp.cursor.trails[PortfolioApp.cursor.trails.length - 1];
  cursorTrail.style.transform = `translate(${latestTrail.x}px, ${latestTrail.y}px)`;
  cursorTrail.style.opacity = latestTrail.life;
  
  // Fade out trails
  PortfolioApp.cursor.trails.forEach(trail => {
    trail.life *= 0.95;
  });
  
  // Remove dead trails
  PortfolioApp.cursor.trails = PortfolioApp.cursor.trails.filter(trail => trail.life > 0.1);
}

function handleMouseDown() {
  const cursor = document.getElementById('cursor');
  if (cursor) {
    cursor.style.transform += ' scale(0.8)';
  }
}

function handleMouseUp() {
  const cursor = document.getElementById('cursor');
  if (cursor) {
    cursor.style.transform = cursor.style.transform.replace(' scale(0.8)', '');
  }
}

/* ==========================================
   BACKGROUND EFFECTS
   ========================================== */

function initializeBackgroundEffects() {
  initializeMatrixRain();
  initializeParticleField();
}

function initializeMatrixRain() {
  const canvas = document.getElementById('matrix-rain');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
  const matrixArray = matrix.split("");
  
  const fontSize = 10;
  const columns = canvas.width / fontSize;
  const drops = [];
  
  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }
  
  function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px JetBrains Mono';
    
    for (let i = 0; i < drops.length; i++) {
      const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    
    PortfolioApp.animationFrames.matrix = requestAnimationFrame(drawMatrix);
  }
  
  drawMatrix();
}

function initializeParticleField() {
  const particleField = document.getElementById('particle-field');
  if (!particleField) return;
  
  const particles = [];
  const particleCount = 50;
  
  class Particle {
    constructor() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2 + 1;
      this.life = Math.random() * 100 + 100;
      this.maxLife = this.life;
      
      this.element = document.createElement('div');
      this.element.style.position = 'absolute';
      this.element.style.width = this.size + 'px';
      this.element.style.height = this.size + 'px';
      this.element.style.background = '#00ff41';
      this.element.style.borderRadius = '50%';
      this.element.style.pointerEvents = 'none';
      this.element.style.boxShadow = '0 0 6px #00ff41';
      
      particleField.appendChild(this.element);
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life--;
      
      // Wrap around screen
      if (this.x < 0) this.x = window.innerWidth;
      if (this.x > window.innerWidth) this.x = 0;
      if (this.y < 0) this.y = window.innerHeight;
      if (this.y > window.innerHeight) this.y = 0;
      
      // Update element position and opacity
      this.element.style.left = this.x + 'px';
      this.element.style.top = this.y + 'px';
      this.element.style.opacity = this.life / this.maxLife;
      
      return this.life > 0;
    }
    
    destroy() {
      this.element.remove();
    }
  }
  
  // Create initial particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animateParticles() {
    // Update existing particles
    for (let i = particles.length - 1; i >= 0; i--) {
      if (!particles[i].update()) {
        particles[i].destroy();
        particles.splice(i, 1);
      }
    }
    
    // Add new particles
    while (particles.length < particleCount) {
      particles.push(new Particle());
    }
    
    PortfolioApp.animationFrames.particles = requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
}

/* ==========================================
   SCROLL ANIMATIONS
   ========================================== */

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  PortfolioApp.observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Trigger specific section animations
        if (entry.target.id === 'about') {
          animateTimelineItems();
          animatePersonalityRings();
        } else if (entry.target.id === 'skills') {
          generateSkillsConstellation();
        } else if (entry.target.id === 'projects') {
          generateProjectsGrid();
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    PortfolioApp.observer.observe(section);
  });
}

function triggerHeroAnimations() {
  // Start typewriter effect for hero subtitle
  const heroTypewriter = document.getElementById('hero-typewriter');
  if (heroTypewriter) {
    const text = heroTypewriter.textContent;
    typewriterEffect(heroTypewriter, text, 50);
  }
}

function animateTimelineItems() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, index * 200);
  });
}

function animatePersonalityRings() {
  const ringItems = document.querySelectorAll('.ring-item');
  ringItems.forEach((ring, index) => {
    setTimeout(() => {
      const progressCircle = ring.querySelector('.ring-progress');
      const level = ring.getAttribute('data-level');
      const circumference = 2 * Math.PI * 50; // radius = 50
      const offset = circumference - (level / 100) * circumference;
      
      progressCircle.style.strokeDashoffset = offset;
      
      // Animate percentage counter
      const percentageElement = ring.querySelector('.ring-percentage');
      animateCounter(percentageElement, 0, parseInt(level), 1000);
    }, index * 300);
  });
}

function animateCounter(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16); // 60 FPS
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + '%';
  }, 16);
}

/* ==========================================
   SKILLS CONSTELLATION
   ========================================== */

function generateSkillsConstellation() {
  const constellationField = document.getElementById('constellation-field');
  if (!constellationField || constellationField.children.length > 0) return;
  
  const skills = {
    frontend: [
      { name: 'React', icon: 'fab fa-react', level: 95 },
      { name: 'Vue.js', icon: 'fab fa-vuejs', level: 88 },
      { name: 'JavaScript', icon: 'fab fa-js', level: 98 },
      { name: 'TypeScript', icon: 'fas fa-code', level: 92 },
      { name: 'CSS3', icon: 'fab fa-css3-alt', level: 95 }
    ],
    backend: [
      { name: 'Node.js', icon: 'fab fa-node-js', level: 90 },
      { name: 'Python', icon: 'fab fa-python', level: 85 },
      { name: 'PHP', icon: 'fab fa-php', level: 80 },
      { name: 'Database', icon: 'fas fa-database', level: 88 }
    ],
    tools: [
      { name: 'Git', icon: 'fab fa-git-alt', level: 95 },
      { name: 'Docker', icon: 'fab fa-docker', level: 85 },
      { name: 'AWS', icon: 'fab fa-aws', level: 80 },
      { name: 'Figma', icon: 'fab fa-figma', level: 90 }
    ],
    design: [
      { name: 'UI/UX', icon: 'fas fa-paint-brush', level: 92 },
      { name: 'Photoshop', icon: 'fas fa-image', level: 85 },
      { name: 'Responsive', icon: 'fas fa-mobile-alt', level: 98 }
    ]
  };
  
  const fieldRect = constellationField.getBoundingClientRect();
  const fieldWidth = fieldRect.width;
  const fieldHeight = 500;
  
  let allSkills = [];
  let skillNodes = [];
  
  // Create skill nodes
  Object.keys(skills).forEach((category, categoryIndex) => {
    skills[category].forEach((skill, skillIndex) => {
      const angle = (categoryIndex * 90 + skillIndex * 15) * (Math.PI / 180);
      const radius = 120 + Math.random() * 100;
      const centerX = fieldWidth / 2;
      const centerY = fieldHeight / 2;
      
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      const skillNode = createSkillNode(skill, category, x, y);
      constellationField.appendChild(skillNode);
      
      allSkills.push({ skill, category, x, y, element: skillNode });
      skillNodes.push(skillNode);
    });
  });
  
  // Create connections between related skills
  createSkillConnections(constellationField, allSkills);
  
  // Animate skill nodes appearance
  skillNodes.forEach((node, index) => {
    setTimeout(() => {
      node.style.opacity = '1';
      node.style.transform = 'scale(1)';
    }, index * 100);
  });
}

function createSkillNode(skill, category, x, y) {
  const node = document.createElement('div');
  node.className = `skill-node ${category}`;
  node.style.left = x + 'px';
  node.style.top = y + 'px';
  node.style.opacity = '0';
  node.style.transform = 'scale(0)';
  node.style.transition = 'all 0.3s ease';
  
  const icon = document.createElement('i');
  icon.className = `skill-icon ${skill.icon}`;
  
  const tooltip = document.createElement('div');
  tooltip.className = 'skill-tooltip';
  tooltip.textContent = `${skill.name} - ${skill.level}%`;
  
  node.appendChild(icon);
  node.appendChild(tooltip);
  
  // Add hover effects
  node.addEventListener('mouseenter', () => {
    playSound(800, 100);
    node.style.transform += ' scale(1.1)';
  });
  
  node.addEventListener('mouseleave', () => {
    node.style.transform = node.style.transform.replace(' scale(1.1)', '');
  });
  
  return node;
}

function createSkillConnections(container, skills) {
  const connections = [
    // Frontend connections
    [0, 1], [0, 2], [2, 3], [3, 4],
    // Backend connections
    [5, 6], [6, 7], [7, 8],
    // Cross-category connections
    [2, 5], [4, 15], [13, 15]
  ];
  
  connections.forEach(([index1, index2]) => {
    if (skills[index1] && skills[index2]) {
      const line = createConnectionLine(skills[index1], skills[index2]);
      container.appendChild(line);
    }
  });
}

function createConnectionLine(skill1, skill2) {
  const line = document.createElement('div');
  line.className = 'skill-line';
  
  const dx = skill2.x - skill1.x;
  const dy = skill2.y - skill1.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  
  line.style.width = length + 'px';
  line.style.left = skill1.x + 'px';
  line.style.top = skill1.y + 'px';
  line.style.transform = `rotate(${angle}deg)`;
  line.style.transformOrigin = '0 50%';
  
  return line;
}

/* ==========================================
   PROJECTS SECTION
   ========================================== */

function generateProjectsGrid() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid || projectsGrid.children.length > 0) return;
  
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern, responsive e-commerce solution with real-time inventory and payment processing.',
      category: 'web',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://via.placeholder.com/400x300/0f3f0f/00ff41?text=E-COMMERCE',
      live: '#',
      code: '#'
    },
    {
      id: 2,
      title: 'Mobile Fitness App',
      description: 'Cross-platform fitness tracking app with social features and workout planning.',
      category: 'mobile',
      tags: ['React Native', 'Firebase', 'Redux'],
      image: 'https://via.placeholder.com/400x300/0f3f0f/00ff41?text=FITNESS+APP',
      live: '#',
      code: '#'
    },
    {
      id: 3,
      title: 'Dashboard UI Kit',
      description: 'Comprehensive admin dashboard with dark mode and customizable components.',
      category: 'ui',
      tags: ['Figma', 'Design System', 'Components'],
      image: 'https://via.placeholder.com/400x300/0f3f0f/00ff41?text=DASHBOARD',
      live: '#',
      code: '#'
    },
    {
      id: 4,
      title: 'AI Chat Interface',
      description: 'Intelligent chatbot interface with natural language processing and machine learning.',
      category: 'web',
      tags: ['Python', 'TensorFlow', 'WebSocket'],
      image: 'https://via.placeholder.com/400x300/0f3f0f/00ff41?text=AI+CHAT',
      live: '#',
      code: '#'
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'Custom portfolio website with advanced animations and interactive elements.',
      category: 'web',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
      image: 'https://via.placeholder.com/400x300/0f3f0f/00ff41?text=PORTFOLIO',
      live: '#',
      code: '#'
    },
    {
      id: 6,
      title: 'Brand Identity',
      description: 'Complete brand identity design including logo, typography, and brand guidelines.',
      category: 'ui',
      tags: ['Illustrator', 'Branding', 'Identity'],
      image: 'https://via.placeholder.com/400x300/0f3f0f/00ff41?text=BRANDING',
      live: '#',
      code: '#'
    }
  ];
  
  projects.forEach((project, index) => {
    const projectCard = createProjectCard(project);
    projectsGrid.appendChild(projectCard);
    
    // Animate card appearance
    setTimeout(() => {
      projectCard.style.opacity = '1';
      projectCard.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.setAttribute('data-category', project.category);
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  
  card.innerHTML = `
    <div class="project-image">
      <img src="${project.image}" alt="${project.title}">
    </div>
    <div class="project-content">
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-tags">
        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
      </div>
      <div class="project-actions">
        <button class="project-btn" data-action="live">LAUNCH</button>
        <button class="project-btn" data-action="code">CODE</button>
      </div>
    </div>
  `;
  
  // Add event listeners
  card.addEventListener('click', () => openProjectModal(project));
  
  const actionButtons = card.querySelectorAll('.project-btn');
  actionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = button.getAttribute('data-action');
      playSound(1000, 100);
      
      if (action === 'live') {
        window.open(project.live, '_blank');
      } else if (action === 'code') {
        window.open(project.code, '_blank');
      }
    });
  });
  
  return card;
}

function handleProjectClick(e) {
  const card = e.currentTarget;
  const projectId = card.getAttribute('data-project-id');
  // Handle project modal opening
  playSound(800, 150);
}

function handleProjectHover(e) {
  playSound(600, 50);
}

function handleFilterClick(e) {
  const filter = e.target.getAttribute('data-filter');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Update active filter button
  filterButtons.forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
  
  // Filter project cards
  projectCards.forEach(card => {
    const category = card.getAttribute('data-category');
    if (filter === 'all' || category === filter) {
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
  
  playSound(900, 100);
}

function openProjectModal(project) {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  const modalTags = document.getElementById('modal-tags');
  const modalTech = document.getElementById('modal-tech');
  const modalLive = document.getElementById('modal-live');
  const modalCode = document.getElementById('modal-code');
  
  modalTitle.textContent = project.title;
  modalImage.src = project.image;
  modalDescription.textContent = project.description;
  modalLive.href = project.live;
  modalCode.href = project.code;
  
  modalTags.innerHTML = project.tags.map(tag => 
    `<span class="project-tag">${tag}</span>`
  ).join('');
  
  modalTech.innerHTML = project.tags.map(tech => 
    `<span>${tech}</span>`
  ).join('');
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  playSound(1200, 200);
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  
  playSound(800, 100);
}

/* ==========================================
   CONTACT FORM
   ========================================== */

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('.submit-btn');
  const formStatus = document.getElementById('form-status');
  const formData = new FormData(form);
  
  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual EmailJS implementation)
  setTimeout(() => {
    // TODO: Add EmailJS implementation here
    // EmailJS.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    //   name: formData.get('name'),
    //   email: formData.get('email'),
    //   subject: formData.get('subject'),
    //   message: formData.get('message')
    // }, 'YOUR_PUBLIC_KEY')
    
    // For demo purposes, show success message
    showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
    form.reset();
    
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    
    playSound(1200, 300);
  }, 2000);
}

function showFormStatus(type, message) {
  const formStatus = document.getElementById('form-status');
  formStatus.className = `form-status ${type}`;
  formStatus.textContent = message;
  
  setTimeout(() => {
    formStatus.style.opacity = '0';
  }, 5000);
}

/* ==========================================
   SECTION INITIALIZATION
   ========================================== */

function initializeSections() {
  // Initialize any section-specific functionality
  setupFormAnimations();
}

function setupFormAnimations() {
  const formGroups = document.querySelectorAll('.form-group');
  
  formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');
    
    input.addEventListener('focus', () => {
      playSound(400, 100);
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        label.style.top = '';
        label.style.fontSize = '';
        label.style.color = '';
      }
    });
  });
}

/* ==========================================
   SOUND SYSTEM
   ========================================== */

function toggleSound() {
  PortfolioApp.soundEnabled = !PortfolioApp.soundEnabled;
  const soundToggle = document.getElementById('sound-toggle');
  const icon = soundToggle.querySelector('i');
  
  if (PortfolioApp.soundEnabled) {
    icon.className = 'fas fa-volume-up';
    soundToggle.classList.add('active');
    playSound(800, 200);
  } else {
    icon.className = 'fas fa-volume-mute';
    soundToggle.classList.remove('active');
  }
}

/* ==========================================
   CTA BUTTON HANDLERS
   ========================================== */

function handleCTAClick(e) {
  const target = e.target.getAttribute('data-target');
  if (target) {
    scrollToSection(target);
    playSound(1000, 200);
  }
}

/* ==========================================
   EASTER EGG - KONAMI CODE
   ========================================== */

function handleKeyDown(e) {
  // Konami code detection
  if (e.code === PortfolioApp.konamiCode[PortfolioApp.konamiIndex]) {
    PortfolioApp.konamiIndex++;
    
    if (PortfolioApp.konamiIndex === PortfolioApp.konamiCode.length) {
      triggerEasterEgg();
      PortfolioApp.konamiIndex = 0;
    }
  } else {
    PortfolioApp.konamiIndex = 0;
  }
  
  // ESC key to close modal/easter egg
  if (e.key === 'Escape') {
    closeModal();
    closeEasterEgg();
  }
}

function triggerEasterEgg() {
  const easterEgg = document.getElementById('easter-egg');
  const matrixCanvas = document.getElementById('matrix-canvas');
  
  easterEgg.classList.add('active');
  
  // Initialize matrix effect for easter egg
  initializeEasterEggMatrix(matrixCanvas);
  
  playSound(400, 100);
  setTimeout(() => playSound(600, 100), 200);
  setTimeout(() => playSound(800, 100), 400);
  setTimeout(() => playSound(1000, 200), 600);
  
  // Auto-close after 10 seconds
  setTimeout(closeEasterEgg, 10000);
}

function closeEasterEgg() {
  const easterEgg = document.getElementById('easter-egg');
  easterEgg.classList.remove('active');
}

function initializeEasterEggMatrix(canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const matrix = "01";
  const matrixArray = matrix.split("");
  const fontSize = 20;
  const columns = canvas.width / fontSize;
  const drops = [];
  
  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }
  
  function drawEasterMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px JetBrains Mono';
    
    for (let i = 0; i < drops.length; i++) {
      const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    
    if (document.getElementById('easter-egg').classList.contains('active')) {
      requestAnimationFrame(drawEasterMatrix);
    }
  }
  
  drawEasterMatrix();
}

// Setup easter egg close button
document.addEventListener('DOMContentLoaded', () => {
  const easterClose = document.getElementById('easter-close');
  if (easterClose) {
    easterClose.addEventListener('click', closeEasterEgg);
  }
});

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

function handleResize() {
  // Reinitialize cursor for mobile/desktop
  if (window.innerWidth <= 768) {
    document.getElementById('cursor').style.display = 'none';
    document.getElementById('cursor-trail').style.display = 'none';
  } else {
    document.getElementById('cursor').style.display = 'block';
    document.getElementById('cursor-trail').style.display = 'block';
  }
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  // Cancel animation frames
  Object.values(PortfolioApp.animationFrames).forEach(frame => {
    if (frame) cancelAnimationFrame(frame);
  });
  
  // Close audio context
  if (PortfolioApp.audioContext) {
    PortfolioApp.audioContext.close();
  }
});

// Export for debugging (if needed)
if (typeof window !== 'undefined') {
  window.PortfolioApp = PortfolioApp;
}

/*
 * TODO: EmailJS Integration
 * 
 * To make the contact form functional:
 * 1. Sign up for EmailJS (https://www.emailjs.com/)
 * 2. Add the EmailJS SDK to your HTML:
 *    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
 * 3. Replace the form submission simulation in handleFormSubmit() with:
 *    
 *    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
 *      name: formData.get('name'),
 *      email: formData.get('email'),
 *      subject: formData.get('subject'),
 *      message: formData.get('message')
 *    }, 'YOUR_PUBLIC_KEY').then(
 *      (response) => {
 *        showFormStatus('success', 'Message sent successfully!');
 *        form.reset();
 *      },
 *      (error) => {
 *        showFormStatus('error', 'Failed to send message. Please try again.');
 *      }
 *    );
 */