const express = require('express');
const os = require('os');

const PORT = 80;
const HOST = os.hostname();

const { Client } = require('pg')
const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_ENDPOINT,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// App
const app = express();
app.get('*', (req, res) => {
  res.send(
    `<body style='background-color:#283E5B'><h1 style='color: orange;text-align:center'>Hello AWS from ${HOST}</h1></body>`
  );
});
app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
