//FAQ
document.addEventListener('DOMContentLoaded', () => {
  const faqContainer = document.querySelector('.faq-content');

  faqContainer.addEventListener('click', (e) => {
    const groupHeader = e.target.closest('.faq-group-header');

    if (!groupHeader) return;

    const group = groupHeader.parentElement;
    const groupBody = group.querySelector('.faq-group-body');
    const icon = groupHeader.querySelector('i');

    icon.classList.toggle('fa-plus');
    icon.classList.toggle('fa-minus');

    groupBody.classList.toggle('open');

    const otherGroups = faqContainer.querySelectorAll('.faq-group');

    otherGroups.forEach((otherGroup) => {
      if (otherGroup !== group) {
        const otherGroupBody = otherGroup.querySelector('.faq-group-body');
        const otherIcon = otherGroup.querySelector('.faq-group-header i');

        otherGroupBody.classList.remove('open');
        otherIcon.classList.remove('fa-minus');
        otherIcon.classList.add('fa-plus');
      }
    });
  });
});

//Mobile menu
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.querySelector('.hamburger-button');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburgerButton.addEventListener('click', () =>
    mobileMenu.classList.toggle('active')
  );
});

//Dropdown for mobile
document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    
    if (window.innerWidth <= 960) {
      dropdownLink.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
      });
    }
  });
});

//Added a cool animation to newsletter subscription, nothing actually happens when clicked
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.querySelector('footer form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      
      if (emailInput.value) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;
        
        //Timeout to simulate subscription (don't actually know how long it should take)
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
          submitBtn.style.background = 'green';
          emailInput.value = '';
          
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 3000);
        }, 2000);
      }
    });
  }
});

//Demo booking modal
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('demoModal');
  const bookDemoBtn = document.getElementById('bookDemoBtn');
  const closeModal = document.querySelector('.close-modal');
  const cancelDemo = document.getElementById('cancelDemo');
  const confirmDemo = document.getElementById('confirmDemo');
  const calendarDays = document.getElementById('calendarDays');
  const currentMonthElement = document.getElementById('currentMonth');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  
  let currentDate = new Date();
  let selectedDate = null;
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  if (bookDemoBtn) {
    bookDemoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'block';
      generateCalendar();
    });
  }
  
  const closeModalFunction = () => {
    modal.style.display = 'none';
  };
  
  if (closeModal){
    closeModal.addEventListener('click', closeModalFunction);
  }
  
  if (cancelDemo){
    cancelDemo.addEventListener('click', closeModalFunction);
  }
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModalFunction();
    }
  });
  
  if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      generateCalendar();
    });
  }
  
  if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      generateCalendar();
    });
  }
  
  //This function generates the calendar, got some help from here: https://dev.to/wizdomtek/creating-a-dynamic-calendar-using-html-css-and-javascript-29m
  function generateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    currentMonthElement.textContent = `${months[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    let calendarHTML = '';
    
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      calendarHTML += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isPast = date < today.setHours(0, 0, 0, 0);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
      let classes = 'calendar-day';
      
      if (isPast){
        classes += ' past';
      }
      if (isToday){
        classes += ' today';
      }
      if (isSelected){
        classes += ' selected';
      }
      
      calendarHTML += `<div class="${classes}" data-date="${year}-${month}-${day}">${day}</div>`;
    }

    const totalCells = calendarHTML.split('calendar-day').length - 1;
    const remainingCells = 42 - totalCells;
    
    for (let day = 1; day <= remainingCells; day++) {
      calendarHTML += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    calendarDays.innerHTML = calendarHTML;
    
    const dayElements = calendarDays.querySelectorAll('.calendar-day:not(.other-month):not(.past)');
    dayElements.forEach(dayElement => {
      dayElement.addEventListener('click', () => {
        calendarDays.querySelectorAll('.calendar-day.selected').forEach(el => {
          el.classList.remove('selected');
        });
        
        dayElement.classList.add('selected');
        confirmDemo.disabled = false;
      });
    });
  }

  //When confirmed return to main page, the date is not currently used for anything
  if (confirmDemo) {
    confirmDemo.addEventListener('click', () => {
      confirmDemo.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
      confirmDemo.disabled = true;
      
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    });
  }
});