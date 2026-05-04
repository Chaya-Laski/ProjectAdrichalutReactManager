
// import React, { useState } from "react";
// import { addSchedule } from "../../services/weeklySchedulesService";

// export default function WeeklyAdd({ onClose, onSaved }) {

//   // const [form, setForm] = useState({
//   //   dayOfWeek: "",
//   //   fromHour: "",
//   //   toHour: ""
//   // });

// const [form, setForm] = useState({
//     dayOfWeek: "",
//     fromHour: "",
//     toHour: ""
//   });

//   const save = async () => {
//     await addSchedule(form);
//     onSaved();
//     onClose();
//   };

//   return (
//     <div className="modal">

//       <div className="modal-card">

//         <h2>הוספת זמינות</h2>

//         <input placeholder="יום בשבוע"
//           onChange={(e) =>
//             setForm({ ...form, dayOfWeek: e.target.value })} />

//          <input type="string"
//           onChange={(e) =>
//             setForm({ ...form, fromHour: e.target.value })} />

//         <input type="string"
//           onChange={(e) =>
//             setForm({ ...form, toHour: e.target.value })} /> 

//         <button className="primary-btn" onClick={save}>
//           שמירה
//         </button>

//         <button onClick={onClose}>
//           ביטול
//         </button>

//       </div>

//     </div>
//   );
// }
import React, { useState } from "react";
import { addSchedule, getSchedules } from "../../services/weeklySchedulesService";

export default function WeeklyAdd({ onClose, onSaved }) {

  const [form, setForm] = useState({
    dayOfWeek: "",
    fromHour: "",
    toHour: ""
  });

  // המרת יום לשם/מספר
  const daysMap = {
    "ראשון": 0,
    "שני": 1,
    "שלישי": 2,
    "רביעי": 3,
    "חמישי": 4,
    "שישי": 5,
    "מוצאי שבת": 6
  };

  const convertToMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  // בדיקת חפיפה
  const hasOverlap = (existing, newFrom, newTo, day) => {
    const newStart = convertToMinutes(newFrom);
    const newEnd = convertToMinutes(newTo);

    return existing.some(s => {
      if (s.dayOfWeek !== day) return false;

      const start = convertToMinutes(s.fromHour);
      const end = convertToMinutes(s.toHour);

      return newStart < end && newEnd > start;
    });
  };

  const save = async () => {

    const all = await getSchedules();

    const dayNum = daysMap[form.dayOfWeek];

    // בדיקת כפילות
    if (hasOverlap(all, form.fromHour, form.toHour, dayNum)) {
      alert("יש כבר טווח שעות שחופף ביום הזה");
      return;
    }

    const payload = {
      dayOfWeek: dayNum,
      fromHour: form.fromHour,
      toHour: form.toHour
    };

    await addSchedule(payload);

    if (onSaved) await onSaved();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-card">

        <h2>הוספת זמינות</h2>

        {/* יום בשבוע */}
        <select
          onChange={(e) =>
            setForm({ ...form, dayOfWeek: e.target.value })}
        >
          <option>בחר יום</option>
          {Object.keys(daysMap).map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        {/* שעות */}
        <input
          type="time"
          onChange={(e) =>
            setForm({ ...form, fromHour: e.target.value })}
        />

        <input
          type="time"
          onChange={(e) =>
            setForm({ ...form, toHour: e.target.value })}
        />

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