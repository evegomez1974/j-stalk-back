// const express = require('express')
// const app = express()
// const mysql = require('mysql')
// app.listen(8080, () => {  console.log('Serveur écoute')})
// const db = mysql.createConnection({databse:"j-stalk", host: "localhost",   user: "root",   password: "" });
// db.connect(function(err) {   
//     if (err) throw err;   
//     console.log("Connecté à la base de données MySQL!"); 
// });
// module.exports = db

import express from "express";
import services from "./services.js";
import multer from "multer";
import mysql from "mysql2";
import cors from "cors";
import jobOffersRoutes from "./jobOffers/router.js";


const app = express();
app.use(cors());
//const port = 8080;


app.use('/jobOffers', jobOffersRoutes)
// Auth : non
// Se connecter
/**
 * RequestUsersDetails
 */


  app.listen(8080, () => {  console.log("Connecté à la base de données J-Stalk de MySQL!")})
  