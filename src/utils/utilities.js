function formatUniqueID(date, time, table) {
    // uniqueID will be like 01-01-2022|0|1 where 0 is the time ID and 1 is the table ID
    date = date.toISOString().slice(0,10);
    return `${date}|${String(time)}|${String(table)}`;
  }
  
function buildReservationList(data) {
    const reservations = {};
    data.forEach((element) => {
      let uniqueID = formatUniqueID(new Date(element.booking_date), element.booking_time, element.booking_table);
      reservations[uniqueID] = element;
    });
    return reservations;
  }

  function dataFromUniqueID(uniqueID) {
    return uniqueID.split("|");
}

export {formatUniqueID, buildReservationList, dataFromUniqueID};