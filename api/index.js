const fs = require('fs');

export default function handler(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';

    // Log only real users
    if (!userAgent.includes('Googlebot')) {
        fs.appendFileSync('log.txt', `Opened by IP: ${ip} at ${new Date().toISOString()}\n`);
    }

    res.setHeader('Content-Type', 'text/html');
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
}
