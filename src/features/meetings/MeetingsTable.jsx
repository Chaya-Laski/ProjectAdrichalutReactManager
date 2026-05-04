
import React, { useEffect, useState } from "react";
export default function MeetingsTable({ data = [], onEdit, onDelete }) {
  // אם data לא הוא מערך, או שהוא ריק'

  if (!Array.isArray(data)) {
    return <div>לא נמצאו פגישות</div>;
  }
  

  return (
    <table className="table fade-in">
      <thead>
        <tr>
          <th>לקוח</th>
          <th>תאריך</th>
          {<th>משעה</th> }
          { <th>עד שעה</th> }
          <th>סטטוס</th>
          <th>פעולות</th>
        </tr>
      </thead>

      <tbody>
        {data.length > 0 ? (
          data.map((m) => (
            <tr key={m.meetingId}>
              <td>{m.customerName}</td>
              <td>{m.date}</td>
              { <td>{m.fromHour}</td> }
              { <td>{m.toHour}</td> }
              <td>{m.status ? "בוצע" : "ממתין"}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(m)}>
                  עריכה
                </button>
                <button className="delete-btn" onClick={() => onDelete(m.meetingId)}>
                  מחיקה
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">לא נמצאו פגישות</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}