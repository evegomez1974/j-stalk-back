import express from "express";
import bodyParser from "body-parser";

import services from "./service.js";

const router = express.Router();
router.use(bodyParser.json());

//const port = 8080;

router.post("/userEmail/:email", (req, res) => {
    console.log("email : " + req.params.email)
    res.set("Content-Type", "application/json");
    services.verifEmail(req.params.email).then(data => {
      console.log(data);
      res.sendStatus(200);   
    })
    .catch(e => {
      console.error(e);
      res.sendStatus(500);
    })
  });


    // Auth : oui
// modifier profil user
router.put("/userNewPassword/:password/:email", (req, res) => {
    res.set("Content-type", "application/json");
    console.log('param pass:', req.params.password)
    console.log('param email:', req.params.email)
      services.putPasswordById(req.params.password,req.params.email).then(data => {
        res.status(data.status).send(data.data);   
      })
      .catch(e => {
        console.error(e);
        res.sendStatus(500);
      })
  })
  


// Auth : oui
// voir profil user
router.get("/userInfos", (req, res) => {
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
      services.getUserByIdInfos(decoded.id).then(data => {
        res.status(data.status).send(data.data);   
      })
    } else {
      res.status(401).end("Vous n'êtes pas authentifié");
      return;
    }
  })


  // Auth : oui
// voir profil user
router.get("/userType", (req, res) => {
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
    services.getUserByIdType(decoded.id).then(data => {
      res.status(data.status).send(data.data);   
    })
  } else {
    res.status(401).end("Vous n'êtes pas authentifié");
    return;
  }
})

export default router;