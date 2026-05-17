import { addMeeting, getMeetings } from "../../services/meetingsService";
import { getSchedules } from "../../services/weeklySchedulesService";
import { generateAvailableSlots } from "../scheduler/availabilityEngine";
import { findNearestAvailableDate } from "../scheduler/availabilityHelpers";
import CalendarSlots from "../calendar/CalendarSlots";
import { useEffect, useState } from "react";

export default function MeetingAdd({ onClose, onSaved }) {
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

    setSlots(result);
    setSelectedSlot(null);

  }, [form.date, schedules, meetings]);

  /* ---------------- save ---------------- */

  const save = async () => {
    if (!selectedSlot || !form.customerId || !form.date) return;

    const payload = {
      customerId: Number(form.customerId),
      date: form.date,
      fromHour: selectedSlot.label.split(" - ")[0],
      toHour: selectedSlot.label.split(" - ")[1],
      status: form.status,
      description: form.description
    };

    await addMeeting(payload);
    onSaved?.();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-card meeting-modal-card">
        <h2>יצירת פגישה</h2>

        {loadError && <div className="error-message">{loadError}</div>}

        <div className="meeting-form-grid">
          <label>
            קוד לקוח
            <input
              value={form.customerId}
              placeholder="הקלד קוד לקוח"
              onChange={(e) => setForm({ ...form, customerId: e.target.value })}
            />
          </label>

          <label>
            סטטוס
            <input
              value={form.status}
              placeholder="סטטוס הפגישה"
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            />
          </label>

          <label className="full-width">
            תיאור
            <input
              value={form.description}
              placeholder="תיאור קצר של הפגישה"
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </label>
        </div>

        <div className="availability-panel">
          <div className="availability-header">
            <div>
              <div className="availability-title">בחר תאריך</div>
              <div className="availability-summary">
                בחר/י את הדרך הנוחה לך:
              </div>
            </div>
          </div>

          <div className="mode-toggle">
            <button
              type="button"
              className={`secondary-btn ${mode === "nearest" ? "active-mode" : ""}`}
              onClick={() => setMode("nearest")}
            >
              תאריך קרוב פנוי
            </button>
            <button
              type="button"
              className={`secondary-btn ${mode === "custom" ? "active-mode" : ""}`}
              onClick={() => setMode("custom")}
            >
              תאריך אישי
            </button>
          </div>

          {mode === "nearest" && (
            <div className="availability-summary">
              {nearestResult ? (
                <>
                  <strong>התאריך הקרוב ביותר:</strong> {nearestResult.date}
                  <br />
                  <strong>הסלוט הראשון הפנוי:</strong> {nearestResult.slot.label}
                </>
              ) : (
                <span>{modeError || "מחפש תאריכים פנויים..."}</span>
              )}
            </div>
          )}

          <label>
            תאריך
            <input
              type="date"
              value={form.date}
              onChange={(e) => {
                setForm({ ...form, date: e.target.value });
                if (mode === "nearest") setMode("custom");
              }}
              readOnly={mode === "nearest"}
            />
          </label>
        </div>

        <div className="availability-panel" style={{ marginTop: 16 }}>
          <div className="availability-header">
            <div className="availability-title">בחר שעה פנויה (90 דקות)</div>
            {form.date && <div className="availability-title" style={{ fontSize: "12px", color: "#64748b" }}>תאריך: {form.date} • סלוטים: {slots.length}</div>}
          </div>

          {!form.date && (
            <div className="availability-summary">בחר תאריך כדי להציג סלוטים פנויים</div>
          )}

          {form.date && slots.length === 0 && (
            <div className="availability-summary">אין סלוטים פנויים לתאריך זה. נסה תאריך אחר או תאריכים קרובים.</div>
          )}

          <CalendarSlots
            slots={slots}
            selected={selectedSlot}
            onSelect={setSelectedSlot}
          />
        </div>

        <div className="modal-actions">
          <button
            onClick={save}
            disabled={!selectedSlot || !form.customerId || !form.date}
          >
            שמירה
          </button>
          <button type="button" onClick={onClose}>
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
}
