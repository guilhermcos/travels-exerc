import { getPassengersTravelsList } from "../repositories/passengers.repositories.js";

export async function getPassengersTravels(req, res) {
  const { page = 0, name = "" } = req.query;
  if (isNaN(Number(page)) || parseInt(page) <= 0) return res.status(400).send("Invalid page value");
  if (typeof name !== "string") return res.status(400).send("name must be a string");
  try {
    const passengersTravels = await getPassengersTravelsList(page, name);
    if (passengersTravels.rows.length > 100) return res.status(500).send("Too many results");

    res.status(200).send(passengersTravels.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
