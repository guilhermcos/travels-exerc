import db from "../database/database.js";

export async function getPassengersTravelsList(page, name) {
    const offSet = (page - 1) * 25;
  return (
    (await db.query(
      `
            SELECT passengers."fullName" AS passenger, COUNT(passengers) AS viagens
            FROM passengers
            JOIN passenger_travels ON passenger_travels."passengerId" = passengers.id
            JOIN travels ON travels.id = passenger_travels."travelId"
            WHERE passengers."fullName" ILIKE $1
            GROUP BY passenger
            ORDER BY viagens DESC
            ${page ? "LIMIT 25" : "LIMIT 101"}
            ${page ? `OFFSET $2` : ""}
        `,
      page ? [`%${name}%`, offSet] : [`%${name}%`]
    )) || []
  );
}
