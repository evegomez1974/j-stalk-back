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
import services from "./service.js";
import multer from "multer";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

let upload = multer();
const app = express();
app.use(cors());
app.use(bodyParser.json());

//const port = 8080;

app.get("/jobOffers", (req, res) => {
  res.set("Content-type", "application/json");

  // Récupération de toutes les entreprises
  services.getJobOffers()
    .then(jobOffers => {
      // Envoi de la réponse JSON avec les entreprises et le statut 200 OK
      // console.log(jobOffers)
      res.status(200).json({ jobOffers });
    })
    .catch(error => {
      console.error(error);
      // Envoi de la réponse avec le statut 500 Internal Server Error
      res.sendStatus(500);
    });
});

app.put("/addJobOffers", (req, res) => {
  res.set("Content-type", "application/json");

  const body = req.body;

  /* Creating an object called account. */
      var jobOffer = {
        jobTitle: body.jobTitle,
        jobType: body.jobType,
        contractType: body.contractType,
        contractLength: body.contractLength,
        salary: body.salary,
        tempSalary: body.tempSalary,
        favorite: body.favorite,
        department: body.department,
        description: body.description,
        city: body.city
      }

  // Récupération de toutes les entreprises
  services.addJobOffer(jobOffer)
    .then(result => {
      res.status(result.status).json({ message: `L'annonce a été ajoutée avec succès avec l'ID ${result.data}` });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: error });
    });
});



app.listen(8080, () => { console.log("Connecté à la base de données J-Stalk de MySQL!") })
