//wait for DOMconntentLoaded
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form") as HTMLFormElement;
  const errorMessage = document.getElementById("error-message") as HTMLDivElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;

  // Setup password toggle once on page load
  const togglePasswordButton = document.getElementById("toggle-password") as HTMLButtonElement;
  if (togglePasswordButton) {
    togglePasswordButton.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
      document.getElementById("eye-off")?.classList.toggle("hidden");
      document.getElementById("eye-on")?.classList.toggle("hidden");
    });
  }

  // Handle login form submission
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("email") as HTMLInputElement;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the token in localStorage or a cookie
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", data.name);
        // Show success message 
        alert(data.message);    
        // Redirect to dashboard or home page
        window.location.href = "index.html";
      } else {
        const errorData = await response.json();
        errorMessage.textContent = `Error: ${errorData.error}`;
        errorMessage.style.display = "block";
      }
    } catch (error) {
      console.error("Error during login:", error);
      errorMessage.textContent = "An error occurred during login. Please try again later.";
      errorMessage.style.display = "block";
    }
  });

});