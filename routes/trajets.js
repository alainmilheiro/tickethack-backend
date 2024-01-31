var express = require('express');
var router = express.Router();
require('../models/connection');
const Trajet = require("../models/trajets")
const moment = require('moment')



// route qui permet voir si je suis bien connecté à la DB
router.get('/', (req, res) => {
  res.json({ result: true });
 });

 // route qui permet d'afficher tout la DB (tous les trajets)
 router.get('/trajets', (req, res) => {
  Trajet.find().then(data => {
    res.json({ allTrajets: data });
  });
 });

//route qui permet de trouver les infos en focntion d'une ville ciblée
router.get('/trajets', (req, res) => {
  Trajet.find().then(data => {
    res.json({ allTrajets: data });
  });
 });






//route qui permet de trouver les trajets en fonction du lieu de départ ET d'arrivée
router.get("/liste/:departure/:arrival/:date", (req, res) => {
  
  console.log(moment(req.params.date).toDate());
  Trajet.find({
    departure: req.params.departure,
    arrival: req.params.arrival,
    date : {
    $gte: moment(req.params.date).add(1, 'hour').toDate(),
    $lt: moment(req.params.date).endOf('day')
    }
  }).then(data => {
    if (data.length !== 0) {
      res.json({ result: true, trajetDemande: data });
    } else {
      res.json({ result: false, error: "Trip not found" });
    }
  });
});


router.get("/:cityName", (req, res) => {
  City.findOne({
    cityName: { $regex: new RegExp(req.params.cityName, "i") },
  }).then(data => {
    if (data) {
      res.json({ result: true, weather: data });
    } else {
      res.json({ result: false, error: "City not found" });
    }
  });
});



module.exports = router;
