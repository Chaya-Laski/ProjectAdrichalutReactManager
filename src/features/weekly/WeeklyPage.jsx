
import React, { useEffect, useState } from "react";
import {
  getSchedules,
  deleteSchedule
} from "../../services/weeklySchedulesService";

import WeeklyTable from "./WeeklyTable";
import WeeklyAdd from "./WeeklyAdd";
import WeeklyEdit from "./WeeklyEdit";

import "../styles/weekly.css";

export default function WeeklyPage() {

  const [data, setData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const load = async () => {
    const res = await getSchedules();
    console.log(res);
    setData(res);
  };

// const load = async () => {
//     const res = await getCustomers();
//     
//     setData(res);
//   };

  useEffect(() => {
    load();
  }, []);

  // 🔴 מחיקה
  const handleDelete = async (id) => {
    await deleteSchedule(id);
    load();
  };

  return (
    <div className="page">

      <div className="page-header">
        <h1>זמינות שבועית</h1>

        <button className="primary-btn"
          onClick={() => setAddOpen(true)}>
          + הוספת זמינות
        </button>
      </div>

      <WeeklyTable
        data={data}
        onEdit={setEditItem}
        onDelete={handleDelete}
      />

      {addOpen && (
        <WeeklyAdd
          onClose={() => setAddOpen(false)}
          onSaved={load}
        />
      )}

      {editItem && (
        <WeeklyEdit
          item={editItem}
          onClose={() => setEditItem(null)}
          onSaved={load}
        />
      )}

    </div>
  );
}
