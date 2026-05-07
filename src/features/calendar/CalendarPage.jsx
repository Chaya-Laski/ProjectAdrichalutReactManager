
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import "../styles/calendar.css";
export default function CalendarPage() {
  
  
  return (
    <div className="page"><h1>לוח זמנים</h1>
      <div className="page-header"> 
        <Calendar/>
      </div>
    </div>
  );
};
