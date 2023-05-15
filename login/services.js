import mysql from "mysql2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

//console.log("secret is", process.env.ACCESS_TOKEN_SECRET);

const connection = mysql.createConnection({
    host: "127.0.0.1",
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
    login: function (credentials) {
      let newCredentials = this.decodeCredentials(credentials);     
      const userCredentials = [newCredentials.login];
      return new Promise((resolve, reject) => {
        connection.query(
          "SELECT COUNT(*) as nbComptes, userID FROM users WHERE users.email = ?",
          userCredentials,
          (err, results) => {
            if (err) {
              reject(err);
              return;
            }
            console.log('nbComptes : '+ results[0].nbComptes)
            if (Number(results[0].nbComptes) === 1) {
              const req = connection.query(
                "SELECT password FROM users WHERE userID = ?",
                [results[0].userID],
                (err1, results1) => {
                  console.log(bcrypt.compareSync(newCredentials.password, results1[0].password))
                  if (err1) {
                    reject(err1);
                    return;
                  }
                  else if (bcrypt.compareSync(newCredentials.password, results1[0].password)) {
                    resolve(this.createJWT(results[0].userID));
                  }
                  else {
                    resolve('Incorrect');
                  }
                }
              );
            }
            else {
              reject('Incorrect credentials')
            }
          }
        );
      });
    },
  //   /**
  //  *
  //  * @param {Object} credentials
  //  * @returns {Promise} status
  //  */
  // signup: function (credentials) {
  //   console.log(credentials);
  //   return new Promise((resolve, reject) => {

  //         // Vérifier si l'adresse email existe déjà dans la base de données
  //     connection.query("SELECT COUNT(*) AS email_count FROM `users` WHERE `email` = ?", [credentials.email, credentials.password], (err, rows) => {
  //       if (err) {
  //         reject(err);
  //         return;
  //       }
  //       const email_count = rows[0].email_count;


  //       // Si l'adresse email ou le pseudo existe déjà, renvoyer une erreur
  //       if (email_count > 0) {
  //         reject(new Error("Email déjà enregistré"));
  //         return;
  //       }
  //       this.hashPassword(credentials.password)
  //       .then(pwd => {
  //         const userCredentials = [credentials.name, credentials.firstname, credentials.email, credentials.phoneNumber, credentials.pictures, pwd];
  
  //         connection.query("INSERT INTO `users`(`Nom`, `Prenom`, `Email`, `Telephone`, `Image`, `MotDePasse`) VALUES (?,?,?,?,?,?)", userCredentials, (err) => {
  //           if(err) {
  //             reject(err);
  //             return;
  //           }
  //           connection.query("SELECT MAX(userID) as id FROM users", (err, result) => {
  //             if(err) {
  //               reject(err);
  //               return;
  //             }
  //             resolve(this.createJWT(result[0].id));
  //           })
  //         });
  //       })
  //     });
  //   });
  // },

  // addJobOffer: function(jobOffer) {
  //   return new Promise((resolve, reject) => {
  //       const sqlAddJobOffer = "INSERT INTO jobOffers(jobTitle, city, department, jobType, contractType, contractLength, salary, tempSalary, description, favorite, company, email ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
  //       connection.query(sqlAddJobOffer, [jobOffer.jobTitle, jobOffer.city, jobOffer.department, jobOffer.jobType, jobOffer.contractType, jobOffer.contractLength, jobOffer.salary, jobOffer.tempSalary, jobOffer.description, jobOffer.favorite, jobOffer.company, jobOffer.email], (error, results) => {
  //           if (error) {
  //               console.error(error);
  //               reject(error);
  //           } else {
  //               resolve({ status: 200, data: results.city });
  //           }
  //       });
  //   });

  test: function(formUser) {
    return new Promise((resolve, reject) => {
      const sqlAddUser = "INSERT INTO users (password, email, name, firstName, phoneNumber, pictures, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const sqlAddStudent = "INSERT INTO students (userID, jobType, contractType, contractLength, yearSchool, nameSchool, description, favorite) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?, ?, NULL)";
  
      connection.query(sqlAddUser, [formUser.password, formUser.email, formUser.name, formUser.firstName, formUser.pictures, formUser.phoneNumber, formUser.userStatus], (error, userResults) => {
        if (error) {
          console.error(error);
          reject(error);
          return;
        }
  
        const userID = userResults.insertId;
  
        connection.query(sqlAddStudent, [userID, formUser.jobType, formUser.contractType, formUser.contractLength, formUser.yearSchool, formUser.nameSchool, formUser.description, formUser.favorite ], (error, studentResults) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            resolve({ status: 200, data: studentResults });
          }
        });
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

