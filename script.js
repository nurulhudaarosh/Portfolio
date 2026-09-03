// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .skill-item');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  follower.style.left = e.clientX - 20 + 'px';
  follower.style.top = e.clientY - 20 + 'px';
});

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    follower.style.transform = 'scale(1.5)';
    follower.style.borderColor = 'var(--primary)';
  });
  
  link.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    follower.style.transform = 'scale(1)';
    follower.style.borderColor = 'var(--primary-light)';
  });
});

// Navbar
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Active nav link
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.querySelectorAll('a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav);

// Typing Effect
const heroTitle = document.getElementById('heroTitle');
const titles = [
  'B.Sc. CSE Student',
  'Full Stack Developer',
  'IoT Enthusiast',
  'Problem Solver'
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentTitle = titles[titleIndex];

  if (isDeleting) {
    heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 30 : 80;

  if (!isDeleting && charIndex === currentTitle.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}

setTimeout(typeEffect, 1000);

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.glass-card, .timeline-item, .section-header, .terminal, .orbit-scene').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// 3D Tilt Effect on Cards
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// Terminal Functionality
const terminal = document.querySelector('.terminal');
const terminalBody = document.getElementById('terminalBody');
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = terminalBody.querySelector('.terminal-output');

const commands = {
  help: () => [
    { text: 'Available commands:', class: 'info' },
    { text: '  help       - Show this help message', class: 'output' },
    { text: '  about      - About me', class: 'output' },
    { text: '  skills     - List my skills', class: 'output' },
    { text: '  projects   - Show my projects', class: 'output' },
    { text: '  education  - My education info', class: 'output' },
    { text: '  contact    - Get my contact info', class: 'output' },
    { text: '  github     - Open my GitHub', class: 'output' },
    { text: '  linkedin   - Open my LinkedIn', class: 'output' },
    { text: '  email      - Copy my email', class: 'output' },
    { text: '  clear      - Clear terminal', class: 'output' },
    { text: '  whoami     - Who am I?', class: 'output' },
    { text: '  date       - Current date', class: 'output' },
  ],
  
  about: () => [
    { text: 'MD. Nurul Huda', class: 'info' },
    { text: 'B.Sc. in Computer Science and Engineering', class: 'output' },
    { text: 'United International University, Dhaka', class: 'output' },
    { text: 'CGPA: 3.74 | Expected Graduation: 2026', class: 'output' },
    { text: '', class: 'output' },
    { text: 'As a student at UIU, I aim to apply my skills', class: 'output' },
    { text: 'and knowledge to contribute effectively in a', class: 'output' },
    { text: 'dynamic environment.', class: 'output' },
  ],
  
  skills: () => [
    { text: 'Technical Skills:', class: 'info' },
    { text: '', class: 'output' },
    { text: 'Languages:    C, C++, Python, JavaScript, SQL', class: 'output' },
    { text: 'Web:          HTML, CSS, Tailwind, React, Node.js, Express.js', class: 'output' },
    { text: 'Database:     MySQL', class: 'output' },
    { text: 'Tools:        Git, Docker, VS Code, LaTeX', class: 'output' },
    { text: 'IoT:          ESP32, Arduino, Raspberry Pi', class: 'output' },
    { text: 'OS:           Linux (Fedora, Ubuntu, Arch)', class: 'output' },
  ],
  
  projects: () => [
    { text: 'Featured Projects:', class: 'info' },
    { text: '', class: 'output' },
    { text: '1. SPAK - Smart Precision Agricultural Kit', class: 'command-name' },
    { text: '   Team Leader | ESP32, NPK Sensor, Web Dashboard', class: 'output' },
    { text: '   Modular rover for precision agriculture', class: 'output' },
    { text: '', class: 'output' },
    { text: '2. UniHub - Social Platform', class: 'command-name' },
    { text: '   DBMS Lab Project | HTML, JS, Tailwind, Express.js, MySQL', class: 'output' },
    { text: '   Role-based access for students, alumni, faculty', class: 'output' },
    { text: '', class: 'output' },
    { text: '3. Self Management System', class: 'command-name' },
    { text: '   AOOP Lab | JavaFX, OOP | 2nd Runner-Up', class: 'output' },
    { text: '   Personal dashboard with task & goal management', class: 'output' },
  ],
  
  education: () => [
    { text: 'Education:', class: 'info' },
    { text: '', class: 'output' },
    { text: 'United International University (UIU)', class: 'command-name' },
    { text: '  B.Sc. in Computer Science and Engineering', class: 'output' },
    { text: '  Expected Graduation: 2026 | CGPA: 3.74', class: 'output' },
    { text: '', class: 'output' },
    { text: 'Mosjid Mission Academy School and College', class: 'command-name' },
    { text: '  H.S.C. (Science), 2021 | GPA: 5.00', class: 'output' },
  ],
  
  contact: () => [
    { text: 'Contact Information:', class: 'info' },
    { text: '', class: 'output' },
    { text: 'Email:    mhuda223303@bscse.uiu.ac.bd', class: 'output' },
    { text: 'Phone:    +880 1792-021499', class: 'output' },
    { text: 'LinkedIn: linkedin.com/in/nurul-huda-arosh', class: 'output' },
    { text: 'GitHub:   github.com/nurul5801', class: 'output' },
    { text: 'Address:  Queen\'s Garden, Nurerchala, Vatara, Dhaka', class: 'output' },
  ],
  
  github: () => {
    window.open('https://github.com/nurul5801', '_blank');
    return [{ text: 'Opening GitHub profile...', class: 'success' }];
  },
  
  linkedin: () => {
    window.open('https://linkedin.com/in/nurul-huda-arosh-776241168/', '_blank');
    return [{ text: 'Opening LinkedIn profile...', class: 'success' }];
  },
  
  email: () => {
    navigator.clipboard.writeText('mhuda223303@bscse.uiu.ac.bd');
    return [{ text: 'Email copied to clipboard!', class: 'success' }];
  },
  
  clear: () => {
    terminalOutput.innerHTML = '';
    return [];
  },
  
  whoami: () => [
    { text: 'nurul', class: 'info' },
  ],
  
  date: () => [
    { text: new Date().toString(), class: 'output' },
  ],
  
  ls: () => [
    { text: 'about.md  skills.txt  projects/  contact.info', class: 'output' },
  ],
  
  pwd: () => [
    { text: '/home/nurul/portfolio', class: 'output' },
  ],
};

function addOutput(lines) {
  lines.forEach(line => {
    const p = document.createElement('p');
    p.className = `terminal-line ${line.class || ''}`;
    p.textContent = line.text;
    terminalOutput.appendChild(p);
  });
}

function addCommand(cmd) {
  const p = document.createElement('p');
  p.className = 'terminal-line cmd';
  p.innerHTML = `<span class="terminal-prompt">nurul@portfolio ~ %</span> ${cmd}`;
  terminalOutput.appendChild(p);
}

function processCommand(input) {
  const trimmed = input.trim().toLowerCase();
  
  addCommand(input);
  
  if (trimmed === '') {
    return;
  }
  
  if (commands[trimmed]) {
    const output = commands[trimmed]();
    if (output && output.length > 0) {
      addOutput(output);
    }
  } else {
    addOutput([
      { text: `command not found: ${trimmed}`, class: 'error' },
      { text: 'Type "help" to see available commands.', class: 'output' },
    ]);
  }
  
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    processCommand(terminalInput.value);
    terminalInput.value = '';
  }
  
  // Command history with arrow keys
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    // Could implement command history here
  }
});

