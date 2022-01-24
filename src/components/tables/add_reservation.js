import React, {useState} from "react";
import { dataFromUniqueID } from "../../utils/utilities";

function AddReservation( {customersList, uniqueID, showHideAddReservation} ) {

    const [customerName, setCustomerName] = useState(customersList.length !== 0 ? customersList[0].name : "");
    const [customerID, setCustomerID] = useState(customersList.length !== 0 ? customersList[0].id : -1);
    const customers = [...customersList];
    const [seats, setSeats] = useState(1);
    const insertData = dataFromUniqueID(uniqueID);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorValue, setErrorValue] = useState({});
    const timeZone = {0: "19:00 - 20:00", 1: "20:00 - 21:00", 2: "21:00 - 22:00", 3: "22:00 - 23:00", 4: "23:00 - 24:00"};
    const data = {
        date: new Date(insertData[0]),
        time: insertData[1],
        table: insertData[2],
        customer: customerID,
        nseats: seats,
    };

    const insertReservation = async () => {  
        try {
            data.customer = customerID;
            data.nseats = seats;       
            let response = await fetch("http://localhost:5000/api/reservations", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            response = await response.json();
            
            if (response.message === "Success") {
                setSuccess(true);
            } else {
                setError(true);
                setErrorValue(response.message);
            }

        } catch (err) {
            console.error(err.message);
        }
    };

    const retry = () => {
        setError(false);
        setSuccess(false);
        setCustomerName(customersList.length !== 0 ? customersList[0].name : "");
        setCustomerID(customersList.length !== 0 ? customersList[0].id : -1);
    }

    const pickCustomer = (idx) => {
        setCustomerID(customers[idx].id);
        setCustomerName(customers[idx].name);
    }

    const closeWindow = () => {
        showHideAddReservation("");
    }

    if (error === false && success === false) {
        return (
            <div id="reservation-window">
                <div className="reservation-container">
                    <div className="reservation-row">
                        <h3>Book table # {String(Number(data.table)+1)} for {data.date.toISOString().slice(0,10)}</h3>
                    </div>
                    <div className="reservation-row">
                        <h4>Time: {timeZone[data.time]}</h4>
                    </div>
                    <div className="reservation-row">
                    <label htmlFor="email">Email: </label>
                    <select name="user-email" className="customer-select" onChange={(e) =>pickCustomer(e.target.value)}>
                    {customers.length===0 ? (<option value="">No customers available</option>): 
                                            (customers.map(
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
                        customerName === "" ? ("") : (customerName)} 
                        onChange={(e) => setCustomerName(e.target.value)} required 
                        disabled={true}>
                    </input>
                    </div>
                    <div className="reservation-row">
                        <label htmlFor="seats">People: </label>
                        <select name="seats" className="customer-select" onChange={e => setSeats(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div className="reservation-row">
                        <button className="customer-button" name="submit" onClick={()=>insertReservation()}>Add Reservation</button>
                        <button className="btn-delete" name="closewindow" onClick={() => closeWindow()}>Close Window</button>
                    </div>
                </div>
            </div>
        );
    } else if (success===true) {
        return (
            <div id="reservation-window">
                <div className="reservation-container">
                    <div className="reservation-row">
                        <h3>Book table # {String(Number(data.table)+1)} for {data.date.toISOString().slice(0,10)}</h3>
                    </div>
                    <div className="reservation-row">
                        <h4>Time: {timeZone[data.time]}</h4>
                    </div>
                    <div className="reservation-row">
                        Successfully reserved for {seats} people.<br /> 
                        Customer: {customerName}
                    </div>
                    <div className="reservation-row">
                        <button className="customer-button" name="closewindow" onClick={() => closeWindow()}>Close Window</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div id="reservation-window">
                <div className="reservation-container">
                    <div className="reservation-row">
                        <h3>Book table # {String(Number(data.table)+1)} for {data.date.toISOString().slice(0,10)}</h3>
                    </div>
                    <div className="reservation-row">
                        Something went wrong:<br />
                        <ul>
                            {errorValue.map((err, idx) => {
                                return (<li key={"err"+idx}>{err}</li>)
                            })}
                        </ul>     
                    </div>
                    <div className="reservation-row">
                        <button className="customer-button" name="submit" onClick={()=>retry()}>Retry</button>
                        <button className="btn-delete" name="closewindow" onClick={() => closeWindow()}>Close Window</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddReservation;