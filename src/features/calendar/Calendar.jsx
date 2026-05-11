
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMeetings,
  updateMeeting
} from "../../services/meetingsService";

import "../styles/calendar.css";
export default function Calendar() {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMeetings, setSelectedMeetings] = useState([]);

  // טעינת פגישות
  const loadMeetings = async () => {
    const data = await getMeetings();
    setMeetings(data);
  };

  useEffect(() => {
    loadMeetings();
  }, []);

  // קבלת ימים בחודש
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  // פגישות לפי תאריך
  const getMeetingsByDate = (date) => {
    const d = date.toISOString().split("T")[0];
    return meetings.filter(m => m.date === d);
  };

  // לחיצה על יום
  const onDayClick = (date) => {
    const list = getMeetingsByDate(date);
    setSelectedDate(date);
    setSelectedMeetings(list);
  };

  // עדכון פגישה
  const markAsDone = async (meeting) => {
    await updateMeeting({ ...meeting, status: 1 });
    loadMeetings();
  };

  const days = getDaysInMonth();
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="calendar">
      <div className="calendar-header">
        
        <button onClick={() =>
          setCurrentDate(new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1
          ))
        }>◀</button>

        <h2>
          {currentDate.toLocaleString("he-IL", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>

        <button onClick={() =>
          setCurrentDate(new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1
          ))
        }>▶</button>
      </div>

      <div className="calendar-grid">
        {days.map((day, i) => {
          const dateStr = day.toISOString().split("T")[0];
          const dayMeetings = getMeetingsByDate(day);
          const isToday = dateStr === today;
          const isPast = day < new Date();

          return (
            <div
              key={i}
              className={`day 
                ${isToday ? "today" : ""}
                ${dayMeetings.length ? "has-meeting" : ""}
                ${isPast ? "past" : ""}
              `}
              onClick={() => onDayClick(day)}
            >
              <div>{day.getDate()}</div>

              {dayMeetings.length > 0 && (
                <div className="dot">
                  {dayMeetings.length}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* כרטיס פגישות */}
      {selectedDate && (
        <div className="modal">
          <div className="modal-card">

            <h3>
              {selectedDate.toLocaleDateString()}
            </h3>

            {selectedMeetings.map(m => (
              <div key={m.meetingId} className="meeting-item">

                <div>{m.fromHour} - {m.toHour}</div>

                <button onClick={() => markAsDone(m)}>
                  סמן כהושלם
                </button>

              </div>
            ))}

            <button onClick={() => navigate("/meetings/add")}>
              הוסף פגישה
            </button>

            <button onClick={() => setSelectedDate(null)}>
              סגור
            </button>

          </div>
        </div>
      )}

    </div>
  );
}


//לוח שנה דפים קודמים
// import React, { useEffect, useState } from "react";

// import { getMeetings, updateMeeting } from "../../services/meetingsService";
// import MeetingAdd from "./MeetingAdd";

// export default function MeetingsCalendar() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [meetings, setMeetings] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedMeetings, setSelectedMeetings] = useState([]);
//   const [showAdd, setShowAdd] = useState(false);

//   // טעינת פגישות
//   const loadMeetings = async () => {
//     const data = await getMeetings();
//     setMeetings(data);
//   };

//   useEffect(() => {
//     loadMeetings();
//   }, []);

//   // קבלת ימים בחודש
//   const getDaysInMonth = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const days = [];

//     for (let i = 1; i <= lastDay.getDate(); i++) {
//       days.push(new Date(year, month, i));
//     }

//     return days;
//   };

//   // פגישות לפי תאריך
//   const getMeetingsByDate = (date) => {
//     const d = date.toISOString().split("T")[0];
//     return meetings.filter(m => m.date === d);
//   };

//   // לחיצה על יום
//   const onDayClick = (date) => {
//     const list = getMeetingsByDate(date);
//     setSelectedDate(date);
//     setSelectedMeetings(list);
//   };

//   // עדכון פגישה
//   const markAsDone = async (meeting) => {
//     await updateMeeting({ ...meeting, status: 1 });
//     loadMeetings();
//   };

//   const days = getDaysInMonth();
//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <div className="calendar">

//       <div className="calendar-header">
//         <button onClick={() =>
//           setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
//         }>◀</button>

//         <h2>
//           {currentDate.toLocaleString("he-IL", { month: "long" })}{" "}
//           {currentDate.getFullYear()}
//         </h2>

//         <button onClick={() =>
//           setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
//         }>▶</button>
//       </div>

//       <div className="calendar-days">
//         {['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'].map((day, index) => (
//           <div key={index} className={`calendar-day ${day === 'ש' ? 'saturday' : ''}`}>
//             {day}
//           </div>
//         ))}
//       </div>

//       <div className="calendar-grid">
//         {days.map((day, i) => {
//           const dateStr = day.toISOString().split("T")[0];
//           const dayMeetings = getMeetingsByDate(day);
//           const isToday = dateStr === today;
//           const isPast = day < new Date();

//           return (
//             <div
//               key={i}
//               className={`day
//                 ${isToday ? "today" : ""}
//                 ${dayMeetings.length ? "has-meeting" : ""}
//                 ${isPast ? "past" : ""}
//               `}
//               onClick={() => onDayClick(day)}
//             >
//               <div>{day.getDate()}</div>
//               {dayMeetings.length > 0 && (
//                 <div className="dot" style={{ backgroundColor: '#006c6c' }}>
//                   {dayMeetings.map(m => m.clientName).join(", ")} {/* הצגת שם הלקוח */}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* כרטיס פגישות */}
//       {selectedDate && (
//         <div className="modal">
//           <div className="modal-card">
//             <h3>{selectedDate.toLocaleDateString()}</h3>

//             {selectedMeetings.map(m => (
//               <div key={m.meetingId} className="meeting-item">
//                 <div>{m.clientName}</div>
//                 <div>{m.fromHour} - {m.toHour}</div>
//                 <button onClick={() => markAsDone(m)}>סמן כהושלם</button>
//               </div>
//             ))}

//             <button onClick={() => setShowAdd(true)}>הוסף פגישה</button>
//             <button onClick={() => setSelectedDate(null)}>סגור</button>
//           </div>
//         </div>
//       )}

//       {/* הוספת פגישה */}
//       {showAdd && (
//         <MeetingAdd onClose={() => setShowAdd(false)} onSaved={loadMeetings} />
//       )}

//     </div>
//   );
// // }
// import React, { useEffect, useState } from "react";
// import { getMeetings, updateMeeting } from "../../services/meetingsService";
// import MeetingAdd from "./MeetingAdd";

// export default function MeetingsCalendar() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [meetings, setMeetings] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedMeetings, setSelectedMeetings] = useState([]);
//   const [showAdd, setShowAdd] = useState(false);

//   // טעינת פגישות
//   const loadMeetings = async () => {
//     const data = await getMeetings();
//     setMeetings(data);
//   };

//   useEffect(() => {
//     loadMeetings();
//   }, []);

//   // קבלת ימים בחודש
//   const getDaysInMonth = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();

//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);

//     const days = [];

//     for (let i = 1; i <= lastDay.getDate(); i++) {
//       days.push(new Date(year, month, i));
//     }

//     return days;
//   };

//   // פגישות לפי תאריך
//   const getMeetingsByDate = (date) => {
//     const d = date.toISOString().split("T")[0];
//     return meetings.filter((m) => m.date === d);
//   };

//   // לחיצה על יום
//   const onDayClick = (date) => {
//     const list = getMeetingsByDate(date);
//     setSelectedDate(date);
//     setSelectedMeetings(list);
//   };

//   // עדכון פגישה
//   const markAsDone = async (meeting) => {
//     await updateMeeting({ ...meeting, status: 1 });
//     loadMeetings();
//   };

//   const days = getDaysInMonth();
//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <div className="calendar">
//       <div className="calendar-header">
//         <button
//           onClick={() =>
//             setCurrentDate(
//               new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
//             )
//           }
//         >
//           ◀
//         </button>

//         <h2>
//           {currentDate.toLocaleString("he-IL", { month: "long" })}{" "}
//           {currentDate.getFullYear()}
//         </h2>

//         <button
//           onClick={() =>
//             setCurrentDate(
//               new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
//             )
//           }
//         >
//           ▶
//         </button>
//       </div>

//       <div className="calendar-grid">
//         {days.map((day, i) => {
//           const dateStr = day.toISOString().split("T")[0];
//           const dayMeetings = getMeetingsByDate(day);
//           const isToday = dateStr === today;
//           const isPast = day < new Date();
//           const isSaturday = day.getDay() === 6; // יום שבת

//           return (
//             <div
//               key={i}
//               className={`day 
//                 ${isToday ? "today" : ""}
//                 ${dayMeetings.length ? "has-meeting" : ""}
//                 ${isPast ? "past" : ""}
//                 ${isSaturday ? "saturday" : ""}
//               `}
//               onClick={() => onDayClick(day)}
//             >
//               <div>{day.getDate()}</div>

//               {dayMeetings.length > 0 && (
//                 <div className="dot">
//                   {dayMeetings.length}
//                   <div className="client-name">
//                     {dayMeetings[0].clientName}
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* כרטיס פגישות */}
//       {selectedDate && (
//         <div className="modal">
//           <div className="modal-card">
//             <h3>{selectedDate.toLocaleDateString()}</h3>

//             {selectedMeetings.map((m) => (
//               <div key={m.meetingId} className="meeting-item">
//                 <div>{m.fromHour} - {m.toHour}</div>
//                 <div>שם לקוח: {m.clientName}</div>
//                 <button onClick={() => markAsDone(m)}>סמן כהושלם</button>
//               </div>
//             ))}

//             <button onClick={() => setShowAdd(true)}>הוסף פגישה</button>
//             <button onClick={() => setSelectedDate(null)}>סגור</button>
//           </div>
//         </div>
//       )}

//       {/* הוספת פגישה */}
//       {showAdd && (
//         <MeetingAdd onClose={() => setShowAdd(false)} onSaved={loadMeetings} />
//       )}
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { getMeetings, updateMeeting } from "../../services/meetingsService";
// import MeetingAdd from "./MeetingAdd";

// export default function MeetingsCalendar() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [meetings, setMeetings] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedMeetings, setSelectedMeetings] = useState([]);
//   const [showAdd, setShowAdd] = useState(false);

//   // טעינת פגישות מהשרת
//   const loadMeetings = async () => {
//     const data = await getMeetings();
//     setMeetings(data);
//   };

//   useEffect(() => {
//     loadMeetings();
//   }, []);

//   // קבלת ימים בחודש
//   const getDaysInMonth = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();

//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);

//     const days = [];
//     for (let i = 1; i <= lastDay.getDate(); i++) {
//       days.push(new Date(year, month, i));
//     }

//     return days;
//   };

//   // פגישות לפי תאריך
//   const getMeetingsByDate = (date) => {
//     const d = date.toISOString().split("T")[0];
//     return meetings.filter((m) => m.date === d);
//   };

//   // לחיצה על יום
//   const onDayClick = (date) => {
//     const list = getMeetingsByDate(date);
//     setSelectedDate(date);
//     setSelectedMeetings(list);
//   };

//   // עדכון פגישה
//   const markAsDone = async (meeting) => {
//     await updateMeeting({ ...meeting, status: 1 });
//     loadMeetings();
//   };

//   const days = getDaysInMonth();
//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <div className="calendar">
//       <div className="calendar-header">
//         <button
//           onClick={() =>
//             setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
//           }
//         >
//           ◀
//         </button>

//         <h2>
//           {currentDate.toLocaleString("he-IL", { month: "long" })}{" "}
//           {currentDate.getFullYear()}
//         </h2>

//         <button
//           onClick={() =>
//             setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
//           }
//         >
//           ▶
//         </button>
//       </div>

//       {/* כותרת לוח שנה */}
//       <div className="calendar-days-header">
//         {["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"].map((day, index) => (
//           <div key={index} className="day-header">
//             {day}
//           </div>
//         ))}
//       </div>

//       {/* גריד של לוח השנה */}
//       <div className="calendar-grid">
//         {days.map((day, i) => {
//           const dateStr = day.toISOString().split("T")[0];
//           const dayMeetings = getMeetingsByDate(day);
//           const isToday = dateStr === today;
//           const isSaturday = day.getDay() === 6; // יום שבת
//           const isSunday = day.getDay() === 0; // יום ראשון

//           return (
//             <div
//               key={i}
//               className={`day
//                 ${isToday ? "today" : ""}
//                 ${isSaturday ? "saturday" : ""}
//                 ${isSunday ? "sunday" : ""}
//                 ${dayMeetings.length ? "has-meeting" : ""}`}
//               onClick={() => onDayClick(day)}
//             >
//               <div>{day.getDate()}</div>

//               {dayMeetings.length > 0 && (
//                 <div className="dot">{dayMeetings.length}</div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* כרטיס פגישות */}
//       {selectedDate && (
//         <div className="modal">
//           <div className="modal-card">
//             <h3>{selectedDate.toLocaleDateString()}</h3>

//             {selectedMeetings.map((m) => (
//               <div key={m.meetingId} className="meeting-item">
//                 <div>{m.fromHour} - {m.toHour}</div>
//                 <div>שם לקוח: {m.clientName}</div>
//                 <button onClick={() => markAsDone(m)}>סמן כהושלם</button>
//               </div>
//             ))}

//             <button onClick={() => setShowAdd(true)}>הוסף פגישה</button>
//             <button onClick={() => setSelectedDate(null)}>סגור</button>
//           </div>
//         </div>
//       )}

//       {/* הוספת פגישה */}
//       {showAdd && (
//         <MeetingAdd onClose={() => setShowAdd(false)} onSaved={loadMeetings} />
//       )}
//     </div>
//   );
// // }
// import React, { useEffect, useState } from "react";
// import { getMeetings, updateMeeting } from "../../services/meetingsService";
// import MeetingAdd from "./MeetingAdd";
// import moment from 'moment';
// import 'moment/locale/he';  // להתממשקות עברית

// export default function MeetingsCalendar() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [meetings, setMeetings] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedMeetings, setSelectedMeetings] = useState([]);
//   const [showAdd, setShowAdd] = useState(false);

//   // טעינת פגישות
//   const loadMeetings = async () => {
//     const data = await getMeetings();
//     setMeetings(data);
//   };

//   useEffect(() => {
//     loadMeetings();
//   }, []);

//   // קבלת ימים בחודש
//   const getDaysInMonth = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();

//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);

//     const days = [];
//     for (let i = 1; i <= lastDay.getDate(); i++) {
//       days.push(new Date(year, month, i));
//     }

//     return days;
//   };

//   // פגישות לפי תאריך
//   const getMeetingsByDate = (date) => {
//     const d = date.toISOString().split("T")[0];
//     return meetings.filter(m => m.date === d);
//   };

//   // לחיצה על יום
//   const onDayClick = (date) => {
//     const list = getMeetingsByDate(date);
//     setSelectedDate(date);
//     setSelectedMeetings(list);
//   };

//   // עדכון פגישה
//   const markAsDone = async (meeting) => {
//     await updateMeeting({ ...meeting, status: 1 });
//     loadMeetings();
//   };

//   const days = getDaysInMonth();
//   const today = new Date().toISOString().split("T")[0];

//   // מגדירים את התאריך הנוכחי לעברית
//   moment.locale('he');

//   return (
//     <div className="calendar">
//       <div className="calendar-header">
//         <button onClick={() =>
//           setCurrentDate(new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth() - 1
//           ))
//         }>◀</button>

//         <h2>
//           {moment(currentDate).format('MMMM YYYY')}
//         </h2>

//         <button onClick={() =>
//           setCurrentDate(new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth() + 1
//           ))
//         }>▶</button>
//       </div>

//       {/* כותרת הימים בשבוע */}
//       <div className="calendar-days-header">
//         {["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"].map((day, index) => (
//           <div key={index} className="day-header">
//             {day}
//           </div>
//         ))}
//       </div>

//       {/* גריד לוח השנה */}
//       <div className="calendar-grid">
//         {days.map((day, i) => {
//           const dateStr = day.toISOString().split("T")[0];
//           const dayMeetings = getMeetingsByDate(day);
//           const isToday = dateStr === today;
//           const isSaturday = day.getDay() === 6; // יום שבת
//           const isSunday = day.getDay() === 0; // יום ראשון

//           return (
//             <div
//               key={i}
//               className={`day
//                 ${isToday ? "today" : ""}
//                 ${isSaturday ? "saturday" : ""}
//                 ${isSunday ? "sunday" : ""}
//                 ${dayMeetings.length ? "has-meeting" : ""}
//               `}
//               onClick={() => onDayClick(day)}
//             >
//               <div>{day.getDate()}</div>

//               {dayMeetings.length > 0 && (
//                 <div className="dot">{dayMeetings.length}</div>
//               )}
//               <button className="add-button" onClick={(e) => {
//                 e.stopPropagation();
//                 setShowAdd(true);
//               }}>
//                 +
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* כרטיס פגישות */}
//       {selectedDate && (
//         <div className="modal">
//           <div className="modal-card">
//             <h3>{moment(selectedDate).format('DD/MM/YYYY')}</h3>

//             {selectedMeetings.map(m => (
//               <div key={m.meetingId} className="meeting-item">
//                 <div>{m.fromHour} - {m.toHour}</div>
//                 <div>שם הלקוח: {m.clientName}</div>
//                 <button onClick={() => markAsDone(m)}>סמן כהושלם</button>
//               </div>
//             ))}

//             <button onClick={() => setShowAdd(true)}>הוסף פגישה</button>
//             <button onClick={() => setSelectedDate(null)}>סגור</button>
//           </div>
//         </div>
//       )}

//       {/* הוספת פגישה */}
//       {showAdd && (
//         <MeetingAdd onClose={() => setShowAdd(false)} onSaved={loadMeetings} />
//       )}
//     </div>
//   );
// }
