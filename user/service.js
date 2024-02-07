import mysql from "mysql2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

//console.log("secret is", process.env.ACCESS_TOKEN_SECRET);

const connection = mysql.createConnection({
  host: "j-stalk-bdd",
  user: "root",
  password: "",
  database: "j-stalk-api",
});

const services = {
  /**
   *
   * @param {Object} credentials
   * @returns {Promise} jwt
   */

  
  verifEmail: function (credentials) {
    return new Promise((resolve, reject) => {
  
      // Vérifier si l'adresse email existe déjà dans la base de données
    connection.query("SELECT COUNT(*) AS email_count FROM `users` WHERE `email` = ?", [credentials], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const email_count = rows[0].email_count;
  
    // Si l'adresse email  existe , renvoyer resolve sinon une erreur
    if (email_count > 0) {
      resolve("Email existe")
      return;
    }else {
      reject(new Error("L'email n'exsite pas"));
      return;
    }
  
  });
  });
  },


  putPasswordById: function (Password , email ) {
    // modifier les infos de l'user connecté, en donnant l'id en param

    return new Promise((resolve, reject) => {
      this.hashPassword(Password)
            .then(Password => {
              const sqlPutUser = "UPDATE users SET password = ? WHERE users.email = ?";

            connection.query(
              sqlPutUser,
              [Password, email],
              (errorQueryPutUser, resultQueryPutUser) => {
                if (errorQueryPutUser) {
                  console.error("est une erreur : " + errorQueryPutUser);
                  reject(errorQueryPutUser);
                  return;
                }
                //arrayReturn.push(resultQueryGetUser);
                //arrayReturn = resultQueryPutUser
                console.log(resultQueryPutUser)
                resolve({ status: 200});
              });

            })

          }
        )},

        getUserByIdInfos: function (UserId) {
            // return les infos de l'user connecté, en donnant l'id en param
            //tableaudeReturn
            return new Promise((resolve, reject) => {
              let arrayReturn = "";
              // get info from user selected
              const sqlGetUser = "SELECT * FROM users INNER JOIN students ON users.userID = students.userId WHERE users.userID = ?";
              connection.query(
                sqlGetUser,
                [UserId],
                (errorQueryGetUser, resultQueryGetUser) => {
                  if (errorQueryGetUser) {
                    console.error(errorQueryGetUser);
                    reject(errorQueryGetUser);
                    return;
                  }
                  //console.log(resultQueryGetUser);
                  //arrayReturn.push(resultQueryGetUser);
                  arrayReturn = resultQueryGetUser
                  console.log(arrayReturn);
                  resolve({ status: 200, data: arrayReturn});
                });
        
            });
        },


        getUserByIdType: function (UserId) {
          // return les infos de l'user connecté, en donnant l'id en param
          //tableaudeReturn
          return new Promise((resolve, reject) => {
            let arrayReturn = "";
            // get info from user selected
            const sqlGetUser = "SELECT status FROM users  WHERE userID = ?";
            connection.query(
              sqlGetUser,
              [UserId],
              (errorQueryGetUser, resultQueryGetUser) => {
                if (errorQueryGetUser) {
                  console.error(errorQueryGetUser);
                  reject(errorQueryGetUser);
                  return;
                }
                //console.log(resultQueryGetUser);
                //arrayReturn.push(resultQueryGetUser);
                arrayReturn = resultQueryGetUser
                console.log(arrayReturn);
                resolve({ status: 200, data: arrayReturn});
              });
      
          });
      },

        getUserById: function (UserId) {
            // return les infos de l'user connecté, en donnant l'id en param
            //tableaudeReturn
            return new Promise((resolve, reject) => {
              let arrayReturn = "";
              // get info from user selected
              const sqlGetUser = "SELECT * FROM users WHERE userID = ?";
              connection.query(
                sqlGetUser,
                [UserId],
                (errorQueryGetUser, resultQueryGetUser) => {
                  if (errorQueryGetUser) {
                    console.error(errorQueryGetUser);
                    reject(errorQueryGetUser);
                    return;
                  }
                  //console.log(resultQueryGetUser);
                  //arrayReturn.push(resultQueryGetUser);
                  arrayReturn = resultQueryGetUser
                  resolve({ status: 200, data: arrayReturn});
                });
        
            });
          },

          decodeCredentials: function (base64string) {
            console.log(base64string);
            let buffer = Buffer(base64string, "base64");
            let decoded = buffer.toString();
        
            // console.log('"' + base64string + '" converted from Base64 to ASCII is "' + decoded + '"');
        
            let [email, password] = decoded.split(":");
            // console.log([username, password]);
        
            return {
              login: email,
              password: password,
            };
          },
        
          decodeJwt: (token) => {
            return jwt.verify(token, "j-stak");
          },
        
          createJWT: function (id) {
            const expiresIn = 86400;
            return jwt.sign({ id }, "j-stak", { expiresIn });
          },
        
          /**
           *
           * @param {String} password
           * @returns {String} hashed password
           */
          hashPassword: async function (password) {
            return await bcrypt.hash(password, 10);
          },
        
        
        
          /**
           *
           * @param {String} header
           * @param {String} auhtZType Basic | Bearer
           * @returns {Array[int,String]} [status, message]
           */
          checkAuthZHeader: function (header, auhtZType) {
            if (header == null || typeof header !== "string") {
              return [400, "En-tête AuthZ manquante"];
            }
            let authType = header.split(" ")[0];
            if (authType != auhtZType) {
              return [400, `Utilisez l'AuthZ '${auhtZType}'`];
            }
            return [200, "En-Têtes Valides"];
          },


};

export default services;

