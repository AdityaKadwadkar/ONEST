// Authentication utility functions

// Check if user is authenticated
function isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
}

// Get stored token
function getToken() {
    return localStorage.getItem("token");
}

// Get stored user data
function getUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (e) {
            return null;
        }
    }
    return null;
}

// Store authentication data
function storeAuth(token, user) {
    if (token) {
        localStorage.setItem("token", token);
        console.log("✅ Token stored in localStorage");
    }
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        console.log("✅ User data stored in localStorage");
    }
}

// Clear authentication data
function clearAuth() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("✅ Auth data cleared from localStorage");
}

// Debug: Show current auth status
function debugAuth() {
    const token = getToken();
    const user = getUser();
    console.log("=== Auth Debug ===");
    console.log("Token exists:", !!token);
    console.log("Token (first 20 chars):", token ? token.substring(0, 20) + "..." : "null");
    console.log("User data:", user);
    console.log("==================");
    return { token: !!token, user };
}

