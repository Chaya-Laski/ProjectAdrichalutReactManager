
// import React, { useState } from "react";
// import { addMeeting } from "../../services/meetingsService";

// // export default function MeetingAdd({ onClose, onSaved }) {

// //   const [form, setForm] = useState({
// //     customerId: "",
// //     date: "",
// //     fromHour: "",
// //     toHour: ""
// //   });

//   // const save = async () => {
//   //   await addMeeting(form);
//   //   onSaved();
//   //   onClose();
//   // };

// // const save = async () => {
// //   console.log("anhrv");
// //   console.log(form);
  
  
// //   await addMeeting(form);

// //   if (onSaved) {
// //     await onSaved(); // רענון הלוח מיד
// //   }

// //   onClose();
// // };

// //   return (
// //     <div className="modal">

// //       <div className="modal-card">

// //         <h2>הוספת פגישה</h2>

// //         <input placeholder="קוד לקוח"
// //           onChange={(e) =>
// //             setForm({ ...form, customerId: e.target.value })} />

// //         <input type="date"
// //           onChange={(e) =>
// //             setForm({ ...form, date: e.target.value })} />

// //         <input type="time"
// //           onChange={(e) =>
// //             setForm({ ...form, fromHour: e.target.value })} />

// //         <input type="time"
// //           onChange={(e) =>
// //             setForm({ ...form, toHour: e.target.value })} />

// //         <button className="primary-btn" onClick={save}>
// //           שמירה
// //         </button>

// //         <button onClick={onClose}>
// //           ביטול
// //         </button>

// //       </div>

// //     </div>
// //   );
// // }
// import React, { useState } from "react";
// import { addMeeting } from "../../services/meetingsService";

// export default function MeetingAdd({ onClose, onSaved }) {

//   const [form, setForm] = useState({
//     customerId: 0,
//     date: "",
//     fromHour: "",
//     toHour: "",
//     status: "",
//     description: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm(prev => ({
//       ...prev,
//       [name]: name === "customerId" ? Number(value) : value
//     }));
//   };

//   const save = async () => {
//   const payload = {
//   customerId: Number(form.customerId),
//   customerName: form.customerName || "",
//   date: form.date,
//   fromHour: form.fromHour || "",
//   toHour: form.toHour || "",
//   status: form.status || "",
//   description: form.description || ""
// };

//   console.log(payload);

//   await addMeeting(payload);

//   if (onSaved) {
//     await onSaved();
//   }

//   onClose();
// };

//   return (
//     <div className="modal">
//       <div className="modal-card">

//         <h2>הוספת פגישה</h2>

//         <input
//           name="customerId"
//           placeholder="קוד לקוח"
//           onChange={handleChange}
//         />

//         <input
//           name="date"
//           type="date"
//           onChange={handleChange}
//         />

//         <input
//           name="fromHour"
//           type="time"
//           onChange={handleChange}
//         />

//         <input
//           name="toHour"
//           type="time"
//           onChange={handleChange}
//         />

//         <input
//           name="status"
//           placeholder="סטטוס"
//           onChange={handleChange}
//         />

//         <input
//           name="description"
//           placeholder="תיאור"
//           onChange={handleChange}
//         />

//         <button className="primary-btn" onClick={save}>
//           שמירה
//         </button>

//         <button onClick={onClose}>
//           ביטול
//         </button>

//       </div>
//     </div>
//   );
// // }
// import React, { useState } from "react";
// import { addMeeting } from "../../services/meetingsService";
// import { isAppointmentValid } from "./appointmentValidation"; // או אותו קובץ
// import { useEffect } from "react";

// export default function MeetingAdd({ onClose, onSaved, schedules = [], meetings = [] }) {

//   const [isValid, setIsValid] = useState(false);
//   const [form, setForm] = useState({
//     customerId: 0,
//     date: "",
//     fromHour: "",
//     toHour: "",
//     status: "",
//     description: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm(prev => ({
//       ...prev,
//       [name]: name === "customerId" ? Number(value) : value
//     }));
//   };

//   const save = async () => {

//     const canSave = isAppointmentValid({
//       date: form.date,
//       fromHour: form.fromHour,
//       toHour: form.toHour,
//       schedules,
//       meetings
//     });

//     if (!canSave) {
//       console.log("לא ניתן לקבוע תור - אין זמינות או התנגשות");
//       return;
//     }

//     const payload = {
//       customerId: Number(form.customerId),
//       customerName: form.customerName || "",
//       date: form.date,
//       fromHour: form.fromHour,
//       toHour: form.toHour,
//       status: form.status || "",
//       description: form.description || ""
//     };

