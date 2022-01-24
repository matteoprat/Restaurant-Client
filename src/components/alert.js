import React from "react";

function AlertWindow({ alertType, alertData, showHideAlert }) {

    function closeMe() {
        showHideAlert("","");
    }

    switch(alertType) {

        case "Error":
            
            return (
                <div className="alert-window">
                    <div className="inner-alert alert-warning">
                        {alertData.message.map((mess, idx) => {
                            return <div key={"errmsg"+idx}>{mess}</div>
                        })}
                        <div>&nbsp;</div>
                        <button name="close" value="close" onClick={closeMe}>CLOSE</button>
                    </div>
                </div>
            )
        
        case "Success":
            return (
                <div className="alert-window">
                    <div className="inner-alert alert-info">
                        {alertData.message}
                        <div>&nbsp;</div>
                        <button name="close" value="close" onClick={closeMe}>CLOSE</button>
                    </div>
                </div>
            )
 
        default:
            return (
                <div className="alert-notype">

                </div>
            );
    }

};

export default AlertWindow;

