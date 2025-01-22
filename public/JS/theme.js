const themeToggleButton = document.getElementById("theme-toggle");
const body = document.body;
const slider = document.getElementById("slider");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

// Check localStorage for the saved theme preference
const savedTheme = localStorage.getItem("theme");

// If a saved theme exists, apply it
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
} else {
  // Default to light mode
  body.setAttribute("data-theme", "light");
}

// Update the button icon and position based on the current theme
function updateButtonState() {
  if (body.getAttribute("data-theme") === "dark") {
    slider.style.transform = "translateX(30px)";
    sunIcon.style.opacity = "0";
    moonIcon.style.opacity = "1";
  } else {
    slider.style.transform = "translateX(0px)";
    sunIcon.style.opacity = "1";
    moonIcon.style.opacity = "0";
  }
}

// Add an event listener to the button
themeToggleButton.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  if (currentTheme === "light") {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
  updateButtonState(); // Update slider position and icons
});

// Initial state update
updateButtonState();
