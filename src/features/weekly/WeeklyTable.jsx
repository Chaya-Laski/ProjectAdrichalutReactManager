import React from "react";

export default function WeeklyTable({ data = [], onEdit, onDelete }) {
  // אם data לא הוא מערך, או שהוא ריק
  if (!Array.isArray(data)) {
    return <div>לא נמצאו נתונים לשבוע</div>;
  }
const days = ["ראשון","שני","שלישי","רביעי","חמישי","שישי","מוצאי שבת"];
  return (
    <table className="table fade-in">
      <thead>
        <tr>
          <th>יום</th>
          <th>משעה</th>
          <th>עד שעה</th>
          <th>פעולות</th>
        </tr>
      </thead>

      <tbody>
        {data.length > 0 ? (
          data.map((w) => (
            <tr key={w.id}>
              {/* <td>{w.dayOfWeek}</td> */}
              <td>{days[w.dayOfWeek]}</td>
              <td>{w.fromHour}</td>
              <td>{w.toHour}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(w)}>
                  עריכה
                </button>
                <button className="delete-btn" onClick={() => onDelete(w.id)}>
                  מחיקה
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">לא נמצאו נתונים לשבוע</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}