import { addMeeting, getMeetings } from "../../services/meetingsService";
import { getSchedules } from "../../services/weeklySchedulesService";
import { generateAvailableSlots } from "../scheduler/availabilityEngine";
import { findNearestAvailableDate } from "../scheduler/availabilityHelpers";
import CalendarSlots from "../calendar/CalendarSlots";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/meetings.css";
import { useSelector } from "react-redux";

export default function MeetingAddPage() {
  const navigate = useNavigate();

  const customers = useSelector((state) => state.customers.list);

  const [form, setForm] = useState({
    customerId: "",
    date: "",
    status: "",
    description: ""
  });

  const [schedules, setSchedules] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [loadError, setLoadError] = useState(null);

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [mode, setMode] = useState("nearest");
  const [nearestResult, setNearestResult] = useState(null);
  const [modeError, setModeError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      if (!active) return;
      setLoadError(null);

      let schedulesData = [];
      let meetingsData = [];
      let errorMessage = null;

      try {
        schedulesData = await getSchedules();
      } catch (error) {
        console.error("Error loading schedules:", error.response?.status, error.response?.data || error.message);
        errorMessage = "שגיאה בטעינת זמינות השבועית";
      }

      try {
        meetingsData = await getMeetings();
      } catch (error) {
        console.error("Error loading meetings:", error.response?.status, error.response?.data || error.message);
        errorMessage = errorMessage ? `${errorMessage} וטעינת הפגישות` : "שגיאה בטעינת הפגישות";
      }

      if (!active) return;
      setSchedules(schedulesData);
      setMeetings(meetingsData);
      if (errorMessage) setLoadError(`${errorMessage} מהשרת.`);

      console.log("Data loaded:", {
        schedulesCount: schedulesData?.length,
        meetingsCount: meetingsData?.length,
        schedules: schedulesData,
        meetings: meetingsData
      });
    };

    loadData();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (mode !== "nearest") {
      setNearestResult(null);
      setModeError("");
      return;
    }

    const result = findNearestAvailableDate({
      schedules,
      meetings,
      fromDate: new Date(),
      searchDays: 30
    });

    if (result) {
      setNearestResult(result);
      setModeError("");
      setForm((prev) => ({ ...prev, date: result.date }));
    } else {
      setNearestResult(null);
      setModeError("לא נמצאו תאריכים פנויים ב-30 הימים הקרובים.");
      setForm((prev) => ({ ...prev, date: "" }));
    }
  }, [mode, schedules, meetings]);

  useEffect(() => {
    const result = generateAvailableSlots({
      date: form.date,
      schedules,
      meetings
    });

    console.log("Slots generated:", {
      formDate: form.date,
      schedulesCount: schedules?.length,
      meetingsCount: meetings?.length,
      slotsCount: result?.length,
      slots: result
    });

    setSlots(result);
    setSelectedSlot(null);
  }, [form.date, schedules, meetings]);

  const save = async () => {
    if (!selectedSlot || !form.customerId || !form.date) return;

    setSaveLoading(true);
    setSaveError("");

    try {
      const payload = {
        customerId: Number(form.customerId),
        date: form.date,
        fromHour: selectedSlot.label.split(" - ")[0],
        toHour: selectedSlot.label.split(" - ")[1],
        status: form.status,
        description: form.description
      };

      await addMeeting(payload);
      navigate("/meetings", { replace: true });
    } catch (error) {
      console.error("Error saving meeting:", error);
      setSaveError("שגיאה בשמירת הפגישה. אנא נסה שוב.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/meetings");
  };

  const handleCustomerChange = (event) => {
   const selectedCustomerId = event.target.value;
   setForm((prevForm) => ({ ...prevForm, customerId: selectedCustomerId }));
  };
  return (
    <div className="page meeting-add-page">
      <div className="page-header">
        <div className="header-top">
          <h1>יצירת פגישה חדשה</h1>
          <button 
            className="back-btn" 
            onClick={handleCancel}
            title="חזור"
          >
            ← חזור
          </button>
        </div>
      </div>

      <div className="meeting-add-container">
        {loadError && (
          <div className="alert alert-error">
            <span>⚠️</span>
            <span>{loadError}</span>
          </div>
        )}

        {saveError && (
          <div className="alert alert-error">
            <span>⚠️</span>
            <span>{saveError}</span>
          </div>
        )}

        {/* פרטי הפגישה */}
        <section className="form-section">
          <h2>פרטי הפגישה</h2>
          <div className="meeting-form-grid">
            <div className="form-group">
              <label htmlFor="customerId">
                קוד לקוח *
              </label>
              <input
                id="customerId"
                type="text"
                value={form.customerId}
                placeholder="הקלד קוד לקוח"
                onChange={(e) => setForm({ ...form, customerId: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">
                סטטוס
              </label>
              <input
                id="status"
                type="text"
                value={form.status}
                placeholder="סטטוס הפגישה"
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">
                תיאור
              </label>
              <textarea
                id="description"
                value={form.description}
                placeholder="תיאור קצר של הפגישה"
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="form-textarea"
                rows="4"
              />
            </div>
          </div>
        </section>

        {/* בחירת תאריך */}
        <section className="form-section">
          <div className="section-header">
            <h2>בחר תאריך</h2>
            <p className="section-description">בחר/י את הדרך הנוחה לך</p>
          </div>

          <div className="mode-selector">
            <button
              type="button"
              className={`mode-btn ${mode === "nearest" ? "active" : ""}`}
              onClick={() => setMode("nearest")}
            >
              <span className="mode-icon">📅</span>
              <span className="mode-label">תאריך קרוב פנוי</span>
              <span className="mode-desc">מציע לך את התאריך הקרוב הבא</span>
            </button>
            <button
              type="button"
              className={`mode-btn ${mode === "custom" ? "active" : ""}`}
              onClick={() => setMode("custom")}
            >
              <span className="mode-icon">✋</span>
              <span className="mode-label">בחירה ידנית</span>
              <span className="mode-desc">בחר תאריך לפי בחירתך</span>
            </button>
          </div>

          {mode === "nearest" && (
            <div className="nearest-result">
              {nearestResult ? (
                <div className="result-card success">
                  <div className="result-field">
                    <span className="result-label">✅ התאריך הקרוב ביותר:</span>
                    <span className="result-value">{nearestResult.date}</span>
                  </div>
                  <div className="result-field">
                    <span className="result-label">🕐 הסלוט הראשון הפנוי:</span>
                    <span className="result-value">{nearestResult.slot.label}</span>
                  </div>
                </div>
              ) : (
                <div className="result-card error">
                  <span className="result-icon">ℹ️</span>
                  <span>{modeError || "מחפש תאריכים פנויים..."}</span>
                </div>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="dateInput">
              בחר תאריך *
            </label>
            <input
              id="dateInput"
              type="date"
              value={form.date}
              onChange={(e) => {
                setForm({ ...form, date: e.target.value });
                if (mode === "nearest") setMode("custom");
              }}
              readOnly={mode === "nearest"}
              className={`form-input ${mode === "nearest" ? "readonly" : ""}`}
            />
          </div>
        </section>

        {/* בחירת שעה */}
        <section className="form-section">
          <div className="section-header">
            <h2>בחר שעה פנויה</h2>
            <p className="section-description">משך הפגישה: 90 דקות</p>
            {form.date && (
              <p className="date-info">
                تاريخ: <strong>{form.date}</strong> • סלוטים זמינים: <strong>{slots.length}</strong>
              </p>
            )}
          </div>

          {!form.date ? (
            <div className="empty-state">
              <span className="empty-icon">📭</span>
              <p>בחר תאריך כדי להציג סלוטים פנויים</p>
            </div>
          ) : slots.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🚫</span>
              <p>אין סלוטים פנויים לתאריך זה</p>
              <span className="empty-hint">נסה לבחור תאריך אחר</span>
            </div>
          ) : (
            <div className="slots-container">
              <CalendarSlots
                slots={slots}
                selected={selectedSlot}
                onSelect={setSelectedSlot}
              />
            </div>
          )}
        </section>

        {/* כפתורי פעולה */}
        <div className="form-actions">
          <button
            onClick={save}
            disabled={!selectedSlot || !form.customerId || !form.date || saveLoading}
            className="primary-btn action-btn save-btn"
          >
            {saveLoading ? "שומר..." : "שמירה ויצירת פגישה"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="secondary-btn action-btn cancel-btn"
          >
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
}
