import React from "react";

export default function CalendarSlots({
  slots,
  selected,
  onSelect
}) {
  if (!slots || slots.length === 0) {
    return (
      <div style={{ padding: "12px", color: "#64748b", fontSize: "14px" }}>
        אין סלוטים פנויים
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {slots.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s)}
          style={{
            padding: "12px 16px",
            border: selected === s ? "2px solid #14b8a6" : "1px solid #cbd5e1",
            background: selected === s ? "#f0fdfb" : "#f8fafc",
            cursor: "pointer",
            minWidth: "140px",
            whiteSpace: "nowrap",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: selected === s ? "600" : "500",
            color: "#0f172a",
            transition: "all 0.2s ease"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span>🕐 {s.label || "אין שעה"}</span>
            {s.start !== undefined && s.end !== undefined && (
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                {Math.round((s.end - s.start) / 60)} דקות
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

