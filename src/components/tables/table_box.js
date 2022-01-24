import React from "react";
import TableCell from "./table_cell";


function formatUniqueID(date, time, table) {
    date = date.toISOString().slice(0,10);
    return `${date}|${String(time)}|${String(table)}`;
  }

function TablesBox( { reservationsList, currentDate, showHideAddReservation, showHideDeleteReservation, showHideEditReservation}) {
    const timeZone = {0: "19:00 - 20:00", 1: "20:00 - 21:00", 2: "21:00 - 22:00", 3: "22:00 - 23:00", 4: "23:00 - 24:00"};

    return(
        <table className="tg">
        <thead>
        <tr>
            <th className="tg-0pky" colSpan="6"><h1 className="date">{currentDate.toDateString()}</h1></th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td className="tg-0lax col1">TIME</td>
            <td className="tg-0lax cols">TABLE #1</td>
            <td className="tg-0lax cols">TABLE #2</td>
            <td className="tg-0lax cols">TABLE #3</td>
            <td className="tg-0lax cols">TABLE #4</td>
            <td className="tg-0lax cols">TABLE #5</td>
        </tr>
            {[0,1,2,3,4].map((time) => {
                return (
                    <tr key={currentDate+String(time)}>
                        <td>{timeZone[time]}</td>
                            {[0,1,2,3,4].map((table) => {
                                let uniqueID = formatUniqueID(currentDate, time, table);
                                return <TableCell key={uniqueID} uniqueID={uniqueID} 
                                        reservationsList={reservationsList} 
                                        showHideAddReservation={showHideAddReservation}
                                        showHideDeleteReservation={showHideDeleteReservation}
                                        showHideEditReservation={showHideEditReservation}
                                        />
                            })}
                    </tr>
                ) 
            })}
        </tbody>
    </table>
    )};

export default TablesBox;