const express = require("express");
const app = express();

const { pool } = require("./db");

const cors = require("cors");
app.use(cors());

app.use(express.json({ extended: false }));
 
app.get("/serversendhello", (req, res) => {
  res.json({myMessage: "Server says hello"});
})

app.get("/servercreatetable", async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      CREATE TABLE IF NOT EXISTS mycities (
        id SERIAL PRIMARY KEY,
        city TEXT
      )
    `);
    client.release();
    res.status(200).json({myMessage: "The 'mycities' table created" });
  } catch (error) {
    console.log(error.message);
    res.status(409).json({myMessage: "Table creation failed"});
  } 
});

app.post("/serversavecity", async (req, res) => {
  const { goodcity } = req.body;
  try {
    const client = await pool.connect();
    await client.query(
      `INSERT INTO mycities (city) VALUES ($1) RETURNING *`, [goodcity]
    );
    client.release();
    res.status(201).json({myMessage: "City saved successfully"});
  } catch (error) {
    res.status(500).json({myMessage: "Failure to save city to database"});
  }
});

app.get("/servergetcities", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM mycities`
    );
    const dbcities = result.rows;
    client.release();
    res.status(200).json(dbcities);
  } catch (error) {
    console.log(error.message);
    res.status(500);
  } 
});


app.post("/serverupdatecity", async (req, res) => {
  const { goodcity, targetId2 } = req.body;
  try {
    const client = await pool.connect();
    await client.query(
      `UPDATE mycities SET city=$1 WHERE id=$2`, [goodcity, targetId2]
    );
    client.release();
    res.status(201).json({myMessage: "City updated successfully"});
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
});

app.post("/serverdeletecity", async (req, res) => {
  const { targetId2 } = req.body;
  try {
    const client = await pool.connect();
    await client.query(
      `DELETE FROM mycities WHERE id=$1`, [targetId2]
    );
    client.release();
    res.status(201).json({myMessage: "City deleted successfully"});
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});