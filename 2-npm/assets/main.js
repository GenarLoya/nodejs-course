// Basic counter example using html selectors
let count = 0;
const countDisplay = document.getElementById("counter");
const incrementBtn = document.getElementById("increment-btn");
const decrementBtn = document.getElementById("decrement-btn");

function updateDisplay() {
  countDisplay.textContent = count;
}

incrementBtn.addEventListener("click", () => {
  count++;
  updateDisplay();
});

decrementBtn.addEventListener("click", () => {
  count--;
  updateDisplay();
});

// Initialize display
updateDisplay();
