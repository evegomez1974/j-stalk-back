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

  
  getlistDepartments: function () {
    // return les infos de l'user connecté, en donnant l'id en param
    //tableaudeReturn
    return new Promise((resolve, reject) => {
      let arrayReturn = "";
      // get info from user selected
      const sqlGetDepartments = "SELECT name FROM departments;";
      connection.query(
        sqlGetDepartments,
        (errorQueryGetListDepartments, resultQueryGetListDepartments) => {
          if (errorQueryGetListDepartments) {
            console.error(errorQueryGetListDepartments);
            reject(errorQueryGetListDepartments);
            return;
          }
          console.log(resultQueryGetListDepartments);
          //arrayReturn.push(resultQueryGetUser);
          arrayReturn = resultQueryGetListDepartments
          resolve({ status: 200, data: arrayReturn});
        });

    });
  },



};

export default services;

