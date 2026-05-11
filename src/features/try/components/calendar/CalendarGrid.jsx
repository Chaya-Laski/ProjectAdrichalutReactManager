import React from "react";

export default function CalendarGrid({
  slots = [],
  selected,
  onSelect,
  nearestSlot
}) {
  if (slots.length === 0) {
    return (
      <div className="empty-slots">
        <div className="empty-icon">📅</div>
        <div>אין שעות זמינות עבור תאריך זה.</div>
        <div>בחר תאריך אחר או בדוק את לוח הזמנים.</div>
      </div>
    );
  }

  return (
    <div className="slots-grid">
      {slots.map((slot, index) => {
        const isSelected = selected?.label === slot.label;
        const isNearest = nearestSlot?.label === slot.label;
        return (
          <button
            key={`${slot.label}-${index}`}
            type="button"
            className={`slot-card ${isSelected ? "selected" : ""} ${isNearest ? "nearest" : ""}`}
            onClick={() => onSelect(slot)}
            aria-pressed={isSelected}
          >
            <div className="slot-time">{slot.label}</div>
            <div className="slot-meta">
              {isSelected ? "נבחר" : isNearest ? "הקרוב ביותר" : "זמין"}
            </div>
          </button>
        );
      })}
    </div>
  );
}