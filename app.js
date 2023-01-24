const express = require('express')
const app = express()
const mysql = require('mysql')
app.listen(8080, () => {  console.log('Serveur écoute')})
const db = mysql.createConnection({databse:"test", host: "localhost",   user: "root",   password: "" });
db.connect(function(err) {   
    if (err) throw err;   
    console.log("Connecté à la base de données MySQL!"); 
});
module.exports = db

//const parkings = require('./parkings.json')
//app.get('/parkings', (req,res) => {    res.status(200).json(parkings)})
//app.get('/test', (req,res) => {    res.send("test")})
