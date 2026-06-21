const express = require('express');
const router = express.Router();
const allCars ={
    cars: require('../models/allCars.json') || [],
    setCars: (value)=>{
        this.cars = value;
    }
} 
const defaultRegion = "New York, Usa"
const {verifyAccessToken}= require("../middleware/verifyJWT")
const fsPromises = require("fs").promises
const path = require("path")
const {verifyRoles,rolesList} = require("../middleware/roles_list");
const { route } = require('./refresh');
router.get("/", (req, res) => {
    let userRegion = req.query.region;
    if(!userRegion) {
        userRegion = defaultRegion
    }
    let filteredCars = allCars.cars.filter(car => car.region.toLowerCase().trim() === userRegion.toLowerCase().trim() && car.availability);
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
    res.status(200).json(allCars.cars)
})
router.get("/:id",(req,res) => {
    const carId = req.params.id;
    const car = allCars.cars.find(car => car.id === parseInt(carId));
    if(!car) {
        return res.status(404).json({msg: "Car not found"})
    }
    res.status(200).json(car)
})
router.post("/add",verifyAccessToken,verifyRoles(rolesList.editior,rolesList.admin),async (req,res)=>{
    const {makeAndModel,imageUrl,passengers,fuelType,transmission,range,price,currency,region,availability} = req.body;
    if(!makeAndModel || !imageUrl || !passengers || !fuelType || !transmission || !range || !price || !currency || !region || !availability) {
        return res.status(400).json({msg:"All fields are required"})
    }
    const newCar = {
        id: allCars.length + 1,
        makeAndModel,
        imageUrl,
        rating: {reviewCount:0},
        attributes: {passengers,fuelType,transmission,range},
        pricing: {amount:price,currency},
        availability,
        region
    }
    allCars.setCars([...allCars.cars,newCar]);
    await fsPromises.writeFile(path.join(__dirname, "../models/allCars.json"),JSON.stringify(allCars.cars))
    res.status(200).json({msg: "Car added successfully"})
})
router.delete("/:id",verifyAccessToken,verifyRoles(rolesList.editior,rolesList.admin),async (req,res)=>{
    const carId = req.params.id;
    const car = allCars.cars.find(car => car.id === parseInt(carId));
    if(!car) {
        return res.status(404).json({msg: "Car not found"})
    }
    const otherCars = allCars.cars.filter(car => car.id !== parseInt(carId))
    allCars.setCars([...otherCars])
    await fsPromises.writeFile(path.join(__dirname, "../models/allCars.json"),JSON.stringify(allCars.cars))
    res.status(200).json({msg: "Car deleted successfully"})
})

module.exports = router;
