
import React, { useEffect, useState } from "react";
import { updateMeeting } from "../../services/meetingsService";

export default function MeetingEdit({ item, onClose, onSaved }) {

  const [form, setForm] = useState(item);

  const save = async () => {
    await updateMeeting(form);
    onSaved();
    onClose(); 
  };

  return (
    <div className="modal">

      <div className="modal-card">

        <h2>עריכת פגישה</h2>

        <input
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })}
        />

        <input
          value={form.fromHour}
          onChange={(e) =>
            setForm({ ...form, fromHour: e.target.value })}
        />

        <input
          value={form.toHour}
          onChange={(e) =>
            setForm({ ...form, toHour: e.target.value })}
        />

        <button className="primary-btn" onClick={save}>
          עדכון
        </button>

        <button onClick={onClose}>
          סגירה
        </button>

      </div>

    </div>
  );
}
