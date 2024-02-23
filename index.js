const express = require('express');
const os = require('os');
require('dotenv').config();

const PORT = 3000;
const HOST = os.hostname();

// const { Client, Pool } = require('pg')
// const credentials = {
//   user: process.env.DB_USERNAME,
//   host: process.env.DB_ENDPOINT,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
// };

// Connect with a connection pool.

// async function poolDemo() {
//   const pool = new Pool(credentials);
//   const now = await pool.query("SELECT NOW()");
//   await pool.end();

//   return now;
// }

// Connect with a client.

// async function clientDemo() {
//   const client = new Client(credentials);
//   await client.connect();
//   const now = await client.query("SELECT NOW()");
//   await client.end();

//   return now;
// }

// App
const app = express();
app.get('*', async (req, res) => {
  try {
    // const poolResult = await poolDemo();
    // const poolQuery = "Time with pool: " + poolResult.rows[0]["now"];
  
    // const clientResult = await clientDemo();
    // const clientQuery = "Time with client: " + clientResult.rows[0]["now"];

    // console.log(poolQuery);
    // console.log(clientQuery);

    res.send(
      `<body style='background-color:#283E5B'>
        <h1 style='color: orange;text-align:center'>Hello AWS from ${HOST}</h1>
        <h1 style='color: orange;text-align:center'>poolQuery</h1>
        <h1 style='color: orange;text-align:center'>clientQuery</h1>
      </body>`
    );
  } catch (error) {
    console.log(error);   
  }
});
app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
