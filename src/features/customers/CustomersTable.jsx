import React from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "../common/GenericTable";
import "../styles/customers.css";

export default function CustomersTable({ data, highlightCustomerId, onEdit, onDelete, onEmail, onRefresh }) {
  const navigate = useNavigate();
  const columns = [
    { header: "קוד לקוח", field: "customerId", sortable: true },
    { header: "שם פרטי", field: "firstName", sortable: true },
    { header: "שם משפחה", field: "lastName", sortable: true },
    { header: "אימייל", field: "email", sortable: true },
    { header: "טלפון", field: "phone", sortable: true },
    { header: "כתובת", field: "address", sortable: true },
  ];

  const actions = [
    {
      label: "הצג פגישות",
      onClick: (row) =>
        navigate("/meetings", {
          state: {
            customerFilter: row.customerId,
            customerName: `${row.firstName} ${row.lastName}`,
          },
        }),
      className: "generic-table-action",
    },
    {
      label: "שליחת מייל",
      onClick: onEmail,
      className: "generic-table-action",
      visible: Boolean(onEmail),
    },
    { label: "עריכה", onClick: onEdit, className: "edit-btn" },
    { label: "מחיקה", onClick: onDelete, className: "delete-btn" },
  ].filter((action) => action.visible !== false);

  return (
    <GenericTable
      data={data}
      columns={columns}
      rowKey="customerId"
      filterable
      searchFields={["customerId", "firstName", "lastName", "email", "phone", "address"]}
      filterPlaceholder="חיפוש לקוח..."
      onRefresh={onRefresh}
      actions={actions}
      rowClassName={(row) =>
        row.customerId === highlightCustomerId ? "highlighted-row" : ""
      }
      emptyText="לא נמצאו לקוחות"
    />
  );
}
