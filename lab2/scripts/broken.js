document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('authForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value; // dohvati vrijednost poruke
        const password = document.getElementById('password').value; // dohvati vrijednost PIN-a
        const bruteForceProtection = document.getElementById('bruteForceProtection').checked; // dohvati vrijednost checkbox-a (0 ili 1)

        try {
            const response = await fetch('/broken-authentication/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, bruteForceProtection })
            });

            const result = await response.json();
            document.getElementById('loginResult').innerText = result.feedback;
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