//     await addMeeting(payload);

//     if (onSaved) await onSaved();
//     onClose();
//   };

//   return (
//     <div className="modal">
//       <div className="modal-card">

//         <h2>הוספת פגישה</h2>

//         <input name="customerId" placeholder="קוד לקוח" onChange={handleChange} />
//         <input name="date" type="date" onChange={handleChange} />
//         <input name="fromHour" type="time" onChange={handleChange} />
//         <input name="toHour" type="time" onChange={handleChange} />
//         <input name="status" placeholder="סטטוס" onChange={handleChange} />
//         <input name="description" placeholder="תיאור" onChange={handleChange} />

//         <button className="primary-btn" onClick={save}>
//           שמירה
//         </button>

//         <button onClick={onClose}>
//           ביטול
//         </button>

//       </div>
//     </div>
//   );
// // }
// import React, { useState, useEffect } from "react";
// import { addMeeting } from "../../services/meetingsService";
// import { isAppointmentValid } from "./appointmentValidation";

// /* ------------------ helpers ------------------ */

// const toMinutes = (t) => {
//   const [h, m] = t.split(":").map(Number);
//   return h * 60 + m;
// };

// const toTime = (min) => {
//   const h = String(Math.floor(min / 60)).padStart(2, "0");
//   const m = String(min % 60).padStart(2, "0");
//   return `${h}:${m}`;
// };

// const overlaps = (aStart, aEnd, bStart, bEnd) => {
//   return aStart < bEnd && aEnd > bStart;
// };

// /* ------------------ component ------------------ */

// export default function MeetingAdd({
//   onClose,
//   onSaved,
//   schedules = [],
//   meetings = []
// }) {

//   const [form, setForm] = useState({
//     customerId: 0,
//     date: "",
//     status: "",
//     description: ""
//   });

//   const [slots, setSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [isValid, setIsValid] = useState(false);

//   /* ------------------ build available slots ------------------ */

//   useEffect(() => {
//     if (!form.date) return;

//     const dayOfWeek = new Date(form.date).getDay();

//     const daySchedules = schedules.filter(
//       s => Number(s.DayOfWeek) === dayOfWeek
//     );

//     let generatedSlots = [];

//     daySchedules.forEach(s => {
//       let start = toMinutes(s.FromHour);
//       const end = toMinutes(s.ToHour);

//       while (start + 60 <= end) {

//         const slotStart = start;
//         const slotEnd = start + 60;

//         const conflict = meetings.some(m => {
//           if (m.Date !== form.date) return false;

//           return overlaps(
//             slotStart,
//             slotEnd,
//             toMinutes(m.FromHour),
//             toMinutes(m.ToHour)
//           );
//         });

//         if (!conflict) {
//           generatedSlots.push({
//             start: slotStart,
//             end: slotEnd
//           });
//         }

//         start += 30; // גריד של חצי שעה
//       }
//     });

//     setSlots(generatedSlots);
//     setSelectedSlot(null);

//   }, [form.date, schedules, meetings]);

//   /* ------------------ validation ------------------ */

//   useEffect(() => {
//     if (!selectedSlot || !form.date) {
//       setIsValid(false);
//       return;
//     }

//     const result = isAppointmentValid({
//       date: form.date,
//       fromHour: toTime(selectedSlot.start),
//       toHour: toTime(selectedSlot.end),
//       schedules,
//       meetings
//     });

//     setIsValid(result);

//   }, [selectedSlot, form.date, schedules, meetings]);

//   /* ------------------ save ------------------ */

//   const save = async () => {
//     if (!isValid || !selectedSlot) return;

//     const payload = {
//       customerId: Number(form.customerId),
//       date: form.date,
//       fromHour: toTime(selectedSlot.start),
//       toHour: toTime(selectedSlot.end),
//       status: form.status || "",
//       description: form.description || ""
//     };

//     await addMeeting(payload);

//     if (onSaved) await onSaved();
//     onClose();
//   };

//   /* ------------------ UI ------------------ */

//   return (
//     <div className="modal">
//       <div className="modal-card">

//         <h2>הוספת פגישה</h2>

//         <input
//           placeholder="קוד לקוח"
//           onChange={(e) =>
//             setForm(prev => ({
//               ...prev,
//               customerId: Number(e.target.value)
//             }))
//           }
//         />

//         <input
//           type="date"
//           onChange={(e) =>
//             setForm(prev => ({
//               ...prev,
//               date: e.target.value
//             }))
//           }
//         />

