import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import services from "./service.js";

const upload = multer();

const router = express.Router();
router.use(bodyParser.json());

//const port = 8080;

router.post("/userDocs", upload.fields([]), (req,res) => {
    let [status, message] = services.checkAuthZHeader(req.headers.authorization, "Bearer");
  if (status != 200) {
    res.status(status).send(message);
  }
  
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  let decoded;
  try {
    decoded = services.decodeJwt(token);
    console.log(decoded);
    console.log(decoded.id);
  } catch (e) {
    console.log(e);
  }
  if (decoded) {
    res.set("Content-Type", "application/json");
     services.addUserDocs(decoded.id, req.body).then((data) => {
       res.status(data.status).send(data.status);
     });
     } else {
       res.status(401).end("Vous n'êtes pas authentifié");
       return;
     }
  })



  // Auth : oui
// modifier profil user
router.put("/userDocsModif", upload.fields([]), (req, res) => {
    res.set("Content-type", "application/json");
    console.log('param:',req.body.documentID, req.body.name, req.body.docPDF)
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
      services.putDocsUserById(req.body, decoded.id).then(data => {
        console.log(data);
        res.status(data.status).send(data.status);   
      })
    } else {
      res.status(401).end("Vous n'êtes pas authentifié");
      return;
    }
  })
  


  // Auth : oui
// voir profil user
router.get("/userDocs", (req, res) => {
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
      services.getUserByIdDocs(decoded.id).then(data => {
        res.status(data.status).send(data.data);   
      })
    } else {
      res.status(401).end("Vous n'êtes pas authentifié");
      return;
    }
  })
  


//   // Auth : Oui
// // Louer une place
router.get("/userPDF/:documentID",(req, res) => {
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
        console.log("id doc : " + req.params.documentID)
      services.getPDFById(req.params.documentID).then(data => {
        res.status(data.status).send(data.data);   
      })
    } else {
      res.status(401).end("Vous n'êtes pas authentifié");
      return;
    }
})

export default router;