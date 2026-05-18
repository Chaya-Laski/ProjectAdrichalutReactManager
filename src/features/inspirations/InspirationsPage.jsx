
import React, { useState, useEffect } from "react";
import InspirationsGallery from "./InspirationsGallery";
import InspirationAdd from "./InspirationAdd";
import InspirationEdit from "./InspirationEdit";
import { getInspirations, deleteInspiration } from "../../services/inspirationsService";
import "../styles/inspirations.css";

export default function InspirationsPage() {
  const [data, setData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [filterStyle, setFilterStyle] = useState("");

  const load = async () => setData(await getInspirations());
  useEffect(() => { load(); }, []);

  const handleDelete = async id => { await deleteInspiration(id); load(); };

  // יצירת רשימת סגנונות ייחודית מהנתונים
  const uniqueStyles = Array.from(new Set(data.map(item => item.style))).filter(s => s);

  const filteredData = data.filter(item => !filterStyle || item.style === filterStyle);

  return (
    <div className="page">
      <div className="page-header">
        <h1>השראות</h1>
        <select value={filterStyle} onChange={e => setFilterStyle(e.target.value)}>
          <option value="">הכל</option>
          {uniqueStyles.map((style, idx) => (
            <option key={idx} value={style}>{style}</option>
          ))}
        </select>
        <button className="primary-btn" onClick={() => setAddOpen(true)}>+ הוספת השראה</button>
      </div>

      <InspirationsGallery data={filteredData} onEdit={setEditItem} onDelete={handleDelete} />
      {addOpen && <InspirationAdd onClose={() => setAddOpen(false)} onSaved={load} />}
      {editItem && <InspirationEdit item={editItem} onClose={() => setEditItem(null)} onSaved={load} />}
    </div>
  );
}