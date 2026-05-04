
import React, { useState } from "react";
import { updateInspiration } from "../../services/inspirationsService";

export default function InspirationEdit({ item, onClose, onSaved }) {

  const [form, setForm] = useState(item);

  const save = async () => {
    await updateInspiration(form);
    onSaved();
    onClose();
  };

  return (
    <div className="modal">

      <div className="modal-card">

        <h2>עריכת השראה</h2>

        <input
          value={form.imageUrl}
          onChange={(e) =>
            setForm({ ...form, imageUrl: e.target.value })}
        />

        <input
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })}
        />

        <input
          value={form.style}
          onChange={(e) =>
            setForm({ ...form, style: e.target.value })}
        />

        <input
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })}
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
