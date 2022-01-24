import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TablesBox from './tables/table_box';
import "react-datepicker/dist/react-datepicker.css";

function DisplayTables({fromDate, toDate, days, changeDate, reservationsList,  showHideAddReservation, showHideDeleteReservation, showHideEditReservation}) {
    
    const [simpleSearch, setSimpleSearch] = useState(true);

    const newDate = (dateType, value) => {
        changeDate(dateType, value);
    }

    const currentDay = (day) => {
        return new Date(fromDate.getTime()+(3600*24*1000*day));
    }  

    return (
        <>
        {simpleSearch === true ? (
        
            <section id="searchbox-section">
                <div id="form1">
                        <span className="exlabel">Select a day:</span>
                        <DatePicker selected={fromDate} onChange={(date) => newDate("both", date)} />
                        <button name="advanced" className="search" onClick={() => setSimpleSearch(false)}>ADVANCED OPTIONS</button>
                </div>
            </section>
        
        ) : (
        
            <section id="searchbox-section">
                <div id="form1">
                    
                        <span className="exlabel">From date:</span>
                        <DatePicker selected={fromDate} onChange={(date) => newDate("from", date)} />
                        <span className="exlabel">To date:</span>
                        <DatePicker selected={toDate} onChange={(date) => newDate("to", date)} />
                        &nbsp;&nbsp;<button className="search" name="advanced" onClick={() => setSimpleSearch(true)}>SIMPLE OPTIONS</button>
                    
                </div>
            </section>
        
        )}
        {Array.from({length: days+1}, (_, i) => i).map((idx) => {
            return (<TablesBox key={"TableBox"+String(idx)} reservationsList={reservationsList} 
                    currentDate={new Date(currentDay(idx))} day={idx} 
                    showHideAddReservation={showHideAddReservation}
                    showHideDeleteReservation={showHideDeleteReservation}
                    showHideEditReservation={showHideEditReservation}
                    />)
        }
        )}
        </>
    )
}

export default DisplayTables;