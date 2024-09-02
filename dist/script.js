// Handle signup
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const signupErrorMessage = document.getElementById('signup-error-message');

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            signupErrorMessage.textContent = data.error;
        } else {
            alert(data.message);
            window.location.href = 'login.html';
        }
    });
});

// Handle login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            errorMessage.textContent = data.error;
        } else {
            alert(data.message);
            window.location.href = 'index.html';
        }
    });
});

document.getElementById('signupPassword').addEventListener('input', function() {
    const password = this.value;
    const strengthText = document.getElementById('password-strength');
    let strength = '';

    if (password.length > 8) {
        strength = 'Weak';
        if (/[A-Z]/.test(password)) strength = 'Medium';
        if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength = 'Strong';
    }

    strengthText.textContent = `Password Strength: ${strength}`;
});
