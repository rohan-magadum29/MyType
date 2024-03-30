import React, { useState } from "react";

import TimerContext from "./TimerContext";

const TimerContextProvider = ({children}) => {
    const [selectedTime,setSelectedTime] = useState(10);
    return (
        <TimerContext.Provider value={{selectedTime,setSelectedTime}}>
            {children}
        </TimerContext.Provider>
    )
}

export default TimerContextProvider;