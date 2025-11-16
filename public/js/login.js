document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const message = document.getElementById("message");
    message.style.color = "red";
    message.textContent = "";

    try {
        const res = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        
        console.log("Login response:", { status: res.status, success: data.success, hasToken: !!data.token });

        if (res.ok && data.success && data.token) {
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
            message.textContent = "Login successful! Redirecting...";

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 800);

        } else {
            console.error("Login failed:", data.error);
            message.textContent = data.error || "Invalid credentials.";
        }
    } catch (err) {
        console.error("Login error:", err);
        message.textContent = "Network error.";
    }
});
