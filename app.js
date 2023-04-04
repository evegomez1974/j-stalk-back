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

let upload = multer();
const app = express();
app.use(cors());
const port = 3000;

// Auth : non
// Se connecter

/**
 * RequestUsersDetails
 */

app.get("/users/login", (req, res) => {
    res.set("Content-Type", "application/json");
    let [status, message] = services.checkAuthZHeader(
      req.headers.authorization,
      "Basic"
    );
    if (status != 200) {
      res.status(status).send(message);
    }
  
    let credentials = req.headers.authorization.split(" ")[1];
    console.log(credentials);
    services.login(credentials).then((token) => {
      if (!token) {
        res.status(400).send("Identifiant ou mot de passe incorrect");
        return;
      }
      // else{const userId = services.login(req.body); }
      res.json({ token });
    })
    .catch(e => {
      console.error(e);
      res.sendStatus(500);
    })
  });
  
  // Auth : Non
  // s'enregistrer
  app.post('/users/signup', upload.fields([]), (req,res) => {
    services.signup(req.body)
    .then(token => {
      res.status(200).send({ token });
    })
    .catch(err => {
      res.status(400).send({ err });
    })
  })