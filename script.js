// Menu functionality
function initializeMenu() {
  const menuIcon = document.getElementById('menuIcon');
  const navMenu = document.getElementById('navMenu');
  const menuOverlay = document.createElement('div');
  menuOverlay.classList.add('menu-overlay');
  document.body.appendChild(menuOverlay);
  
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking on overlay
  menuOverlay.addEventListener('click', () => {
    menuIcon.classList.remove('active');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close menu when clicking on a nav link
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuIcon.classList.remove('active');
      navMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when window is resized beyond mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      menuIcon.classList.remove('active');
      navMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Initialize result display functionality
function showResult(message, type) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = message;
  resultDiv.className = `result ${type} animate__animated animate__fadeInUp`;
  resultDiv.style.display = 'block';
  resultDiv.style.opacity = '1';
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
  initializeMenu();
  
  // Set up event listeners
  document.getElementById('invitationForm').addEventListener('submit', handleFormSubmit);
  
  // Update copyright year
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});

function handleFormSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const submitButton = document.querySelector('button[type="submit"]');
  const progressBar = document.querySelector('.progress-bar');
  const progress = document.querySelector('.progress');

  // Verify hCaptcha
  const hcaptchaResponse = hcaptcha.getResponse();
  if (!hcaptchaResponse) {
    showResult('<i class="fas fa-exclamation-triangle"></i> 請完成人機驗證。', 'error');
    document.querySelector('.container').classList.add('shake');
    setTimeout(() => {
      document.querySelector('.container').classList.remove('shake');
    }, 1000);
    return;
  }

  // Show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 發送中...';
  progressBar.style.display = 'block';
  gsap.to(progress, {duration: 2, width: '100%', ease: "power1.inOut"});
  document.querySelector('.loading-overlay').style.display = 'flex';

  // API call
  fetch('https://script.google.com/macros/s/AKfycbwj7dCVukOvJ8MR_PsfkymKDfivZppo0RFkqxpJSMVaYZLiNSRgqMwwOIMXNQZByqdfag/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `email=${encodeURIComponent(email)}`
  })
  .then(() => {
    showResult('<i class="fas fa-check-circle"></i> 邀請碼已發送到您的郵箱，請查收。', 'success');
    showInfoModal();
    startCountdown(28800); // 8 hours
  })
  .catch(error => {
    console.error('Error:', error);
    showResult(`<i class="fas fa-times-circle"></i> 發送失敗: ${error.message}`, 'error');
    document.querySelector('.container').classList.add('shake');
  })
  .finally(() => {
    // Reset UI state
    submitButton.disabled = false;
    submitButton.innerHTML = '發送邀請碼';
    gsap.to(progressBar, {
      duration: 0.5, 
      opacity: 0, 
      onComplete: () => {
        progressBar.style.display = 'none';
        progress.style.width = '0%';
      }
    });
    document.querySelector('.loading-overlay').style.display = 'none';
  });
}

function startCountdown(count) {
  let counter = count;
  const countdownDiv = document.getElementById('countdown');
  countdownDiv.style.display = 'block';
  const intervalId = setInterval(() => {
    const hours = Math.floor(counter / 3600);
    const minutes = Math.floor((counter % 3600) / 60);
    const seconds = counter % 60;
    countdownDiv.textContent = `您可以在 ${hours} 小時 ${minutes} 分鐘 ${seconds} 秒後再次申請邀請碼。`;
    counter--;
    if (counter < 0) {
      clearInterval(intervalId);
      countdownDiv.style.display = 'none';
    }
  }, 1000);
}

// Modal functionality
const modal = document.getElementById('infoModal');
const closeBtn = document.querySelector('.close');
const modalCloseBtn = document.querySelector('.modal-close-btn');

function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with close button
closeBtn.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// Add hover effects to instruction cards
const cards = document.querySelectorAll('.instruction-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
    card.style.boxShadow = '0 6px 15px rgba(74, 111, 255, 0.15)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
  });
});

// 禁用快捷鍵
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'a' || e.key === 'A' || e.key === 'x' || e.key === 'X')) {
    e.preventDefault();
  }
});

// 檢測開發者工具
setInterval(function () {
  const devToolsOpened = function () {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    return widthThreshold || heightThreshold;
  };

  if (devToolsOpened()) {
    document.body.innerHTML = '<h1>請勿使用開發者工具！</h1>';
    window.location.reload();
  }
}, 1000);