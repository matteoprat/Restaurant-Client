import React, { useState } from "react";

function EditCustomer({customersList, refreshCustomers, showHideAlert}) {
    const [customerName, setCustomerName] = useState(customersList.length != 0 ? customersList[0].name : "");
    const [customerID, setCustomerID] = useState(customersList.length != 0 ? customersList[0].id : -1);
    const [customers, setCustomers] = useState([...customersList]);
    const [customerIDX, setCustomerIDX] = useState(0);
    
    const editCustomer = async () => {
        const customerData = {name: customerName};
        
        try {
            var response = await fetch("http://localhost:5000/api/customer/"+customerID, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customerData) 
            });
            response = await response.json();
            if (response.message === "Success") {
                let tmpCustomers = [...customers];
                tmpCustomers[customerIDX].name=customerName;
                setCustomers([...tmpCustomers]);
                refreshCustomers(customers);
                showHideAlert("Success", response);    
            } else {
                showHideAlert("Error", response);
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    const pickCustomer = (idx) => {
        setCustomerID(customers[idx].id);
        setCustomerName(customers[idx].name);
        setCustomerIDX(idx);
    }

    return (
        <div>
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
                <label htmlFor="name">Name: </label>
                <input className="customer-input" type="text" id="name" name="name" value={customerName === "" ? "" : customerName} onChange={(e) => setCustomerName(e.target.value)} required></input>
                {customers.length != 0 ? (
                    <button className="customer-button" name="submit" onClick={editCustomer}>EDIT CUSTOMER</button>
                ) : (
                    <button className="customer-button-disabled" name="submit" disbaled={true}>EDIT CUSTOMER</button>
                )}
        </div>
    )
}

export default EditCustomer;