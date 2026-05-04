import React from "react";

export default function InspirationsTable({ data = [], onEdit, onDelete }) {
  // אם data לא הוא מערך, או שהוא ריק
  if (!Array.isArray(data)) {
    return <div>לא נמצאו השראות</div>;
  }

  return (
    <table className="table fade-in">
      <thead>
        <tr>
          <th>תמונה</th>
          <th>כותרת</th>
          <th>סגנון</th>
          <th>תיאור</th>
          <th>פעולות</th>
        </tr>
      </thead>

      <tbody>
        {data.length > 0 ? (
          data.map((i) => (
            <tr key={i.inspirationId}>
              <td>
                <img src={i.imageUrl} alt="" className="img" />
              </td>

              <td>{i.title}</td>
              <td>{i.style}</td>
              <td>{i.description}</td>

              <td>
                <button className="edit-btn" onClick={() => onEdit(i)}>
                  עריכה
                </button>

                <button
                  className="delete-btn"
                  onClick={() => onDelete(i.inspirationId)}
                >
                  מחיקה
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">לא נמצאו השראות</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}