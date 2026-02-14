const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get email and password values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Display loading or disable button (optional)
    const loginButton = document.getElementById("loginButton");
    loginButton.innerText = "Logging in...";
    loginButton.disabled = true;

    try {
        // Send a POST request to the backend
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        // Handle the response
        if (response.ok) {
            const data = await response.json();
            alert("Login successful! Welcome " + data.user.name);
            // Redirect to another page
            window.location.href = "/dashboard";
        } else {
            const error = await response.json();
            alert("Login failed: " + error.message);
        }
    } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong. Please try again later.");
    } finally {
        // Reset button text and state
        loginButton.innerText = "Login";
        loginButton.disabled = false;
    }
});
