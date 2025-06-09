const mysql = require("mysql2");
const config = require("../db/config");
const pool = mysql.createPool(config);

const getUsers = async (req, res, next) => {
  const sql_query = `SELECT * from users`;

  const data = new Promise((resolve, reject) => {
    pool.query(sql_query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

  try {
    const newData = await data;
    res.send(newData);
  } catch (err) {
    console.log("This is an", err);
    res.send(err);
  }
};

const addUsers = async (req, res, next) => {
  console.log(req.body, "<===this is request body data");
  const { id, first_name, last_name, email } = req.body;
  const sql_query = `INSERT INTO users VALUES (?,?,?,?)`;

  const data = new Promise((resolve, reject) => {
    pool.query(
      sql_query,
      [id, first_name, last_name, email],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      },
    );
  });

  try {
    const newData = await data;
    res.send("Your data inserted successfully!", newData);
  } catch (err) {
    console.log("This is an:", err);
    res.send(err);
  }
};

module.exports = {
  getUsers,
  addUsers,
};