//         <input
//           placeholder="סטטוס"
//           onChange={(e) =>
//             setForm(prev => ({
//               ...prev,
//               status: e.target.value
//             }))
//           }
//         />

//         <input
//           placeholder="תיאור"
//           onChange={(e) =>
//             setForm(prev => ({
//               ...prev,
//               description: e.target.value
//             }))
//           }
//         />

//         {/* ------------------ slots UI ------------------ */}

//         <div style={{ marginTop: 15 }}>
//           <h4>בחר שעה פנויה</h4>

//           {slots.length === 0 && (
//             <div style={{ color: "red" }}>
//               אין שעות פנויות ביום זה
//             </div>
//           )}

//           <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//             {slots.map((s, i) => (
//               <button
//                 key={i}
//                 onClick={() => setSelectedSlot(s)}
//                 style={{
//                   padding: 8,
//                   border:
//                     selectedSlot === s
//                       ? "2px solid green"
//                       : "1px solid gray",
//                   background: "white",
//                   cursor: "pointer"
//                 }}
//               >
//                 {toTime(s.start)} - {toTime(s.end)}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ------------------ status ------------------ */}

//         <div style={{ marginTop: 10 }}>
//           {selectedSlot ? (
//             <span style={{ color: isValid ? "green" : "red" }}>
//               {isValid ? "✓ ניתן לקבוע תור" : "✗ לא תקין"}
//             </span>
//           ) : (
//             <span>יש לבחור שעה</span>
//           )}
//         </div>

//         {/* ------------------ actions ------------------ */}

//         <button
//           className="primary-btn"
//           onClick={save}
//           disabled={!isValid}
//         >
//           שמירה
//         </button>

//         <button onClick={onClose}>
//           ביטול
//         </button>

//       </div>
//     </div>
//   );
// // }
// import React, { useEffect, useState } from "react";
// import { addMeeting } from "../../services/meetingsService";
// import { getSchedules } from "../../services/schedulesService";
// import { getMeetings } from "../../services/meetingsService";
// import { generateAvailableSlots } from "../calendar_1/CalendarSlots";
// import CalendarSlots from "../calendar_1/CalendarSlots";

// export default function MeetingAdd({ onClose, onSaved }) {

//   const [form, setForm] = useState({
//     customerId: 0,
//     date: "",
//     status: "",
//     description: ""
//   });

//   const [schedules, setSchedules] = useState([]);
//   const [meetings, setMeetings] = useState([]);

//   const [slots, setSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   /* ---------------- load data ---------------- */

//   useEffect(() => {
//     getSchedules().then(setSchedules);
//     getMeetings().then(setMeetings);
//   }, []);

//   /* ---------------- generate slots ---------------- */

//   useEffect(() => {
//     const result = generateAvailableSlots({
//       date: form.date,
//       schedules,
//       meetings
//     });

//     setSlots(result);
//     setSelectedSlot(null);

//   }, [form.date, schedules, meetings]);

//   /* ---------------- save ---------------- */

//   const save = async () => {
//     if (!selectedSlot) return;

//     const payload = {
//       customerId: Number(form.customerId),
//       date: form.date,
//       fromHour: selectedSlot.label.split(" - ")[0],
//       toHour: selectedSlot.label.split(" - ")[1],
//       status: form.status,
//       description: form.description
//     };

//     await addMeeting(payload);
//     onSaved?.();
//     onClose();
//   };

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="modal">
//       <div className="modal-card">

//         <h2>יצירת פגישה</h2>

//         <input
//           placeholder="קוד לקוח"
//           onChange={(e) =>
//             setForm({ ...form, customerId: e.target.value })
//           }
//         />

//         <input
//           type="date"
//           onChange={(e) =>
//             setForm({ ...form, date: e.target.value })
//           }
//         />

//         <input
//           placeholder="סטטוס"
//           onChange={(e) =>
//             setForm({ ...form, status: e.target.value })
//           }
//         />

//         <input
//           placeholder="תיאור"
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//         />

//         <h4>בחר שעה פנויה (90 דקות)</h4>

//         <CalendarSlots
//           slots={slots}
//           selected={selectedSlot}
//           onSelect={setSelectedSlot}
//         />

//         <button
//           onClick={save}
//           disabled={!selectedSlot}
//         >
//           שמירה
//         </button>

//         <button onClick={onClose}>
//           ביטול
//         </button>

