

import React, { useEffect, useState } from "react";
import {
  getMeetings,
  deleteMeeting
} from "../../services/meetingsService";

import MeetingsTable from "./MeetingsTable";
import MeetingAdd from "./MeetingAdd";
import MeetingEdit from "./MeetingEdit";
import "../styles/meetings.css";

export default function MeetingsPage() {

  const [data, setData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const load = async () => {
    const res = await getMeetings();
    console.log("הגעתי לכאן הבאתי את הנתונים");
    
    console.log(res);
    
    setData(res);
  };

  useEffect(() => {
    load();
  }, []);

  // 🔴 מחיקה
  const handleDelete = async (id) => {
    await deleteMeeting(id);
    load(); // רענון אחרי מחיקה
  };

  return (
    <div className="page">

      <div className="page-header">
        <h1>פגישות</h1>

        <button className="primary-btn"
          onClick={() => setAddOpen(true)}>
          + הוספת פגישה
        </button>
      </div>
      <MeetingsTable
        data={data}
        onEdit={setEditItem}
        onDelete={handleDelete}
      />

      {addOpen && (
        <MeetingAdd
          onClose={() => setAddOpen(false)}
          onSaved={load}
        />
      )}

      {editItem && (
        <MeetingEdit
          item={editItem}
          onClose={() => setEditItem(null)}
          onSaved={load}
        />
      )}

    </div>
  );
}
