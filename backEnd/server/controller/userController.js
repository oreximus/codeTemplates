const mysql = require("mysql2");
const config = require("../db/config");
const pool = mysql.createPool(config);
const { bcryptHash } = require("../utils/common");
const { uuid } = require("uuidv4");
const { genToken } = require("../helper/jwt_token");

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

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body, "<---this Request Data");

  // check if the user exists
  const ifUserExists = new Promise((resolve, reject) => {
    const query = `SELECT 
                   id,
                   access_token,
                   first_name,
                   last_name,
                   email,
                   password,
                   role
                   from user WHERE email = ?`;
    console.log(email, "<===this is email");
    pool.query(query, [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

  const userData = ifUserExists
    .then((resp) => {
      console.log(resp, "<===THIS IS USER Data");
      return resp;
    })
    .catch((err) => {
      console.log(err, "<===THIS IS USER ERROR");
      res.send("testing user login error");
    });

  // If user exists then register the user with the hashedPassword
  if (ifUserExists) {
    const payload = {
      user_id: userData.id,
      email: userData.email,
      role: userData.role,
    };

    var access_token = genToken(payload);

    const insertUser = new Promise((resolve, reject) => {
      const query = `UPDATE user
                     SET access_token = ?
                     WHERE email = ?;`;
      pool.query(query, [access_token, email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    // try to check insertion process
    try {
      await insertUser;
      res.status(200).json({
        status: 200,
        access_token: access_token,
      });
    } catch (err) {
      console.log(err, "<==This is the error!");
      res.send("Your User creation error: ", err);
    }
  } else {
    res.send("User Not Exists");
  }
};

module.exports = {
  createUser,
  userLogin,
};
