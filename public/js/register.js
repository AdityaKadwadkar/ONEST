document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("message");
    message.style.color = "red";
    message.textContent = "";

    // validations
    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        return;
    }

    try {
        const res = await fetch("/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                studentId: studentId
            }),
        });

        const data = await res.json();
        
        console.log("Register response:", { status: res.status, success: data.success, hasToken: !!data.token });

        if (res.ok && data.success) {
            // If token is provided, store it and redirect to dashboard
            if (data.token) {
                // Store token and user data in localStorage
                localStorage.setItem("token", data.token);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                }
                
                // Verify storage
                const storedToken = localStorage.getItem("token");
                console.log("✅ Token stored:", storedToken ? "YES" : "NO");
                console.log("Token length:", storedToken ? storedToken.length : 0);
                console.log("Token preview:", storedToken ? storedToken.substring(0, 30) + "..." : "null");
                
                message.style.color = "green";
                message.textContent = "Registration successful! Redirecting...";
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1000);
            } else {
                // Otherwise redirect to login
                console.warn("⚠️ No token in registration response");
                message.style.color = "green";
                message.textContent = "Registration successful! Redirecting to login...";
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1000);
            }
        } else {
            console.error("Registration failed:", data.error);
            message.textContent = data.error || "Registration failed.";
        }
    } catch (err) {
        console.error(err);
        message.textContent = "Network error.";
    }
});
