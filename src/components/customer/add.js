import React, { useState } from 'react';

function AddCustomer ({ customersList, refreshCustomers, showHideAlert}) {
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    
    const addCustomer = async () => {
        let data = {name: customerName, email: customerEmail};
        let response = await fetch("http://localhost:5000/api/customer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        });
        response = await response.json();
        if (response.message === "Success") {
            showHideAlert("Success", response);
            refreshCustomers([...customersList,response.data]);
        } else {
            showHideAlert("Error", response);
        }
    }

    return (
        <div>
                <label htmlFor="name">Name: </label>
                <input className="customer-input" type="text" id="name" name="name" onChange={(e) => setCustomerName(e.target.value)}></input>
                <label htmlFor="email">Email: </label>
                <input className="customer-input" type="text" id="email" name="email" onChange={(e) => setCustomerEmail(e.target.value)}></input>
                <button className="customer-button" name="submit" onClick={addCustomer}>ADD CUSTOMER</button>
        </div>
    )
}

export default AddCustomer;