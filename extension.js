// extension.js
const elements = document.querySelectorAll('*'); // Select all elements
const classList = new Set(); // Use a Set to ensure classes are unique

elements.forEach((el) => {
  el.classList.forEach((className) => classList.add(className)); // Add each class to the Set
});

console.log([...classList]); // Convert Set to Array and log unique classes
const menuContainer = document.getElementById('menu');
classList.forEach((className) => {
  const sliderContainer = document.createElement('div');
  sliderContainer.innerHTML = `
    <label>${className}</label>
    <input type="range" id="${className}-slider" min="0" max="100" value="50">
  `;
  menuContainer.appendChild(sliderContainer);

  const slider = sliderContainer.querySelector(`#${className}-slider`);
  slider.addEventListener('input', (event) => {
    const value = event.target.value;
    // Modify elements with the class based on slider value (example)
    document.querySelectorAll(`.${className}`).forEach((el) => {
      el.style.opacity = value / 100; // Example: Set element opacity
    });
    saveSliderValue(className, value);
  });
});
function saveSliderValue(className, value) {
    const date = new Date();
    date.setDate(date.getDate() + 5); // Set expiration to 5 days
    document.cookie = `${className}=${value};expires=${date.toUTCString()};path=/`;
  }
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) return value;
  }
  return null;
}

window.addEventListener('load', () => {
    classList.forEach((className) => {
      const savedValue = getCookie(className);
      if (savedValue) {
        document.querySelectorAll(`.${className}`).forEach((el) => {
          el.style.opacity = savedValue / 100; // Restore opacity
        });
        const slider = document.getElementById(`${className}-slider`);
        if (slider) slider.value = savedValue; // Restore slider value
      }
    });
  });
      