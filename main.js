// Variables
let display = document.getElementById("display");
let isResult = false;
let dataPro = [];
let history = document.getElementById("history");
let eff = document.getElementById("eff");

// Append value
function appendValue(value) {
  if (isResult) {
    display.value = "";
    isResult = false;
  }
  let lastChar = display.value.slice(-1);
  // منع تكرار العمليات
  if (["+", "-", "*", "/"].includes(value) && ["+", "-", "*", "/"].includes(lastChar)) {
    return;
  }
  display.value += value;
}

// Clear all
function clearDisplay() {
  display.value = "";
  isResult = false;
}

// Clear one character
function clearOne() {
  display.value = display.value.slice(0, -1);
}

// Calculate
function calculateResult() {
  try {
    let expression = display.value;
    let result = eval(expression);
    display.value = result;

    let operation = `${expression} = ${result}`;
    dataPro.push(operation);
    localStorage.setItem("operation", JSON.stringify(dataPro));

    isResult = true;
    showData();
  } catch (error) {
    display.value = "Error";
    isResult = true;
  }
}

// Show history
function showData() {
  history.innerHTML = "";
  if (dataPro.length === 0) {
    history.innerHTML = '<p style="color:red">No Data Yet</p>';
    return;
  }
  dataPro.forEach((item, i) => {
    let li = document.createElement("li");
    li.innerHTML = `${i + 1} ➡ ${item}`;
    history.appendChild(li);
  });
}

// Clear history
function clearHistory() {
  localStorage.removeItem("operation");
  dataPro = [];
  showData();
}

// Dark mode
function darkMode() {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    eff.innerHTML=`🌙LIGHT-MODE`
  } else {
    localStorage.setItem("theme", "light");
    eff.innerHTML=`DARK-MODE`
  }
}

// On load
window.onload = function () {
  // استرجاع العمليات
  if (localStorage.operation != null) {
    dataPro = JSON.parse(localStorage.operation);
  }
  showData();

  // استرجاع الثيم
  let savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
};

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || ["+", "-", "*", "/", "."].includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === "Enter") {
    e.preventDefault();
    calculateResult();
  } else if (e.key === "Backspace") {
    clearOne();
  } else if (e.key === "Escape") {
    clearDisplay();
  }
});
