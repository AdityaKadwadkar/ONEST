// Get token from localStorage
let token = localStorage.getItem("token");

// Debug: Check if token exists
console.log("Dashboard: Token check", token ? "Token found" : "No token found");

// Redirect if no token
if (!token) {
    console.log("❌ No token found, redirecting to login");
    window.location.href = "login.html";
}

// Logout function used in navbar
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    }
}

// Load user profile from the backend
async function loadDashboard() {
    // Re-check token (in case it was cleared)
    token = localStorage.getItem("token");
    
    if (!token) {
        console.log("❌ No token in loadDashboard, redirecting to login");
        window.location.href = "login.html";
        return;
    }

    console.log("📡 Fetching profile from /profile/me");
    console.log("Token:", token.substring(0, 20) + "...");

    try {
        const res = await fetch("/profile/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        
        console.log("Profile API response:", { status: res.status, success: data.success });

        if (!res.ok || !data.success) {
            console.error("❌ Dashboard load error:", data.error || "Unknown error");
            console.error("Response status:", res.status);
            // Clear invalid token
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "login.html";
            return;
        }

        const user = data.user;

        // Fill dashboard page
        document.getElementById("userName").textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById("studentId").textContent = user.studentId;
        document.getElementById("userEmail").textContent = user.email;

    } catch (error) {
        console.error("Dashboard error:", error);
        window.location.href = "login.html";
    }
}

// Load profile on startup
document.addEventListener("DOMContentLoaded", loadDashboard);
