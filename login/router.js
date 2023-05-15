import express from "express";
import services from "./services.js";
import multer from "multer";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.json());

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

// // Auth : Non
// // s'enregistrer
// router.post('/users/signup', upload.fields([]), (req, res) => {
//   services.signup(req.body)
//     .then(token => {
//       res.status(200).send({ token });
//     })
//     .catch(err => {
//       res.status(400).send({ err });
//     })
// })



router.put("/users/signup", (req, res) => {
  res.set("Content-type", "application/json");

  const body = req.body;
  /* Creating an object called jobOffer. */
      var formSignUp = {
        email: body.email,
        password: body.password,
        name: body.name,
        firstName: body.firstName,
        phoneNumber: body.phoneNumber,
        pictures: body.pictures,
        userStatus: body.userStatus,
        jobType: body.jobType,
        contractType: body.contractType,
        contractLength: body.contractLength,
        yearSchool: body.yearSchool,
        typeDegree: body.typeDegree,
        nameSchool: body.nameSchool,
        description: body.description,
        favorite: body.favorite,
        address: body.address,
        city: body.city,
        department: body.department
      }


  services.addUserSignUp(formSignUp)
    .then(result => {
      console.log("Ajoutée à la bdd avec succès")
      res.status(result.status).json({ message: `L'étudiant a été ajoutée avec succès avec l'ID ${result.data}` });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: error });
    });
});





export default router;