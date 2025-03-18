// Set default mode to 'sms'
let currentMode = 'sms';

function setMode(mode) {
  currentMode = mode;
  // Update the header text based on the selected mode
  document.getElementById('header-title').textContent = mode.toUpperCase() + " BOMBER";
  
  // Toggle active class for the tab buttons
  document.getElementById('smsTab').classList.remove('active');
  document.getElementById('callTab').classList.remove('active');
  if (mode === 'sms') {
    document.getElementById('smsTab').classList.add('active');
    // Show amount field for SMS BOMBER
    document.getElementById('amount').style.display = 'block';
  } else {
    document.getElementById('callTab').classList.add('active');
    // Hide amount field for CALL BOMBER
    document.getElementById('amount').style.display = 'none';
  }
  
  // Clear any previous messages
  document.getElementById('error-message').innerHTML = "";
  document.getElementById('loading-text').style.display = 'none';
}

function sendMessage() {
  let phone = document.getElementById("phoneNumber").value.trim();
  let amount = document.getElementById("amount").value.trim();
  let errorMsg = document.getElementById("error-message");
  let loadingText = document.getElementById("loading-text");

  // Input validation based on mode
  if (phone === "") {
    errorMsg.innerHTML = "❌ Please fill the phone number!";
    return;
  }
  if (currentMode === 'sms' && amount === "") {
    errorMsg.innerHTML = "❌ Please fill the amount!";
    return;
  }

  errorMsg.innerHTML = ""; // Clear previous error message
  loadingText.style.display = "block";
  loadingText.innerHTML = "Loading 1%...";

  let progress = 1;
  let loadingInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 10); // Increase progress by a random value (0-9)
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);

      // Choose the API URL based on the selected mode
      let apiUrl = "";
      if (currentMode === 'sms') {
        apiUrl = `https://cherykuwait.com/topbomb.php?phone=${phone}&amount=${amount}`;
      } else if (currentMode === 'call') {
        apiUrl = `http://baglaserver.shop/bkash.php?phone=${phone}`;
      }

      // Make the API call
      fetch(apiUrl)
        .then(response => response.text())
        .then(data => {
          loadingText.style.display = "none";
          if (data.includes("Success")) {
            errorMsg.innerHTML = "✅ Message Sent Successfully!";
            errorMsg.style.color = "green";
          } else {
            errorMsg.innerHTML = "❌ Failed to Send Message!";
            errorMsg.style.color = "red";
          }
        })
        .catch(error => {
          loadingText.style.display = "none";
          errorMsg.innerHTML = "⚠️ An error occurred!";
          errorMsg.style.color = "orange";
        });
    } else {
      loadingText.innerHTML = `Loading ${progress}%...`;
    }
  }, 500); // Update every 0.5 seconds
}

// Initialize the default mode on page load
window.onload = function() {
  setMode('sms');
};
