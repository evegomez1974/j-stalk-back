import express from "express";
import services from "./services.js";
import multer from "multer";

const router = express.Router();

let upload = multer();

router.get("/users/login", (req, res) => {
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
    if (!token || token === "Incorrect") {
      res.status(400).send("Identifiant ou mot de passe incorrect");
      return;
    }
    // else{const userId = services.login(req.body); }
    res.json({ token });
  })
    .catch(e => {
      console.error(e);
      res.sendStatus(400);
    })
});

// Auth : Non
// s'enregistrer
router.post('/users/signup', upload.fields([]), (req, res) => {
  services.signup(req.body)
    .then(token => {
      res.status(200).send({ token });
    })
    .catch(err => {
      res.status(400).send({ err });
    })
})





export default router;