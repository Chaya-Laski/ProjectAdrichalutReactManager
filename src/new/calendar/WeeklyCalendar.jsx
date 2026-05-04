import React from "react";

export default function WeeklyCalendar({ days, onSelect }) {

  return (
    <div className="calendar-grid">

      {days.map((d) => (
        <div
          key={d.date}
          className={`day ${d.hasMeeting ? "has-meeting" : ""}`}
          onClick={() => onSelect(d.date)}
        >
          <div>{d.label}</div>

          {d.count > 0 && (
            <div className="dot">{d.count}</div>
          )}

        </div>
      ))}

    </div>
  );
}