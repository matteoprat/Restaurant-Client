import React, {useState} from "react";

function EditReservation( {customersList, showHideAlert, reservationData, showHideEditReservation} ) {
    const startingIndex = customersList.findIndex(data => data.email === reservationData.email);
    const [customerID, setCustomerID] = useState(startingIndex);
    const [customerName, setCustomerName] = useState(customersList[startingIndex].name);
    const [seats, setSeats] = useState(reservationData.booked_seats);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessages, setErrorMesages] = useState(false);
    const timeZone = {0: "19:00 - 20:00", 1: "20:00 - 21:00", 2: "21:00 - 22:00", 3: "22:00 - 23:00", 4: "23:00 - 24:00"};
    const data = {
        date: reservationData.booking_date,
        table: reservationData.booking_table,
        time: timeZone[reservationData.booking_time]
    };

    const editReservation = async () => {
        try {        
            let fields = {
                newCustomerID: customersList[customerID].id,
                newSeats: seats
            };
            let response = await fetch("http://localhost:5000/api/reservations/"+reservationData.id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
            });
            response = await response.json();
            if (response.message === "Success") {
                setSuccess(true);
            } else {
                setErrorMesages(response.message);
                setError(true);
            }

        } catch (err) {
            console.error(err.message);
        }
    };

    const pickCustomer = (idx) => {
        setCustomerID(idx);
        setCustomerName(customersList[idx].name);
    }

    const closeWindow = () => {
        showHideEditReservation("");
    }

    return (
        <div id="reservation-window">
            <div className="reservation-container">
                <div className="reservation-row">
                    <h3>Booking for {data.date} - table {(data.table+1)}</h3>
                </div>
                <div className="reservation-row">
                    <h4>Time: {data.time}</h4>
                </div>
                {
                    success === false && error === false ? (
                <>
                <div className="reservation-row">
                <label htmlFor="email">Email: </label>
                <select name="user-email" className="customer-select" value={customerID} onChange={(e) =>pickCustomer(e.target.value)}>
                {customersList.length===0 ? (<option value="">No customers available</option>): 
                                        (customersList.map(
                                            (data, idx) => {
                                                return (<option key={data.id} value={idx}>{data.email}</option>)
                                            })
                                        )
                }
                </select>
                </div>
                <div className="reservation-row">
                <label htmlFor="name">Customer name:</label>
                <input className="customer-input" type="text" id="name" name="name" value={
                    customerID === -1 ? ("") : (customerName)} 
                    required 
                    disabled={true}>
                </input>
                </div>
                <div className="reservation-row">
                    <label htmlFor="seats">People: </label>
                    <select name="seats" className="customer-select" value={seats} onChange={e => setSeats(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className="reservation-row">
                <button className="customer-button" name="submit" onClick={() => editReservation()}>Edit Reservation</button>
                <button className="btn-delete" name="closewindow" onClick={() => closeWindow()}>Close Window</button>
                </div>
                </>
                ) : success === true ? (
                    <>
                        <div className="reservation-row">The reservation has been changed successfully.</div>
                        <div className="reservation-row">
                        <button className="btn-delete" name="closewindow" onClick={() => closeWindow()}>Close Window</button>
                </div>
                    </>
                ) : (
                    <>
                        <div className="reservation-row">Something went wrong.</div>
                        <div className="reservation-row">
                            <ul>
                                {errorMessages.map((mess, idx) => {
                                    return (<li key={"err-"+idx}>{mess}</li>)
                                })}
                            </ul>
                        </div>
                        <div className="reservation-row">
                            <button className="btn-delete" name="closewindow" onClick={() => closeWindow()}>Close Window</button>
                        </div>
                    </>
                )
            } 
            </div>
        </div>
    );
}

export default EditReservation;