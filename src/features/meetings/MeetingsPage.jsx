

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getMeetings,
  deleteMeeting
} from "../../services/meetingsService";

import MeetingsTable from "./MeetingsTable";
import MeetingEdit from "./MeetingEdit";
import "../styles/meetings.css";

export default function MeetingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCustomerId = location.state?.customerFilter;
  const selectedCustomerName = location.state?.customerName;

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

  const filteredData = selectedCustomerId
    ? data.filter((meeting) => String(meeting.customerId) === String(selectedCustomerId))
    : data;

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>פגישות</h1>
          {selectedCustomerName && (
            <div className="customer-filter-banner">
              <span className="filter-label">מציג פגישות עבור</span>
              <span className="filter-name">{selectedCustomerName}</span>
              <button
                className="filter-cancel-btn"
                aria-label="ביטול סינון"
                onClick={() => navigate("/meetings", { replace: true })}
              >
                ×
              </button>
            </div>
          )}
          {selectedCustomerName && (
            <p className="page-subtitle">ניתן לבטל את הסינון באמצעות ה-x בצד.</p>
          )}
        </div>

        <div className="page-header-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/meetings/add")}
          >
            + הוספת פגישה
          </button>
        </div>
      </div>
      <MeetingsTable
        data={filteredData}
        onEdit={setEditItem}
        onDelete={handleDelete}
        onRefresh={load}
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

