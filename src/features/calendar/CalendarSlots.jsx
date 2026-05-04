import React from "react";

export default function CalendarSlots({
  slots,
  selected,
  onSelect
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {slots.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s)}
          style={{
            padding: 10,
            border: selected === s ? "2px solid green" : "1px solid gray",
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