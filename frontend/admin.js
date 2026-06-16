// --- Admin Dashboard Tab Switching ---
const adminNavBtns = document.querySelectorAll('.admin-nav button');
const adminTabs = document.querySelectorAll('.admin-content');

if (adminNavBtns.length > 0) {
  adminNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Remove 'active' class from all buttons
      adminNavBtns.forEach(b => b.classList.remove('active'));
      // 2. Add 'active' class to the clicked button
      btn.classList.add('active');

      // 3. Hide all tabs
      adminTabs.forEach(tab => {
        tab.style.display = 'none';
        tab.classList.remove('active');
      });
      
      // 4. Show the target tab
      const targetId = btn.getAttribute('data-target');
      const targetTab = document.getElementById(targetId);
      if(targetTab) {
        targetTab.style.display = 'block';
        targetTab.classList.add('active');
      }
    });
  });
}