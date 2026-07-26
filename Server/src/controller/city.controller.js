import City from "../models/city.model";
import asyncHandler from "../util/asyncHandler.util.js";
import apiError from "../util/error.util.js";

const getAllCities = asyncHandler(async (req, res) => {
  const cities = await City.find(); 
  if(!cities || cities.length === 0) {
    throw new apiError("No cities found", 404);
  }
  res.json(cities);
});

// controller for super admin to create city
const createCity = asyncHandler(async (req, res) => {
  const { name, state, country } = req.body;  
  const city = new City({
    name,
    state,
    country
  });
  const createdCity = await city.save();
  res.status(201).json(createdCity);
}); 

const updateCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, state, country } = req.body;  
  const city = await City.findByIdAndUpdate(id, { name, state, country}, { new: true });
  if (!city) {
    throw new apiError("City not found", 404);
  }
  res.json(city);
});

const changeCityStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;  
  const city = await City.findByIdAndUpdate(id, { isActive }, { new: true });
  if (!city) {
    throw new apiError("City not found", 404);
  }
  res.json(city);
});
