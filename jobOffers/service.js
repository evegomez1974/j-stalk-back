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

  
  getJobOffers: function () {
    // return les infos de l'user connecté, en donnant l'id en param
    //tableaudeReturn
    return new Promise((resolve, reject) => {
      let arrayReturn = "";
      // get info from user selected
      const sqlGetJobOffers = "SELECT * FROM jobOffers";
      connection.query(
        sqlGetJobOffers,
        (errorQueryGetJobOffers, resultQueryGetJobOffers) => {
          if (errorQueryGetJobOffers) {
            console.error(errorQueryGetJobOffers);
            reject(errorQueryGetJobOffers);
            return;
          }
          //console.log(resultQueryGetUser);
          //arrayReturn.push(resultQueryGetUser);
          arrayReturn = resultQueryGetJobOffers
          resolve({ status: 200, data: arrayReturn});
        });

    });
  },


  addJobOffer: function(jobOffer) {
    return new Promise((resolve, reject) => {
        const sqlAddJobOffer = "INSERT INTO jobOffers(jobTitle, city, department, jobType, contractType, contractLength, salary, tempSalary, description, favorite ) VALUES (?,?,?,?,?,?,?,?,?,?)";
        connection.query(sqlAddJobOffer, [jobOffer.jobTitle, jobOffer.city, jobOffer.department, jobOffer.jobType, jobOffer.contractType, jobOffer.contractLength, jobOffer.salary, jobOffer.tempSalary, jobOffer.description, jobOffer.favorite], (error, results) => {
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

