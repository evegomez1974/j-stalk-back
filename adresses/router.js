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

export default router;