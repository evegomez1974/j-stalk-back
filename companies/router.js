import express from "express";
import bodyParser from "body-parser";

import services from "./service.js";

const router = express.Router();
router.use(bodyParser.json());

router.get("/listCompanies", (req, res) => {
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

  // Récupération de toutes les entreprises
  services.getListCompanies()
    .then(companies => {
      // Envoi de la réponse JSON avec les cities et le statut 200 OK
      // console.log(jobOffers)
      res.status(200).json({ companies });
    })
    .catch(error => {
      console.error(error);
      // Envoi de la réponse avec le statut 500 Internal Server Error
      res.sendStatus(500);
    });
  }else {
    res.status(401).end("Vous n'êtes pas authentifié");
    return;
  }
});

export default router;