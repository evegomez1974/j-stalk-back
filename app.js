import express from "express";
import cors from "cors";
import login from "./login/router.js"
import jobOffers from "./jobOffers/router.js";
import students from "./students/router.js"
import documents from "./documents/router.js"
import images from "./images/router.js"
import user from "./user/router.js"
import adresses from "./adresses/router.js"
import companies from "./companies/router.js"


const app = express();
app.use(cors());

app.use(login)
app.use(jobOffers)
app.use(students)
app.use(adresses)
app.use(companies)
app.use(documents)
app.use(images)
app.use(user)

app.listen(8080, () => {  console.log("Connecté à la base de données J-Stalk de MySQL!")})
  