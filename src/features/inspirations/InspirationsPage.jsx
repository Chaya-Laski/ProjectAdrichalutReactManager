
import React, { useEffect, useState } from "react";
import {
  getInspirations,
  deleteInspiration
} from "../../services/inspirationsService";

import InspirationsTable from "./InspirationsTable";
import InspirationAdd from "./InspirationAdd";
import InspirationEdit from "./InspirationEdit";

import "../styles/inspirations.css";

export default function InspirationsPage() {

  const [data, setData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const load = async () => {
    const res = await getInspirations();
    setData(res);
  };

  useEffect(() => {
    load();
  }, []);

  // 🔴 מחיקה
  const handleDelete = async (id) => {
    await deleteInspiration(id);
    load();
  };

  return (
    <div className="page">

      <div className="page-header">
        <h1>השראות</h1>

        <button className="primary-btn"
          onClick={() => setAddOpen(true)}>
          + הוספת השראה
        </button>
      </div>

      <InspirationsTable
        data={data}
        onEdit={setEditItem}
        onDelete={handleDelete}
      />

      {addOpen && (
        <InspirationAdd
          onClose={() => setAddOpen(false)}
          onSaved={load}
        />
      )}

      {editItem && (
        <InspirationEdit
          item={editItem}
          onClose={() => setEditItem(null)}
          onSaved={load}
        />
      )}

    </div>
  );
}
