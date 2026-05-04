import React from "react";

export default function CalendarGrid({
  slots = [],
  selected,
  onSelect
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 10
    }}>
      {slots.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s)}
          style={{
            padding: 12,
            border: selected === s ? "2px solid green" : "1px solid #ccc",
            background: selected === s ? "#eaffea" : "white",
            cursor: "pointer"
          }}
        >
          {s.label}
        </button>
       
      ))}
    
    </div>
  );
}