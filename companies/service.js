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


  getListCompanies: function () {
    // return les infos de l'user connecté, en donnant l'id en param
    //tableaudeReturn
    return new Promise((resolve, reject) => {
      let arrayReturn = "";
      // get info from user selected
      const sqlGetListCompanies = "SELECT companies.*, addresses.address, addresses.city, departments.code, departments.name as departmentName, users.phoneNumber, users.email, users.name as userName FROM companies JOIN addresses ON companies.addressID = addresses.addressID JOIN departments ON addresses.departmentID = departments.id JOIN users ON companies.userID = users.userID;";
      connection.query(
        sqlGetListCompanies,
        (errorQueryGetListCompanies, resultQueryGetListCompanies) => {
          if (errorQueryGetListCompanies) {
            console.error(errorQueryGetListCompanies);
            reject(errorQueryGetListCompanies);
            return;
          }
          console.log(resultQueryGetListCompanies);
          //arrayReturn.push(resultQueryGetUser);
          arrayReturn = resultQueryGetListCompanies
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
