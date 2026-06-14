import menuBar from "./src/menubar.js";
// --- Profile Page Tab Switching ---
const profileNavBtns = document.querySelectorAll('.profile-nav button');
const profileTabs = document.querySelectorAll('.profile-tab');

if (profileNavBtns.length > 0) {
  profileNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Remove active class from all buttons
      profileNavBtns.forEach(b => b.classList.remove('active'));
      // 2. Add active class to clicked button
      btn.classList.add('active');

      // 3. Hide all tabs
      profileTabs.forEach(tab => tab.classList.remove('active'));
      
      // 4. Show the target tab
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });
}

menuBar()