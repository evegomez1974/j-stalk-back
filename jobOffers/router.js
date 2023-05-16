import express from "express";
import bodyParser from "body-parser";

import services from "./service.js";

const router = express.Router();
router.use(bodyParser.json());

//const port = 8080;

router.get("/listJobOffers", (req, res) => {
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
  services.getJobOffers()
    .then(jobOffers => {
      // Envoi de la réponse JSON avec les jobOffer et le statut 200 OK
      // console.log(jobOffers)
      res.status(200).json({ jobOffers });
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

router.put("/addJobOffers", (req, res) => {
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

  const body = req.body;

  /* Creating an object called jobOffer. */
      var jobOffer = {
        company: body.company,
        email: body.email,
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

  services.addJobOffer(jobOffer)
    .then(result => {
      console.log("Ajoutée à la bdd avec succès")
      res.status(result.status).json({ message: `L'annonce a été ajoutée avec succès avec l'ID ${result.data}` });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: error });
    });
  }else {
    res.status(401).end("Vous n'êtes pas authentifié");
    return;
  }
});

export default router;