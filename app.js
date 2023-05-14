// const express = require('express')
// const app = express()
// const mysql = require('mysql')
// app.listen(8080, () => {  console.log('Serveur écoute')})
// const db = mysql.createConnection({databse:"j-stalk", host: "localhost",   user: "root",   password: "" });
// db.connect(function(err) {   
//     if (err) throw err;   
//     console.log("Connecté à la base de données MySQL!"); 
// });
// module.exports = db

import express from "express";
import services from "./services.js";
import multer from "multer";
import mysql from "mysql2";
import cors from "cors";

let upload = multer();
const app = express();
app.use(cors());
//const port = 8080;


// Auth : non
// Se connecter

/**
 * RequestUsersDetails
 */

app.get("/users/login", (req, res) => {
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
  app.post('/users/signup', upload.fields([]), (req,res) => {
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


app.post("/userEmail/:email", (req, res) => {
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
app.put("/userNewPassword/:password/:email", (req, res) => {
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



app.post("/userDocs", upload.fields([]), (req,res) => {
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
app.post("/userPictures", upload.fields([]), (req, res) => {
  res.set("Content-type", "application/json");
  console.log('param:', req.body.pictures)
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


// Auth : oui
// modifier profil user
app.post("/userDocsModif/:docPDF/:documentID", (req, res) => {
  res.set("Content-type", "application/json");
  console.log('param:', req.params.docPDF, req.params.documentID)
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
    services.putDocsUserById(req.params.docPDF, req.params.documentID, decoded.id).then(data => {
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
app.get("/userInfos", (req, res) => {
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
app.get("/userDocs", (req, res) => {
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


// Auth : Oui
// Louer une place
app.get("/userPDF/:documentID"),
  (req, res) => {
    res.set("Content-Type", "application/json");
    let [status, message] = services.checkAuthZHeader(req.headers.authorization, "Bearer");

    if (status != 200) {
      res.status(status).send(message);
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
      console.log("id doc : " + req.params.id)
      services.getPDFById(req.params.id).then(data => {
        res.sendStatus(data.status);   
      })
    } else {
      res.status(401).end("Vous n'êtes pas authentifié");
      return;
    }
  },

// Auth : oui
// voir profil student
app.get("/studentInfos", (req, res) => {
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
    services.getStudentById(decoded.id).then(data => {
      res.status(data.status).send(data.data);   
    })
  } else {
    res.status(401).end("Vous n'êtes pas authentifié");
    return;
  }
})

  app.listen(8080, () => {  console.log("Connecté à la base de données J-Stalk de MySQL!")})
  