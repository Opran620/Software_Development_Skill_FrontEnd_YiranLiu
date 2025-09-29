// =================== FAQ Accordion Logic ===================
// Run only after the document is fully parsed
document.addEventListener('DOMContentLoaded', () => {
  const faqArea = document.querySelector('.faq-content');

  // Listen for clicks anywhere inside the FAQ container
  faqArea.addEventListener('click', (event) => {
    // Find the nearest header wrapper if the click is on the title or icon
    const header = event.target.closest('.faq-group-header');
    if (!header) return; // Click happened outside a header, ignore it

    const currentGroup = header.parentElement;
    const bodySection = currentGroup.querySelector('.faq-group-body');
    const toggleIcon = header.querySelector('i');

    // Flip the plus/minus icon
    toggleIcon.classList.toggle('fa-plus');
    toggleIcon.classList.toggle('fa-minus');

    // Show or hide the answer text
    bodySection.classList.toggle('open');

    // Close all other open FAQ items to keep only one expanded
    faqArea.querySelectorAll('.faq-group').forEach((group) => {
      if (group !== currentGroup) {
        group.querySelector('.faq-group-body').classList.remove('open');
        const icon = group.querySelector('.faq-group-header i');
        icon.classList.add('fa-plus');
        icon.classList.remove('fa-minus');
      }
    });
  });
});

// =================== Mobile Navigation Toggle ===================
// Separate listener to keep the features independent
document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.querySelector('.hamburger-button');
  const mobileNav = document.querySelector('.mobile-menu');

  // Clicking the hamburger switches the menu between visible/hidden
  burgerBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
  });
});
