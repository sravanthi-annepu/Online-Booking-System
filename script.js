// Tab switching
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  if (tabId === 'history') displayBookingHistory();
}

// Book Course
document.getElementById("courseForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const course = document.getElementById("courseSelect").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const date = document.getElementById("courseDate").value;
  const duration = document.getElementById("courseDuration").value;

  const booking = { type: "course", course, name, email, date, duration };

  saveBooking(booking);

  this.reset();
  showConfirmation("✅ Course booked successfully.");
});

// Book Exam
document.getElementById("examForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const course = document.getElementById("examCourse").value;
  const name = document.getElementById("examName").value;
  const email = document.getElementById("examEmail").value;
  const date = document.getElementById("examDate").value;
  const time = document.getElementById("examTime").value;

  const booking = { type: "exam", course, name, email, date, time };

  saveBooking(booking);

  this.reset();
  showConfirmation("✅ Exam slot booked successfully.");
});

// Save Schedule
document.getElementById("scheduleForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const days = document.getElementById("days").value;
  const timeSlot = document.getElementById("timeSlot").value;

  const booking = { type: "schedule", days, timeSlot };

  saveBooking(booking);

  this.reset();
  showConfirmation("✅ Schedule saved.");
});

// Save to localStorage
function saveBooking(booking) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

// Display Booking History
function displayBookingHistory() {
  const historyDiv = document.getElementById("historyList");
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  if (bookings.length === 0) {
    historyDiv.innerHTML = "<p>No bookings found.</p>";
    return;
  }

  historyDiv.innerHTML = bookings.map((b, i) => {
    let text = "";
    if (b.type === "course") {
      text = `📘 <strong>${b.course}</strong> - ${b.name} (${b.email})<br>Start: ${b.date} | Duration: ${b.duration}`;
    } else if (b.type === "exam") {
      text = `📝 <strong>${b.course}</strong> Exam - ${b.name} (${b.email})<br>Date: ${b.date} | Time: ${b.time}`;
    } else if (b.type === "schedule") {
      text = `📅 Schedule: ${b.days} @ ${b.timeSlot}`;
    }

    return `
      <div class="history-item">
        ${text}
        <button class="delete-btn" onclick="deleteBooking(${i})">🗑️ Delete</button>
      </div>
    `;
  }).join("");
}

// Delete single booking
window.deleteBooking = function(index) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.splice(index, 1);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  displayBookingHistory();
  showConfirmation("✅ Booking deleted.");
};

// Clear All
document.getElementById("clearBookingsBtn").addEventListener("click", () => {
  const confirmClear = window.confirm("⚠️ Are you sure you want to delete all booking history?");
  if (confirmClear) {
    localStorage.removeItem("bookings");
    displayBookingHistory();
    showConfirmation("🗑️ All bookings cleared.");
  }
});


// Print Functions
// Print Course Confirmation
function printCourse() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const regId = document.getElementById("regId").value;
  const branch = document.getElementById("branch").value;
  const course = document.getElementById("courseSelect").value;
  const date = document.getElementById("courseDate").value;
  const duration = document.getElementById("courseDuration").value;

  if (!name || !email || !regId || !branch || !course || !date || !duration) {
    alert("Please fill in all course booking fields before printing.");
    return;
  }

  const content = `
    <h2>📘 Course Booking Confirmation</h2>
    <p>Thank you, <strong>${name}</strong>!</p>
    <p>You have successfully registered for the course <strong>${course}</strong>.</p>
    <p>Start Date: <strong>${date}</strong> | Duration: <strong>${duration}</strong></p>
    <p>Register ID: <strong>${regId}</strong> | Branch: <strong>${branch}</strong></p>
    <p>Email: <strong>${email}</strong></p>
  `;
  printContent(content);
}


// Print Exam Confirmation
function printExam() {
  const name = document.getElementById("examName").value;
  const email = document.getElementById("examEmail").value;
  const regId = document.getElementById("examRegId").value;
  const branch = document.getElementById("examBranch").value;
  const course = document.getElementById("examCourse").value;
  const date = document.getElementById("examDate").value;
  const time = document.getElementById("examTime").value;

  if (!name || !email || !regId || !branch || !course || !date || !time) {
    alert("Please fill in all exam booking fields before printing.");
    return;
  }

  const content = `
    <h2>📝 Exam Slot Confirmation</h2>
    <p>Thank you, <strong>${name}</strong>!</p>
    <p>Your exam for <strong>${course}</strong> is scheduled on <strong>${date}</strong> at <strong>${time}</strong>.</p>
    <p>Register ID: <strong>${regId}</strong> | Branch: <strong>${branch}</strong></p>
    <p>Email: <strong>${email}</strong></p>
  `;
  printContent(content);
}

// Print Schedule Confirmation
function printSchedule() {
  const name = document.getElementById("scheduleName").value;
  const email = document.getElementById("scheduleEmail").value;
  const regId = document.getElementById("scheduleRegId").value;
  const branch = document.getElementById("scheduleBranch").value;
  const days = document.getElementById("days").value;
  const timeSlot = document.getElementById("timeSlot").value;

  if (!name || !email || !regId || !branch || !days || !timeSlot) {
    alert("Please fill in all schedule fields before printing.");
    return;
  }

  const content = `
    <h2>📅 Class Schedule Confirmation</h2>
    <p>Thank you, <strong>${name}</strong>!</p>
    <p>You selected: <strong>${days}</strong> at <strong>${timeSlot}</strong></p>
    <p>Register ID: <strong>${regId}</strong> | Branch: <strong>${branch}</strong></p>
    <p>Email: <strong>${email}</strong></p>
  `;
  printContent(content);
}



// Shared function for printing
function printContent(html) {
  const win = window.open("", "Print", "width=700,height=500");
  win.document.write(`
    <html>
      <head>
        <title>Booking Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
          h2 { color: #0077b6; }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `);
  win.document.close();
  win.print();
}


function printText(text) {
  const win = window.open("", "Print", "width=600,height=400");
  win.document.write(`<p style="font-size:18px;">${text}</p>`);
  win.document.close();
  win.print();
}

function showConfirmation(msg) {
  const box = document.getElementById("confirmationBox");
  box.innerText = msg;
  box.style.display = "block";
  setTimeout(() => box.style.display = "none", 3000);
}


