import React from "react";
import GenericTable from "../common/GenericTable";
import "../styles/weekly.css";

const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "מוצאי שבת"];

export default function WeeklyTable({ data = [], onEdit, onDelete, onRefresh }) {
  const columns = [
    {
      header: "יום",
      field: "dayOfWeek",
      sortable: true,
      render: (row) => days[row.dayOfWeek] || "-",
    },
    { header: "משעה", field: "fromHour", sortable: true },
    { header: "עד שעה", field: "toHour", sortable: true },
  ];

  const actions = [
    { label: "עריכה", onClick: onEdit, className: "edit-btn" },
    { label: "מחיקה", onClick: (row) => onDelete(row.id), className: "delete-btn" },
  ];

  return (
    <GenericTable
      data={data}
      columns={columns}
      rowKey="id"
      filterable
      searchFields={["fromHour", "toHour", (row) => days[row.dayOfWeek]]}
      filterPlaceholder="חיפוש זמינות..."
      onRefresh={onRefresh}
      actions={actions}
      emptyText="לא נמצאו נתונים לשבוע"
    />
  );
}
