document.addEventListener('DOMContentLoaded', () => {

  document.body.style.backgroundColor = "lavender";

    // ---------- NAV TOGGLE ----------
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('open');
    });
  }

  // close mobile nav when a nav link is clicked (good UX)
  document.querySelectorAll('#main-nav a').forEach(a => {
    a.addEventListener('click', () => {
      if(mainNav && mainNav.classList.contains('open')){
        mainNav.classList.remove('open');
        if(navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ---------- REVEAL ON SCROLL ----------
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('active');
          obs.unobserve(entry.target); // reveal once
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => obs.observe(el));
  } else {
    // fallback: show all
    revealEls.forEach(el => el.classList.add('active'));
  }

  // ---------- SIMPLE FORM VALIDATION ----------
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // prevent real submit for demo
      clearFormErrors(form);

      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');
      let valid = true;

      if(!name.value || name.value.trim().length < 2){
        showError(name, 'Please enter your name (at least 2 characters).');
        valid = false;
      }
      if(!validateEmail(email.value)){
        showError(email, 'Please enter a valid email address.');
        valid = false;
      }
      if(!message.value || message.value.trim().length < 10){
        showError(message, 'Message must be at least 10 characters.');
        valid = false;
      }

      if(valid){
        // Demo success message (in real site you would send to server)
        const success = document.createElement('div');
        success.className = 'form-success';
        success.innerText = 'Thanks! Your message was sent.';
        form.appendChild(success);
        form.reset();
        setTimeout(() => success.remove(), 6000);
      }
    });
  }

  function showError(el, msg){
    clearError(el);
    el.setAttribute('aria-invalid','true');
    const node = document.createElement('div');
    node.className = 'error';
    node.innerText = msg;
    el.parentNode.insertBefore(node, el.nextSibling);
  }
  function clearError(el){
    if(!el) return;
    el.removeAttribute('aria-invalid');
    const next = el.nextElementSibling;
    if(next && next.classList.contains('error')) next.remove();
  }
  function clearFormErrors(formEl){
    formEl.querySelectorAll('.error').forEach(n => n.remove());
    formEl.querySelectorAll('[aria-invalid="true"]').forEach(i => i.removeAttribute('aria-invalid'));
  }
  function validateEmail(email){
    return /\S+@\S+\.\S+/.test(email);
  }

});

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("magicBtn");
  const message = document.getElementById("message");

  button.addEventListener("click", function () {
    message.textContent = "✨ You are elegant!";
    message.style.color = "green";
  });
});

