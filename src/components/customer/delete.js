import React, { useState } from 'react';

function DeleteCustomer( {customersList, refreshCustomers, showHideAlert, setLoadedReservations}) {
    // TO FIX: it does not change the ID correctly when deleting a user

    const customers = [...customersList];
    const [customerID, setCustomerID] = useState(customersList.length !== 0 ? customersList[0].id : -1);
    
    const deleteThisCustomer = async () => {
        try {
            var response = await fetch("http://localhost:5000/api/customer/"+customerID, {
            method: 'DELETE',
            });
            response = await response.json();
            if (response.message === "Success") {
                await refreshCustomers([...customers.filter((d) => d.id !== customerID)]);
                setLoadedReservations(false);
                showHideAlert("Success", response);    
            } else {
                showHideAlert("Error", response);    
            }

        } catch (err) {
            console.error(err.message);
        }
        setCustomerID(customersList.length !== 0 ? customersList[0].id : -1);
    }
    
    return (
        <div>
            
                <label htmlFor="email">Email: </label>
                <select name="customer-email" className="customer-select" onChange={(e) =>setCustomerID(e.target.value)}>
                {customers.length === 0 ? (<option value="">No customers available</option>): 
                                        ( 
                                            customers.map(
                                            (data) => {
                                                return (<option key={data.id} value={data.id}>{data.email}</option>)
                                            })
                                        )
                }
                </select>
                {customers.length !== 0 ? ( 
                    <button className="customer-button" name="submit" onClick={deleteThisCustomer}>DELETE CUSTOMER</button>
                    ) : (
                    <button className="customer-button-disabled" name="submit" disabled={true}>DELETE CUSTOMER</button>
                )}
        </div>
    )
}

export default DeleteCustomer;