
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import "../styles/calendar.css";
import CalendarGrid from "../try/components/calendar/CalendarGrid";
export default function CalendarPage() {
  
  
  return (
    <div className="page"><h1>לוח זמנים</h1>
      <div className="page-header"> 
        <Calendar/>
        <CalendarGrid/>
        {/* <CalendarPage/> */}
      </div>
    </div>
  );
};
