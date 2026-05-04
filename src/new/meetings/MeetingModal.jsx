import React, { useState } from "react";
import {
  addMeeting,
  updateMeeting,
  deleteMeeting
} from "../api/meetings";

import { buildSlots } from "../engine/availability";

export default function MeetingModal({
  date,
  meetings,
  schedules,
  refresh,
  onClose
}) {

  const [selected, setSelected] = useState(null);

  const slots = buildSlots({
    date,
    meetings,
    schedules
  });

  const save = async () => {

    await addMeeting({
      Date: date,
      FromHour: selected.from,
      ToHour: selected.to
    });

    await refresh();
    onClose();
  };

  return (
    <div className="modal">

      <div className="modal-card">

        <h3>{date}</h3>

        {slots.map((s, i) => (
          <div
            key={i}
            onClick={() => s.available && setSelected(s)}
            style={{
              padding: 10,
              margin: 5,
              background: s.available ? "#e6fffa" : "#ffe5e5",
              cursor: s.available ? "pointer" : "not-allowed"
            }}
          >
            {s.from} - {s.to}
          </div>
        ))}

        <button disabled={!selected} onClick={save}>
          שמור פגישה
        </button>

        <button onClick={onClose}>
          סגור
        </button>

      </div>

    </div>
  );
}