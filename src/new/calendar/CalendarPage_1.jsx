import React, { useEffect, useState } from "react";
import { getMeetings } from "../api/meetings";
import { getSchedules } from "../api/schedules";

import WeeklyCalendar from "./WeeklyCalendar";
import MeetingModal from "../meetings/MeetingModal";

export default function CalendarPage_1() {
console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhj");

  const [meetings, setMeetings] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getMeetings().then(setMeetings);
    getSchedules().then(setSchedules);
  }, []);

  const days = Array.from({ length: 7 }, (_, i) => {

    const date = new Date();
    date.setDate(date.getDate() + i);

    const iso = date.toISOString().split("T")[0];

    const count = meetings.filter(m => m.Date === iso).length;

    return {
      date: iso,
      label: date.toDateString(),
      count,
      hasMeeting: count > 0
    };
  });

  return (
    <div>
<p>44444444444444444444444444444444</p>
      <WeeklyCalendar
        days={days}
        onSelect={setSelected}
      />

      {selected && (
        <MeetingModal
          date={selected}
          meetings={meetings}
          schedules={schedules}
          refresh={() => getMeetings().then(setMeetings)}
          onClose={() => setSelected(null)}
        />
      )}

    </div>
  );
}