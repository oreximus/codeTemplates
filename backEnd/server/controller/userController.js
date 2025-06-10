const mysql = require("mysql2");
const config = require("../db/config");
const pool = mysql.createPool(config);
const jwt = require("jsonwebtoken");
const { bcryptHash } = require("../utils/common");
const { uuid } = require("uuidv4");

const token = jwt.sign(
  { name: "Siddhart", age: "24" },
  process.env.JWT_SECRET,
  {
    algorithm: "HS256",
  },
);

console.log(token, "<===this is signed Token");

const createUser = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  console.log(req.body, "<===USER DATA");

  // check if the user exists
  const ifUserExists = new Promise((resolve, reject) => {
    const query = `SELECT id from user WHERE email = ?`;
    pool.query(query, [email], (err, results) => {
      if (err) {
        reject(err);
      } else if (Array.isArray(results) && results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });

  console.log(ifUserExists, "<==USER DATA");

  // If user exists then register the user with the hashedPassword
  if (ifUserExists) {
    const insertUser = new Promise((resolve, reject) => {
      hashedPassword = bcryptHash({ password });
      id = uuid();
      const query = `INSERT INTO user (id, first_name, last_name, email, password, created_by) VALUES (?,?,?,?,?,?)`;
      pool.query(
        query,
        [id, first_name, last_name, email, hashedPassword, id],
        (err, results) => {
          if (err) {
            reject(err);
          } else if (Array.isArray(results) && results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        },
      );
    });

    // try to check insertion process
    try {
      await insertUser;
      res.send("User registered Successfully!");
    } catch (err) {
      console.log(err, "<==This is the error!");
      res.send("Your User creation error: ", err);
    }
  } else {
    res.send("User Exists Already");
  }
};

module.exports = createUser;
