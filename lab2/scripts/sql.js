document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkForm');

    if (form) { // ako je forma ispunjena
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value; // dohvati sadržaj poruke
            const password = document.getElementById('password').value; // dohvati sadržaj PIN-a
            const vulnerabilityEnabled = document.getElementById('vulnerability').checked; // dohvati vrijednost checkbox-a (0 ili 1)

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password, vulnerability: vulnerabilityEnabled })
                });

                const result = await response.json();
                const resultContainer = document.getElementById('sqlResult');
                resultContainer.innerHTML = `<p>${result.feedback}</p><p>${result.queryLog}</p>`;

                if (result.data) {
                    resultContainer.innerHTML += result.data.map(user => `<p>${user.username}: ${user.password}</p>`).join('');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    } else {
        console.error("Form with ID 'checkForm' not found.");
    }
});
