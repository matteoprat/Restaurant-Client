import React from "react";

function TableCell( { uniqueID, reservationsList, showHideAddReservation, showHideDeleteReservation, showHideEditReservation}) {
    const addReservation = () => {
        showHideAddReservation(uniqueID);
    }

    const editRerservation = () => {
        showHideEditReservation(uniqueID);
    }

    const deleteReservation = () => {
        showHideDeleteReservation(uniqueID);
    }
    

    if (reservationsList.hasOwnProperty(uniqueID)) {
        const currentData = reservationsList[uniqueID];
        return (
            <td className="tg-0lax cols">
                <div className="row-btn">
                    <div className="table-detail">
                        <span title={`${currentData.name}: ${currentData.email} People: ${currentData.booked_seats}`}>RESERVED</span>
                        <button className="btn-edit btn-small" name={"edit"+uniqueID} value="edit" onClick={()=>editRerservation()}>Edit</button>
                        <button className="btn-delete btn-small" name={"delete"+uniqueID} value="delete" onClick={()=>deleteReservation()}>Delete</button>
                    </div>
                </div>
            </td>
        )
    } else {
        return (
            <td className="tg-0lax cols">
                <div className="row-btn">
                    <div className="table-detail">
                        Free:
                        <button className=" btn-small" name={"add"+uniqueID} value="add" onClick={()=>addReservation()}>Add</button>
                    </div>
                </div>
            </td>
        )
    } 
}

export default TableCell;