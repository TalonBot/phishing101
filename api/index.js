let visitors = {}; // object to track IP addresses
let uniqueCount = 0; // how many unique IPs visited

export default function handler(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (!visitors[ip]) {
        // New unique visitor
        visitors[ip] = {
            firstVisit: new Date().toISOString(),
            visitCount: 1
        };
        uniqueCount++;
        console.log(`🆕 New visitor: ${ip} (Total unique: ${uniqueCount})`);
    } else {
        // Known visitor
        visitors[ip].visitCount++;
        console.log(`🔁 Returning visitor: ${ip} (Visits: ${visitors[ip].visitCount})`);
    }

    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <html>
      <head><title>Login</title></head>
      <body>
          <h1>Login to view the document</h1>
          <p>Total unique visitors: ${uniqueCount}</p>
          <form action="/api/submit" method="POST">
              <input type="text" name="username" placeholder="Username" required/><br/>
              <input type="password" name="password" placeholder="Password" required/><br/>
              <button type="submit">Login</button>
          </form>
      </body>
      </html>
    `);
}
