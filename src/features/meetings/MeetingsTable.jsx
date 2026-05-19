import React from "react";
import { Link } from "react-router-dom";
import GenericTable from "../common/GenericTable";
import "../styles/meetings.css";

export default function MeetingsTable({ data = [], onEdit, onDelete, onRefresh }) {
  const columns = [
    {
      header: "לקוח",
      field: "customerName",
      sortable: true,
      render: (row) => (
        <Link
          to="/clients"
          state={{ selectedCustomerId: row.customerId }}
          className="meeting-customer-link"
        >
          {row.customerName}
        </Link>
      ),
    },
    { header: "תאריך", field: "date", sortable: true },
    { header: "משעה", field: "fromHour", sortable: true },
    { header: "עד שעה", field: "toHour", sortable: true },
    {
      header: "סטטוס",
      field: "status",
      sortable: true,
      render: (row) => (row.status ? "בוצע" : "ממתין"),
    },
  ];

  const actions = [
    { label: "עריכה", onClick: onEdit, className: "edit-btn" },
    {
      label: "מחיקה",
      onClick: (row) => onDelete(row.meetingId),
      className: "delete-btn",
    },
  ];

  return (
    <GenericTable
      data={data}
      columns={columns}
      rowKey="meetingId"
      filterable
      searchFields={["customerName", "date", "fromHour", "toHour"]}
      filterPlaceholder="חיפוש לפי שם לקוח או תאריך..."
      onRefresh={onRefresh}
      actions={actions}
      emptyText="לא נמצאו פגישות"
    />
  );
}
