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


// Auth : non
// Se connecter

/**
 * Verifie si email existe
 */
// Auth : Non
// s'enregistrer


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
  services.putPasswordById(req.params.password, req.params.email).then(data => {
    res.status(data.status).send(data.data);
  })
    .catch(e => {
      console.error(e);
      res.sendStatus(500);
    })
})



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
router.put("/userPictures/:Pictures", (req, res) => {
  res.set("Content-type", "application/json");
  console.log('param:', req.params.Pictures)
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
    services.putPicturesUserById(decoded.id , req.params.Pictures).then(data => {
      console.log(data);
      res.status(data.status).send(data.status);   
    })
  } else {
    res.status(401).end("Vous n'êtes pas authentifié");
    return;
  }
})


// Auth : oui
// modifier profil user
router.put("/userDocsModif/:docPDF/:documentID", (req, res) => {
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


// Auth : Oui
// Louer une place
router.get("/userPDF/:documentID"),
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
router.get("/studentInfos", (req, res) => {
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

export default router;