// Focus terminal input when clicking on terminal
terminal.addEventListener('click', () => {
  terminalInput.focus();
});

// Terminal 3D Effect
terminal.addEventListener('mousemove', (e) => {
  const rect = terminal.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 40;
  const rotateY = (centerX - x) / 40;
  
  terminal.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

terminal.addEventListener('mouseleave', () => {
  terminal.style.transform = 'rotateY(-10deg) rotateX(5deg)';
});

// Parallax Effect on Hero
document.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
  
  document.querySelectorAll('.gradient-orb').forEach((orb, index) => {
    const speed = (index + 1) * 0.5;
    orb.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
  });
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  const submitBtn = contactForm.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span>Sending...</span>';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert(`Thank you, ${name}! Your message has been sent.`);
    contactForm.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Particle Generation
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

createParticles();

// Skill Items Hover Effect
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
      border-radius: 16px;
      animation: rippleEffect 0.6s ease-out forwards;
      pointer-events: none;
    `;
    item.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleEffect {
    0% {
      transform: scale(0.5);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Magnetic effect on skill items
document.addEventListener('mousemove', (e) => {
  skillItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 150;
    
    if (distance < maxDistance) {
      const strength = (1 - distance / maxDistance) * 0.3;
      const moveX = deltaX * strength;
      const moveY = deltaY * strength;
      
      item.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
      item.style.transform = '';
    }
  });
});

// 3D Orbit Engine
(function initOrbit() {
  const scene = document.getElementById('orbitScene');
  if (!scene) return;
  const planets = Array.from(scene.querySelectorAll('.planet'));
  const ellipses = [scene.querySelector('.e1'), scene.querySelector('.e2'), scene.querySelector('.e3')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const RING_SPEED = [0.28, -0.2, 0.14]; // rad/s, different timeframe + direction per orbit
  const TILT = 0.42;

  // Assign planets round-robin to the 3 rings
  const byRing = [[], [], []];
  planets.forEach((p, i) => byRing[i % 3].push(p));
  byRing.forEach((group, r) => group.forEach((p, k) => {
    p._ring = r;
    p._angle = (k / group.length) * Math.PI * 2 + r * 0.5;
  }));

  let paused = false;
  planets.forEach(p => {
    p.addEventListener('mouseenter', () => {
      paused = true;
      cursor.style.transform = 'scale(2)';
    });
    p.addEventListener('mouseleave', () => {
      paused = false;
      cursor.style.transform = 'scale(1)';
    });
  });

  function layout() {
    const W = scene.clientWidth, H = scene.clientHeight;
    const base = Math.max(80, Math.min(W / 2 - 58, (H / 2 - 58) / TILT, 330));
    const radii = [0.45, 0.72, 1.0].map(f => base * f);
    ellipses.forEach((el, r) => {
      if (!el) return;
      el.style.width = radii[r] * 2 + 'px';
      el.style.height = radii[r] * 2 * TILT + 'px';
    });
    return { cx: W / 2, cy: H / 2, radii };
  }

  let geo = layout();
  window.addEventListener('resize', () => { geo = layout(); });

  function frame() {
    planets.forEach(p => {
      const r = p._ring;
      const x = geo.cx + geo.radii[r] * Math.cos(p._angle);
      const y = geo.cy + geo.radii[r] * TILT * Math.sin(p._angle);
      const depth = (Math.sin(p._angle) + 1) / 2; // 0 = back, 1 = front
      const s = 0.72 + 0.38 * depth;
      p.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${s})`;
      p.style.opacity = 0.55 + 0.45 * depth;
      p.style.zIndex = Math.round(1 + 18 * depth);
    });
  }

  if (reduceMotion) {
    frame();
    return;
  }

  let last = performance.now();
  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!paused) planets.forEach(p => { p._angle += RING_SPEED[p._ring] * dt; });
    frame();
    requestAnimationFrame(tick);
  }
  frame();
  requestAnimationFrame(tick);
})();

// Theme Toggle (dark / light)
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Page Load Animation
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  
  // Animate hero elements
  const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-title-wrapper, .hero-description, .hero-buttons, .hero-social');
  
  heroElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      el.style.transition = 'all 0.6s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + index * 100);
  });
});
