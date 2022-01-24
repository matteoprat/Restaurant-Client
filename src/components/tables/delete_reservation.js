import React, {useState} from "react";

function DeleteReservation( { reservationData, showHideDeleteReservation} ) {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [err, setErr] = useState([]);

    const deleteReservation = async () => {
        try {        
            let response = await fetch("http://localhost:5000/api/reservations/"+String(reservationData.id),
            {
                method: 'DELETE'
            });
            response = await response.json();
            
            
            if (response.message === "Success") {
                setSuccess(true);
            } else {
                setErr(response.message);
                setError(true);
            }

        } catch (err) {
            console.error(err.message);
        }
    };

    const closeWindow = () => {
        showHideDeleteReservation("");
    }

    return (
        <div id="delete-window">
            <div className="delete-container">
                <div className="delete-row">
                    <h3>Reservation for {reservationData.booking_date}</h3>
                </div>
                {success === false && error === false ? (
                <>
                <div className="delete-row">Email: {reservationData.email} Name: {reservationData.name} Seats: {reservationData.booked_seats}</div>
                <div className="reservation-row">
                    <button className="btn-delete" name="submit" onClick={()=>deleteReservation()}>Delete Reservation</button>
                    <button className="customer-button" name="closewindow" onClick={() => closeWindow()}>Close Window</button>
                </div>
                </>
                ) : success === true ? (
                    <>
                    <div className="delete-row">Reservation successfully deleted</div>
                    <button className="customer-button" name="closewindow" onClick={() => closeWindow()}>Close Window</button>
                    </>
                ) : (
                    <>
                    <div className="delete-row">Something went wrong:
                        <ul>
                            {err.map((mess, idx) => {
                                return <li key={"error"+idx}>{mess}</li>
                            })}
                        </ul>
                    </div>
                    <button className="customer-button" name="closewindow" onClick={() => closeWindow()}>Close Window</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default DeleteReservation;