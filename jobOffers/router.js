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

import services from "./service.js";


import express from "express";
const router = express.Router();
// app.use(bodyParser.json());

//const port = 8080;

router.get("/listJobOffers", (req, res) => {
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

router.put("/addJobOffers", (req, res) => {
  res.set("Content-type", "application/json");

  const jobOffer = req.body;

  /* Creating an object called account. */
      // var jobOffer = {
      //   jobTitle: body.jobTitle,
      //   jobType: body.jobType,
      //   contractType: body.contractType,
      //   contractLength: body.contractLength,
      //   salary: body.salary,
      //   tempSalary: body.tempSalary,
      //   favorite: body.favorite,
      //   department: body.department,
      //   description: body.description,
      //   city: body.city
      // }

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




export default router;