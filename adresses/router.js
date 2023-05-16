import express from "express";
import bodyParser from "body-parser";

import services from "./service.js";

const router = express.Router();
router.use(bodyParser.json());

router.get("/listDepartments", (req, res) => {
  res.set("Content-Type", "application/json");
  let [status, message] = services.checkAuthZHeader(req.headers.authorization, "Bearer");

  if (status != 200) {
    res.status(status).send(message);
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  let decoded;
  try {
    decoded = services.decodeJwt(token);
    console.log(decoded);
  } catch (e) {
    console.log(e);
  }
  if (decoded) {
    services.getlistDepartments().then(data => {
      res.status(data.status).send(data.data); 
    })
  } else {
    res.status(401).end("Vous n'êtes pas authentifié");
    return;
  }

 
});

router.get("/listDepartmentsSignUp", (req, res) => {
  res.set("Content-type", "application/json");

  // Récupération de toutes les entreprises
  services.getlistDepartmentsSignUp()
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

export default router;