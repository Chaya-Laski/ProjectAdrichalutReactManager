

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMeetings,
  deleteMeeting
} from "../../services/meetingsService";

import MeetingsTable from "./MeetingsTable";
import MeetingEdit from "./MeetingEdit";
import "../styles/meetings.css";

export default function MeetingsPage() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
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

        <button
          className="primary-btn"
          onClick={() => navigate("/meetings/add")}
        >
          + הוספת פגישה
        </button>
      </div>
      <MeetingsTable
        data={data}
        onEdit={setEditItem}
        onDelete={handleDelete}
      />

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

