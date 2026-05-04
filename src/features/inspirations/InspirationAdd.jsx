
import React, { useState } from "react";
import { addInspiration } from "../../services/inspirationsService";

export default function InspirationAdd({ onClose, onSaved }) {

  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    style: "",
    description: ""
  });

  const save = async () => {
    await addInspiration(form);
    onSaved();
    onClose();
  };

  return (
    <div className="modal">

      <div className="modal-card">

        <h2>הוספת השראה</h2>

        <input placeholder="כותרת"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })} />

        <input placeholder="קישור תמונה"
          onChange={(e) =>
            setForm({ ...form, imageUrl: e.target.value })} />

        <input placeholder="סגנון"
          onChange={(e) =>
            setForm({ ...form, style: e.target.value })} />

        <input placeholder="תיאור"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })} />

        <button className="primary-btn" onClick={save}>
          שמירה
        </button>

        <button onClick={onClose}>
          ביטול
        </button>

      </div>

    </div>
  );
}
