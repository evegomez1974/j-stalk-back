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

  
  getListStudents: function () {
    // return les infos de l'user connecté, en donnant l'id en param
    //tableaudeReturn
    return new Promise((resolve, reject) => {
      let arrayReturn = "";
      // get info from user selected
      const sqlGetListStudents = "SELECT s.*, u.name, u.firstName FROM students as s JOIN users as u ON s.userID = u.userID;";
      connection.query(
        sqlGetListStudents,
        (errorQueryGetListStudents, resultQueryGetListStudents) => {
          if (errorQueryGetListStudents) {
            console.error(errorQueryGetListStudents);
            reject(errorQueryGetListStudents);
            return;
          }
          console.log(resultQueryGetListStudents);
          //arrayReturn.push(resultQueryGetUser);
          arrayReturn = resultQueryGetListStudents
          resolve({ status: 200, data: arrayReturn});
        });

    });
  },


  addJobOffer: function(jobOffer) {
    return new Promise((resolve, reject) => {
        const sqlAddJobOffer = "INSERT INTO jobOffers(jobTitle, city, department, jobType, contractType, contractLength, salary, tempSalary, description, favorite, company, email ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        connection.query(sqlAddJobOffer, [jobOffer.jobTitle, jobOffer.city, jobOffer.department, jobOffer.jobType, jobOffer.contractType, jobOffer.contractLength, jobOffer.salary, jobOffer.tempSalary, jobOffer.description, jobOffer.favorite, jobOffer.company, jobOffer.email], (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve({ status: 200, data: results.city });
            }
        });
    });
}



};

export default services;

