
import React, { useState } from "react";
import { updateSchedule } from "../../services/weeklySchedulesService";

export default function WeeklyEdit({ item, onClose, onSaved }) {

  const [form, setForm] = useState(item);

  const save = async () => {
    await updateSchedule(form);
    onSaved();
    onClose();
  };

  return (
    <div className="modal">

      <div className="modal-card">

        <h2>עריכת זמינות</h2>

        <input
          value={form.dayOfWeek}
          onChange={(e) =>
            setForm({ ...form, dayOfWeek: e.target.value })}
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
