const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));


dotenv.config();
// povezivanje s bazom podataka
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

// home page  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// preusmjere -> SQL Injection 
app.get('/sql-injection', (req, res) => {
    res.sendFile(path.join(__dirname, 'sql_injection.html'));
});

// preusmjerenje -> Broken Authentication
app.get('/broken-auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'broken.html'))
})

app.post('/login', async (req, res) => {
    const { username: username, password: password, vulnerability } = req.body;

    // Logika za SQL Injection
    if(vulnerability) {
        query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
        params = []; // Vrijednosti stupaca username i password su dodani DIREKTNO u upit ()
    } else {
        query = "SELECT * FROM users WHERE username = $1 AND password = $2";
        params = [username, password]; // Parametrizirai upit, izbjegavanje SQL Injection-a
    }
    
    try {
        const result = await pool.query(query, params);
        let feedback;
        let data = null;

        if(result.rows.length > 0) {
            if(vulnerability) {
                feedback = "NAPAD! SQL Injection (Ranjivost uključena)";
                data = result.rows; 
            } else {
                feedback = "Zaštićen pristup podacima (Ranjivost isključena)";
                data = result.rows; 
            }
        } else {
            if(vulnerability) {
                feedback = "Netočna poruka ili netočan PIN! (Ranjivost uključena)";
            } else {
                feedback = "Netočna poruka ili netočan PIN! (Ranjivost isključena)";
            }
        }
        res.json({feedback, queryLog: query, data});
    } catch(err) {
        console.error("Database error:", err);
        res.json({feedback: "Error occurred during query execution"});
    }
});

const failedAttempts = {};

app.post('/broken-authentication/login', async (req, res) => {
    const {username, password, bruteForceProtection} = req.body;
    const currentTime = Date.now();

    if(!failedAttempts[username]) {
        failedAttempts[username] = {count: 0, lockoutEnd: null};
    }

    const userAttempts = failedAttempts[username];

    if(!bruteForceProtection && userAttempts.lockoutEnd && currentTime < userAttempts.lockoutEnd) {
        const remainingTime = Math.ceil((userAttempts.lockoutEnd - currentTime) / 1000);
        return res.json({feedback: `Prijavljivanje onemogućeno. Pokušajte ponovno za ${remainingTime}s.`});
    }

    try {
        const result = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password]);

        if(result.rows.length > 0) { // Upit daje rezultat, korisnik je uspješno prijavljen
            userAttempts.count = 0;
            userAttempts.lockoutEnd = null;
            res.json({ feedback: "Uspješno prijavljeni." });
        } else { // Neuspješno prijavljivanje korisnika
            userAttempts.count += 1; // brojač pogrešnih unosa se povećava za jedan

            if(!bruteForceProtection && userAttempts.count >= 3) { // Zabraniti pokušaj prijavljivanja nakon 3 pokušaja na 5 minuta
                userAttempts.lockoutEnd = currentTime + 300000; //brojač ide na 5 minuta
                userAttempts.count = 0; //brojač pogrešnih unosa za određenog korisnika se vraća na 0
                res.json({feedback: "Prijavljivanje ovog računa je zaključano zbog 3 uzastopna pogrešna unosa. Pokušajte za 5 minuta."});
            } else {
                res.json({feedback: "Netočna poruka ili PIN."});
            }
        }
    } catch(error) {
        console.error('Database error:', error);
        res.status(500).json({ feedback: "Database error. Please try again later." });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});