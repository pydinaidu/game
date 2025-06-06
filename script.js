// Counter functionality
let count = 0;
function incrementCounter() {
    count++;
    document.getElementById('count').textContent = count;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Here you would typically send this data to a server
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = 'none';
    }
});

// Calendar Implementation
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    initializeSearchBar();
    initializeNotifications();
});

function initializeCalendar() {
    const calendar = document.getElementById('calendar');
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Create calendar header
    const calendarHeader = document.createElement('div');
    calendarHeader.className = 'calendar-header';
    calendarHeader.innerHTML = `
        <button class="prev-month">&lt;</button>
        <h3>${monthNames[currentMonth]} ${currentYear}</h3>
        <button class="next-month">&gt;</button>
    `;
    calendar.appendChild(calendarHeader);

    // Create calendar grid
    createCalendarGrid(calendar, date);

    // Add event listeners for month navigation
    const prevButton = calendar.querySelector('.prev-month');
    const nextButton = calendar.querySelector('.next-month');
    const monthDisplay = calendar.querySelector('h3');

    prevButton.addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        updateCalendar(calendar, date, monthDisplay, monthNames);
    });

    nextButton.addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        updateCalendar(calendar, date, monthDisplay, monthNames);
    });

    // Add calendar styles
    addCalendarStyles();
}

function createCalendarGrid(calendar, date) {
    const daysGrid = document.createElement('div');
    daysGrid.className = 'calendar-grid';

    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        daysGrid.appendChild(dayHeader);
    });

    // Get first day of month and total days
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    
    // Add empty cells for days before first of month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        daysGrid.appendChild(emptyDay);
    }

    // Add days of month
    const currentDate = new Date();
    for (let i = 1; i <= totalDays; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        if (date.getMonth() === currentDate.getMonth() && 
            date.getFullYear() === currentDate.getFullYear() && 
            i === currentDate.getDate()) {
            dayCell.classList.add('current-day');
        }
        dayCell.textContent = i;
        daysGrid.appendChild(dayCell);
    }

    calendar.appendChild(daysGrid);
}

function updateCalendar(calendar, date, monthDisplay, monthNames) {
    const grid = calendar.querySelector('.calendar-grid');
    grid.remove();
    createCalendarGrid(calendar, date);
    monthDisplay.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function addCalendarStyles() {
    const styles = `
        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding: 0.5rem;
        }

        .calendar-header button {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: var(--primary-color);
        }

        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 0.5rem;
        }

        .calendar-day-header {
            text-align: center;
            font-weight: bold;
            color: var(--text-light);
            padding: 0.5rem;
        }

        .calendar-day {
            text-align: center;
            padding: 0.5rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .calendar-day:hover {
            background-color: var(--bg-light);
        }

        .calendar-day.empty {
            cursor: default;
        }

        .calendar-day.current-day {
            background-color: var(--primary-color);
            color: white;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Search Bar Functionality
function initializeSearchBar() {
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // You can implement the search functionality here
        // For example, searching through students, teachers, or classes
        console.log('Searching for:', searchTerm);
    });
}

// Notifications Functionality
function initializeNotifications() {
    const notificationBell = document.querySelector('.notifications i');
    notificationBell.addEventListener('click', () => {
        // You can implement the notifications panel here
        alert('Notifications panel will be implemented here');
    });
}

// Stats Animation
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const finalValue = parseFloat(stat.textContent.replace(/[^0-9.]/g, ''));
    animateValue(stat, 0, finalValue, 1500);
});

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const isPercentage = element.textContent.includes('%');
    const prefix = element.textContent.startsWith('$') ? '$' : '';

    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (end - start) * progress);
        element.textContent = `${prefix}${current}${isPercentage ? '%' : ''}`;

        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }

    requestAnimationFrame(updateValue);
} 