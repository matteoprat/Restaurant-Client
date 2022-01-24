import React, { useState } from 'react';
import AddCustomer from './customer/add';
import EditCustomer from './customer/edit';
import DeleteCustomer from './customer/delete';

function CustormerMask({ customersList, refreshCustomers, showHideAlert, setLoadedReservations}) {
    const [option, setOption] = useState("add");
   

    function loadMask() {
        if (option === "add") {
            return ( <AddCustomer customersList={customersList} refreshCustomers={refreshCustomers} showHideAlert={showHideAlert}/>);
        }
        if (option === "edit") {
            return ( <EditCustomer customersList={customersList} refreshCustomers={refreshCustomers} showHideAlert={showHideAlert}/>);
        }
        if (option === "delete") {
            return ( <DeleteCustomer customersList={customersList} refreshCustomers={refreshCustomers} showHideAlert={showHideAlert} setLoadedReservations={setLoadedReservations} />);
        }
    }

    return (
        <section id="customer-section">
            <div id="customer-box">
            <select className="customer-select" name="action" onChange={(e) => setOption(e.target.value)}>
                <option value="add">add customer</option>
                <option value="edit">edit customer</option>
                <option value="delete">delete customer</option>
            </select>
            <div>{loadMask()}</div>
            </div>
        </section>
    )
};

export default CustormerMask;