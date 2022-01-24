import React, { useState, useEffect } from 'react';
import CustormerMask from './components/customer';
import AppHeader from './components/header';
import DisplayTables from './components/display_tables';
import AlertWindow from './components/alert';
import AddReservation from './components/tables/add_reservation';
import DeleteReservation from './components/tables/delete_reservation';
import EditReservation from './components/tables/edit_reservation';
import { buildReservationList } from './utils/utilities';
import './App.css';



function App() {
  const [customers, setCustomers] = useState({}); // customers will contain current customers, used in customer elements and add reservation window
  const [loadedCustomers, setLoadedCustomers] = useState(false);
  const [showAlertWindow, setShowAlertWindow] = useState(false);
  const [alertType, setAlertType] = useState("Error"); // Error / Message / Details
  const [alertData, setAlertData] = useState({});
  const [uniqueID, setUniqueID] = useState("");
  const [showAddReservation, setShowAddReservation] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [loadedReservations, setLoadedReservations] = useState(false);
  const [changedDates, setChangedDates] = useState(true);
  const [days, setDays] = useState(0);
  const [reservationsList, setReservationsList] = useState({});
  const [showDeleteReservation, setShowDeleteReservation] = useState(false);
  const [showEditReservation, setShowEditReservation] = useState(false);

  
  function changeCustomersList(customersList){
      // this function is passed to childs: customer, customer/add, customer/edit, customer/delete
      setCustomers([...customersList].sort((a,b) => a.email > b.email));
  }

  function showHideAlert(type, data) {
    setAlertType(type);
    setAlertData(data);
    setShowAlertWindow(showAlertWindow === false); // auto switch from false / true when called
  }

  function showHideAddReservation(uniqueID) {
    setShowAddReservation(showAddReservation === false);
    setUniqueID(uniqueID);
    loadReservations();
  }

  function showHideDeleteReservation(uniqueID) {
    setShowDeleteReservation(showDeleteReservation === false);
    setUniqueID(uniqueID);
    loadReservations();
  }

  function showHideEditReservation(uniqueID) {
    setShowEditReservation(showEditReservation === false);
    setUniqueID(uniqueID);
    loadReservations();
  }

  function changeDate(dateType, value) {
    if (dateType === "from") {
      value <= toDate ? setFromDate(value) : setFromDate(toDate);
    } else if (dateType === "to") {
      value > fromDate ? setToDate(value) : setToDate(fromDate);
    } else {
      setFromDate(value);
      setToDate(value);
    }
    setChangedDates(true);
  }

  async function loadCustomers() {
    try {
      const response = await fetch("http://localhost:5000/api/customer");
      const data = await response.json();
      setCustomers(data.result);
      setLoadedCustomers(true);
      setLoadedReservations(true);
    } catch (err) {
      console.error(err.message);
    }
  }
  
  async function loadReservations() {
    try {
      let goodFrom = fromDate.toISOString().slice(0,10);
      let goodTo = toDate.toISOString().slice(0,10);
      let response = await fetch(`http://localhost:5000/api/reservations?from=${encodeURIComponent(goodFrom)}&to=${encodeURIComponent(goodTo)}`);
      response = await response.json();
      if (response.message === "Success") {
        setLoadedReservations(true);
        setReservationsList(buildReservationList(response.data));
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
      if (loadedCustomers === false) {
          loadCustomers();
      }
  });

  useEffect(() => {
    if (loadedReservations === false) {
        loadReservations();
    }
  });

  useEffect(() => {
    if (changedDates === true) {
      setDays(Math.ceil((toDate.getTime()-fromDate.getTime())/(1000*3600*24)));
      loadReservations();
      setChangedDates(false);
    }
  });

  return (
    <div className="App">
      <AppHeader />
      <CustormerMask customersList={customers} refreshCustomers={changeCustomersList} showHideAlert={showHideAlert} setLoadedReservations={setLoadedReservations} />
      <DisplayTables fromDate={fromDate} toDate={toDate} days={days} changeDate={changeDate} 
                    reservationsList={reservationsList} showHideAddReservation={showHideAddReservation} 
                    showHideDeleteReservation={showHideDeleteReservation}
                    showHideEditReservation={showHideEditReservation} />
      {showAddReservation===true ? <AddReservation customersList={customers} showHideAlert={showHideAlert} uniqueID={uniqueID} showHideAddReservation={showHideAddReservation} /> : <></> }
      {showDeleteReservation === true ? <DeleteReservation reservationData={reservationsList[uniqueID]} showHideDeleteReservation={showHideDeleteReservation} /> : <></>}
      {showEditReservation === true ? <EditReservation customersList={customers} showHideAlert={showHideAlert} reservationData={reservationsList[uniqueID]} showHideEditReservation={showHideEditReservation} /> : <></>}
      {showAlertWindow===true ? <AlertWindow alertType={alertType}  alertData={alertData} showHideAlert={showHideAlert} /> : <></>}
      <div>&nbsp;</div>
    </div>
  );
}

export default App;
