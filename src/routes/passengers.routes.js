import { Router } from "express";
import { getPassengersTravels } from "../controllers/passengers.controllers.js";

const passengersRoutes = Router();

passengersRoutes.get("/passengers/travels", getPassengersTravels);

export default passengersRoutes;
