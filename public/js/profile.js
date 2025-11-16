// Get token from localStorage
let token = localStorage.getItem("token");

// Debug: Check if token exists
console.log("Profile: Token check", token ? "Token found" : "No token found");

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

// Fetch logged-in user profile
async function loadProfile() {
    // Re-check token (in case it was cleared)
    token = localStorage.getItem("token");
    
    if (!token) {
        console.log("❌ No token in loadProfile, redirecting to login");
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
            console.error("❌ Profile load error:", data.error || "Unknown error");
            console.error("Response status:", res.status);
            // Clear invalid token
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "login.html";
            return;
        }

        const user = data.user;

        // Fill profile page
        document.getElementById("profileName").textContent = 
            `${user.firstName} ${user.lastName}`;
        
        document.getElementById("profileEmail").textContent = user.email;
        document.getElementById("profileEmailDetail").textContent = user.email;
        document.getElementById("profileFirstName").textContent = user.firstName;
        document.getElementById("profileLastName").textContent = user.lastName;
        document.getElementById("profileStudentId").textContent = user.studentId;
        document.getElementById("memberSince").textContent = 
            new Date(user.createdAt).toLocaleDateString();

        // Avatar initials
        const initials = `${user.firstName[0] || ""}${user.lastName[0] || ""}`.toUpperCase();
        document.getElementById("avatarInitials").textContent = initials;

        // Also update dashboard top greeting if loaded
        const userNameEl = document.getElementById("userName");
        if (userNameEl) {
            userNameEl.textContent = `${user.firstName} ${user.lastName}`;
        }

    } catch (err) {
        console.error("Profile page error:", err);
        window.location.href = "login.html";
    }
}

// Dummy button functions
function editProfile() {
    alert("Edit Profile feature coming soon.");
}

function changePassword() {
    alert("Change Password feature coming soon.");
}

loadProfile();
