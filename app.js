import express from "express";
import cors from "cors";
import login from "./login/router.js"
import jobOffersRoutes from "./jobOffers/router.js";
import students from "./students/router.js"
import departments from "./departments/router.js"

const app = express();
app.use(cors());

app.use(login)
app.use(jobOffersRoutes)
app.use(students)
app.use(departments)

app.listen(8080, () => {  console.log("Connecté à la base de données J-Stalk de MySQL!")})
  