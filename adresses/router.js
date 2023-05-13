import express from "express";
import bodyParser from "body-parser";

import services from "./service.js";

const router = express.Router();
router.use(bodyParser.json());

router.get("/listDepartments", (req, res) => {
  res.set("Content-type", "application/json");

  // Récupération de toutes les entreprises
  services.getlistDepartments()
    .then(departments => {
      // Envoi de la réponse JSON avec les cities et le statut 200 OK
      // console.log(jobOffers)
      res.status(200).json({ departments });
    })
    .catch(error => {
      console.error(error);
      // Envoi de la réponse avec le statut 500 Internal Server Error
      res.sendStatus(500);
    });
});

router.get("/adress", (req, res) => {
  res.set("Content-type", "application/json");

  // Récupération de toutes les entreprises
  services.getAdress()
    .then(adress => {
      // Envoi de la réponse JSON avec les cities et le statut 200 OK
      // console.log(jobOffers)
      res.status(200).json({ adress });
    })
    .catch(error => {
      console.error(error);
      // Envoi de la réponse avec le statut 500 Internal Server Error
      res.sendStatus(500);
    });
});

export default router;