const express = require('express');
const router = express.Router();
const allCars = require('../models/allCars.json');
const defaultRegion = "New York, Usa"
router.get("/", (req, res) => {
    let userRegion = req.query.region;
    if(!userRegion) {
        userRegion = defaultRegion
    }
    let filteredCars = allCars.filter(car => car.region.toLowerCase().trim() === userRegion.toLowerCase().trim() && car.availability);
    if(req.query.type) {
        filteredCars = filteredCars.filter(car => car.carType.toLowerCase().trim() === req.query.type.toLowerCase().trim());
    }
    if(req.query.priceRange){
        filteredCars = filteredCars.filter(car => {
            return car.pricing.amount >= req.query.priceRange[0] && car.pricing.amount <= req.query.priceRange[1]
        })
    }
    if(req.query.passengers){
        filteredCars = filteredCars.filter(car => car.attributes.passengers >= req.query.passengers)
    }
    if(req.query.fuelType){
        filteredCars = filteredCars.filter(car => car.attributes.fuelType.toLowerCase().trim() === req.query.fuelType.toLowerCase().trim())
    }
    if(req.query.transmission){
        filteredCars = filteredCars.filter(car => car.attributes.transmission.toLowerCase().trim() === req.query.transmission.toLowerCase().trim())
    }
    res.status(200).json( filteredCars);

})
router.get('/all', (req, res) => {
    res.status(200).json(allCars)
})
router.get("/:id",(req,res) => {
    const carId = req.params.id;
    const car = allCars.find(car => car.id === carId);
    if(!car) {
        return res.status(404).json({msg: "Car not found"})
    }
    res.status(200).json(car)
})


module.exports = router;
