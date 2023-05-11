const express = require('express');
const os = require('os');
require('dotenv').config();

const PORT = 80;
const HOST = os.hostname();

const { Client } = require('pg')
console.log({
  user: process.env.DB_USERNAME,
  host: process.env.DB_ENDPOINT,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  connectionTimeoutMillis: 1000,
  query_timeout: 1000,
})
const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_ENDPOINT,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  connectionTimeoutMillis: 1000,
  query_timeout: 1000,
})
client.connect(function(err) {
  if (err) console.log(err);
  console.log("Connected!");
});

// App
const app = express();
app.get('*', (req, res) => {
  client.query("select * from information_schema.tables", (error, results) => {
    if (error) {
      res.send(
        `<body style='background-color:#283E5B'><h1 style='color: orange;text-align:center'>Error: ${JSON.stringify(error)}</h1></body>`
      );
    }
    res.send(
      `<body style='background-color:#283E5B'><h1 style='color: orange;text-align:center'>Hello AWS from ${HOST} - ${JSON.stringify(results)}</h1></body>`
    );
  })
});
app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
