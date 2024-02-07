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

  addUserDocs: function (userId, docDetails) { //garageDetails, userId
    //post garage en base de donnée
    // voir comment est géré l'IdUtilisateur avec le token
  
    return new Promise((resolve,reject) => {
  
      const sqlInsertDocs =
        "INSERT INTO `documents` (`userID`, `name`, `docPDF`) VALUES (?,?,?)";
      connection.query(sqlInsertDocs, [userId,docDetails.name,docDetails.docPDF], (error2, results) => {
        if (error2) {
          reject(error2)
          console.error(error2);
          return;
        }
        console.log(results)
          resolve({status : 200});
  
  
    });
  })
  },



  deletePDFById: function (documentId) {
    // return un garage avec ses photos et ses mobilites, en donnant l'id en param
    //tableaudeReturn
    return new Promise((resolve, reject) => {
      // get info from garages selected
      const sqlDeletePDF = "DELETE FROM documents WHERE documentID = ?";
      connection.query(
        sqlDeletePDF,
        documentId,
        (errorQueryGetPDF, resultQueryGetPDF) => {
          if (errorQueryGetPDF) {
            console.error(errorQueryGetPDF);
            reject(errorQueryGetPDF);
            return;
          }
          resolve({ status: 200});

        }
      );
    });
  },

  putDocsUserById: function ( docDetails) {
    // modifier les infos de l'user connecté, en donnant l'id en param
    //tableaudeReturn
    // console.log("iddoc" + docDetails.documentID)
    // console.log("NAME" + docDetails.name)
    // console.log("doc" + docDetails.docPDF)

    return new Promise((resolve,reject) => {

      const sqlInsertDocs = `UPDATE documents SET name=?, docPDF=? WHERE documentID=?`;
      connection.query(sqlInsertDocs, 
        [docDetails.name,docDetails.docPDF,docDetails.documentID], (error2, results) => {
          if (error2) {
            reject(error2)
            console.error(error2);
            return;
          }
          console.log(results)
            resolve({status : 200});
    
    
      });
    })

    // return new Promise((resolve, reject) => {
    //   let arrayReturn = "";
    //   // get info from user selected
    //   console.log("id " + UserId);
    //   console.log("doc " + docPDF);
    //   console.log("iddoc " + documentID);
    //   console.log("name " + name);
    //   const sqlPutUserDocs = "UPDATE documents SET name = ? AND docPDF = ? WHERE documentID= ? AND userID = " + UserId;
    //   console.log(sqlPutUserDocs);
    //   connection.query(
    //     sqlPutUserDocs,
    //     [docPDF, documentID, UserId],
    //     (errorQueryPutUserDocs, resultQueryPutUserDocs) => {
    //       if (errorQueryPutUserDocs) {
    //         console.error("est une erreur : " + errorQueryPutUserDocs);
    //         reject(errorQueryPutUserDocs);
    //         return;
    //       }
    //       //arrayReturn.push(resultQueryGetUser);
    //       arrayReturn = resultQueryPutUserDocs
    //       resolve({ status: 200});

    //     });

    // });
  },



  getUserLastDocs: function (UserId) {
    // return les infos de l'user connecté, en donnant l'id en param
    //tableaudeReturn
    return new Promise((resolve, reject) => {

      // get info from user selected
      const sqlGetLastUser = "SELECT MAX(documentID) as id FROM documents WHERE userID = ? ";
      connection.query(
        sqlGetLastUser,
        [UserId],
        (errorQueryGetUser, result1) => {
          if (errorQueryGetUser) {
            console.error(errorQueryGetUser);
            reject(errorQueryGetUser);
            return;
          }
          result1 = result1[0].id
          console.log(result1);
          // resolve({data: result1});
          const sqlGetPDF = "SELECT docPDF FROM documents WHERE documentID = " + result1;
          connection.query(
            sqlGetPDF,
            result1,
            (errorQueryGetPDF, resultQueryGetPDF) => {
              console.log("la 1 "+resultQueryGetPDF)
              if (errorQueryGetPDF) {
                console.error(errorQueryGetPDF);
                reject(errorQueryGetPDF);
                return;
              }
    
              console.log("la " + resultQueryGetPDF)
              resolve({ status: 200, data: resultQueryGetPDF});
            
        });
      })
  
    });
  },

  getUserByIdDocs: function (UserId) {
    // return les infos de l'user connecté, en donnant l'id en param
    //tableaudeReturn
    return new Promise((resolve, reject) => {
      let arrayReturn = "";
      // get info from user selected
      const sqlGetUser = "SELECT * FROM documents WHERE userID = ? ";
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



  getPDFById: function (documentID) {
    // return un garage avec ses photos et ses mobilites, en donnant l'id en param
    //tableaudeReturn
    return new Promise((resolve, reject) => {

      console.log(documentID)
      // get info from garages selected
      const sqlGetPDF = "SELECT docPDF FROM documents WHERE documentID = " + documentID;
      connection.query(
        sqlGetPDF,
        documentID,
        (errorQueryGetPDF, resultQueryGetPDF) => {
          console.log("la 1 "+resultQueryGetPDF)
          if (errorQueryGetPDF) {
            console.error(errorQueryGetPDF);
            reject(errorQueryGetPDF);
            return;
          }

          console.log("la " + resultQueryGetPDF)
          resolve({ status: 200, data: resultQueryGetPDF});
        }

      );


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