//       </div>
//     </div>
//   );
// // }
import React, { useEffect, useState } from "react";
import { addMeeting } from "../../services/meetingsService";
import { getSchedules } from "../../services/weeklySchedulesService";
import { getMeetings } from "../../services/meetingsService";
import { generateAvailableSlots } from "../scheduler/availabilityEngine";
import CalendarSlots from "../calendar/CalendarSlots";

export default function MeetingAdd({ onClose, onSaved }) {

  const [form, setForm] = useState({
    customerId: 0,
    date: "",
    status: "",
    description: ""
  });

  const [schedules, setSchedules] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  /* ---------------- load data ---------------- */

  useEffect(() => {
    getSchedules().then(setSchedules);
    getMeetings().then(setMeetings);
  }, []);

  /* ---------------- generate slots ---------------- */

  // useEffect(() => {
  //   const result = generateAvailableSlots({
  //     date: form.date,
  //     schedules,
  //     meetings
  //   });

  //   setSlots(result);
  //   setSelectedSlot(null);

  // }, [form.date, schedules, meetings]);

  /* ---------------- save ---------------- */

  const save = async () => {
    if (!selectedSlot) return;

    const payload = {
      customerId: Number(form.customerId),
      date: form.date,
      fromHour: selectedSlot.label.split(" - ")[0],
      toHour: selectedSlot.label.split(" - ")[1],
      status: form.status,
      description: form.description
    };

    await addMeeting(payload);
    onSaved?.();
    onClose();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="modal">
      <div className="modal-card">

        <h2>יצירת פגישה</h2>

        <input
          placeholder="קוד לקוח"
          onChange={(e) =>
            setForm({ ...form, customerId: e.target.value })
          }
        />

        <input
          type="date"
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <input
          placeholder="סטטוס"
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        />

        <input
          placeholder="תיאור"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <h4>בחר שעה פנויה (90 דקות)</h4>

        <CalendarSlots
          slots={slots}
          selected={selectedSlot}
          onSelect={setSelectedSlot}
        />

        <button
          onClick={save}
          disabled={!selectedSlot}
        >
          שמירה
        </button>

        <button onClick={onClose}>
          ביטול
        </button>

      </div>
    </div>
  );
}



//------------------------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import { addMeeting, getMeetings } from "../try/api/meetingsService";
// import { getSchedules } from "../try/api/schedulesService";
// import { generateSlots } from "../try/scheduler/availabilityEngine";
// import CalendarGrid from "../try/components/calendar/CalendarGrid";

// export default function MeetingAdd({ onClose, onSaved }) {

//   const [form, setForm] = useState({
//     customerId: 0,
//     date: "",
//     status: "",
//     description: ""
//   });

//   const [slots, setSlots] = useState([]);
//   const [selected, setSelected] = useState(null);

//   const [meetings, setMeetings] = useState([]);
//   const [schedules, setSchedules] = useState([]);

//   /* ---------------- load data ---------------- */

//   useEffect(() => {
//     getMeetings().then(setMeetings);
//     getSchedules().then(setSchedules);
//   }, []);

//   /* ---------------- generate slots ---------------- */

//   useEffect(() => {
//     const result = generateSlots({
//       date: form.date,
//       schedules,
//       meetings
//     });

//     setSlots(result);
//     setSelected(null);

//   }, [form.date, schedules, meetings]);

//   /* ---------------- save ---------------- */

//   const save = async () => {
//     if (!selected) return;

//     await addMeeting({
//       customerId: Number(form.customerId),
//       date: form.date,
//       fromHour: selected.label.split(" - ")[0],
//       toHour: selected.label.split(" - ")[1],
//       status: form.status,
//       description: form.description
//     });

//     onSaved?.();
//     onClose();
//   };

//   return (
//     <div className="modal">
//       <div className="modal-card">

//         <h2>יצירת פגישה</h2>

//         <input
//           placeholder="לקוח"
//           onChange={(e) =>
//             setForm({ ...form, customerId: e.target.value })
//           }
//         />

//         <input
//           type="date"
//           onChange={(e) =>
//             setForm({ ...form, date: e.target.value })
//           }
//         />

//         <input
//           placeholder="סטטוס"
//           onChange={(e) =>
//             setForm({ ...form, status: e.target.value })
//           }
//         />

//         <input
//           placeholder="תיאור"
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//         />

//         <h4>בחר שעה (90 דקות)</h4>

//         <CalendarGrid
//           slots={slots}
//           selected={selected}
//           onSelect={setSelected}
//         />

//         <button disabled={!selected} onClick={save}>
//           שמירה
//         </button>

//         <button onClick={onClose}>
//           ביטול
//         </button>

//       </div>
//     </div>
//   );
// }