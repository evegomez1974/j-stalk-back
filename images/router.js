import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import services from "./service.js";

const upload = multer();
const router = express.Router();
router.use(bodyParser.json());

//const port = 8080;

// Auth : oui
// modifier profil user
router.post("/userPictures", upload.fields([]), (req, res) => {
    console.log('param:', req.body.pictures)
    res.set("Content-type", "application/json");
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
      services.putPicturesUserById(req.body.pictures, decoded.id).then(data => {
        console.log(data);
        res.status(data.status).send(data.data);   
      })
    } else {
      res.status(401).end("Vous n'êtes pas authentifié");
      return;
    }
  })





export default router;