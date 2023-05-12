import express from "express";
import services from "./services.js";
import multer from "multer";

const router = express.Router();

let upload = multer();

router.get("/users/login", (req, res) => {
    res.set("Content-Type", "application/json");
    res.set("Access-Control-Allow-Origin", "*");
    let [status, message] = services.checkAuthZHeader(
      req.headers.authorization,
      "Basic"
    );
    if (status != 200) {
      res.status(status).send(message);
    }
  
    let credentials = req.headers.authorization.split(" ")[1];
    //console.log(credentials);
    services.login(credentials).then((token) => {
      if (!token) {
        res.status(400).send("Identifiant ou mot de passe incorrect");
        return;
      }
      //else{const userId = services.login(req.body); }
      res.json({ token });
    })
    .catch(e => {
      console.log("ici")
      console.error(e);
      res.sendStatus(500);
    })
  });
  
  // Auth : Non
  // s'enregistrer
  router.post('/users/signup', upload.fields([]), (req,res) => {
    services.signup(req.body)
    .then(token => {
      res.status(200).send({ token });
    })
    .catch(err => {
      res.status(400).send({ err });
    })
  })


// Auth : non
// Se connecter

/**
 * Verifie si email existe
 */
  // Auth : Non
  // s'enregistrer


  router.post("/userEmail/:email", (req, res) => {
  res.set("Content-Type", "application/json");
  services.verifEmail(req.params.email).then(data => {
    //console.log(data);
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

export default router;