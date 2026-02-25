// API Base URL
const API_URL = '/api/auth';

// Toast Notification System
function showToast(title, message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastTitle = toast.querySelector('.toast-title');
    const toastMessage = toast.querySelector('.toast-message');

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Form Navigation
function showLogin(e) {
    if (e) e.preventDefault();
    hideAllForms();
    document.getElementById('loginForm').classList.add('active');
}

function showRegister(e) {
    if (e) e.preventDefault();
    hideAllForms();
    document.getElementById('registerForm').classList.add('active');
}

function showForgotPassword(e) {
    if (e) e.preventDefault();
    hideAllForms();
    document.getElementById('forgotPasswordForm').classList.add('active');
}

function showResetPassword(e) {
    if (e) e.preventDefault();
    hideAllForms();
    document.getElementById('resetPasswordForm').classList.add('active');
}

function showDashboard() {
    hideAllForms();
    document.getElementById('dashboard').classList.add('active');
}

function hideAllForms() {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => form.classList.remove('active'));
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showToast('Logged Out', 'You have been successfully logged out', 'success');
    setTimeout(() => {
        showLogin();
    }, 1000);
}

// Check if user is already logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
        const userData = JSON.parse(user);
        displayDashboard(userData, token);
    }
}

// Display Dashboard
function displayDashboard(user, token) {
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    showDashboard();
}

// Register Form Handler
document.getElementById('registerFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const btn = e.target.querySelector('.btn');
    btn.classList.add('loading');

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            showToast('Success!', 'Account created successfully. Please login.', 'success');
            setTimeout(() => {
                showLogin();
                document.getElementById('loginEmail').value = email;
            }, 1500);
        } else {
            showToast('Registration Failed', data.message || 'Something went wrong', 'error');
        }
    } catch (error) {
        showToast('Error', 'Network error. Please try again.', 'error');
    } finally {
        btn.classList.remove('loading');
    }
});

// Login Form Handler
document.getElementById('loginFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const btn = e.target.querySelector('.btn');
    btn.classList.add('loading');

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            showToast('Welcome Back!', `Successfully logged in as ${data.user.name}`, 'success');

            setTimeout(() => {
                displayDashboard(data.user, data.token);
            }, 1000);
        } else {
            showToast('Login Failed', data.message || 'Invalid credentials', 'error');
        }
    } catch (error) {
        showToast('Error', 'Network error. Please try again.', 'error');
    } finally {
        btn.classList.remove('loading');
    }
});

// Forgot Password Form Handler
document.getElementById('forgotPasswordFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('forgotEmail').value;

    const btn = e.target.querySelector('.btn');
    btn.classList.add('loading');

    try {
        const response = await fetch(`${API_URL}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            showToast('Verification Successful', 'Request approved. Proceeding to set your new password.', 'success');

            // Store the token temporarily for easy access
            sessionStorage.setItem('resetToken', data.resetToken);

            setTimeout(() => {
                showResetPassword();
                document.getElementById('resetToken').value = data.resetToken;
            }, 2000);
        } else {
            showToast('Request Failed', data.message || 'User not found', 'error');
        }
    } catch (error) {
        showToast('Error', 'Network error. Please try again.', 'error');
    } finally {
        btn.classList.remove('loading');
    }
});

// Reset Password Form Handler
document.getElementById('resetPasswordFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = document.getElementById('resetToken').value;
    const password = document.getElementById('newPassword').value;

    const btn = e.target.querySelector('.btn');
    btn.classList.add('loading');

    try {
        const response = await fetch(`${API_URL}/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });

        const data = await response.json();

        if (response.ok) {
            showToast('Password Reset!', 'Your password has been successfully reset.', 'success');
            sessionStorage.removeItem('resetToken');

            setTimeout(() => {
                showLogin();
            }, 2000);
        } else {
            showToast('Reset Failed', data.message || 'Invalid or expired token', 'error');
        }
    } catch (error) {
        showToast('Error', 'Network error. Please try again.', 'error');
    } finally {
        btn.classList.remove('loading');
    }
});

// Initialize
function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    const eyeSlash = btn.querySelector('.eye-slash');

    if (input.type === 'password') {
        input.type = 'text';
        eyeSlash.style.display = 'none';
    } else {
        input.type = 'password';
        eyeSlash.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add input focus animations
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});
