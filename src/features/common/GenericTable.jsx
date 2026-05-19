import React, { useMemo, useState } from "react";
import "../styles/generic-table.css";

const getValue = (row, path) => {
  if (!path) return "";
  return path.split(".").reduce((current, key) => {
    if (current == null) return "";
    return current[key];
  }, row);
};

const compareValues = (a, b) => {
  if (a === b) return 0;
  if (a == null) return -1;
  if (b == null) return 1;

  const aString = String(a).toLowerCase();
  const bString = String(b).toLowerCase();

  if (!Number.isNaN(Number(a)) && !Number.isNaN(Number(b))) {
    return Number(a) - Number(b);
  }

  if (aString < bString) return -1;
  if (aString > bString) return 1;
  return 0;
};

export default function GenericTable({
  data = [],
  columns = [],
  rowKey = "id",
  filterable = false,
  searchFields = [],
  filterPlaceholder = "חיפוש...",
  onRefresh,
  actions = [],
  emptyText = "אין נתונים להצגה",
  className = "table",
  noHeader = false,
  rowClassName,
}) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [refreshing, setRefreshing] = useState(false);

  const normalizeSearchValue = (value) =>
    String(value ?? "").toLowerCase();

  const sortedData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    let filtered = data;

    if (filterable && search.trim()) {
      const normalized = search.trim().toLowerCase();
      filtered = data.filter((row) =>
        searchFields.some((field) => {
          if (typeof field === "function") {
            return normalizeSearchValue(field(row)).includes(normalized);
          }
          return normalizeSearchValue(getValue(row, field)).includes(normalized);
        })
      );
    }

    if (!sortConfig.key) return filtered;

    return [...filtered].sort((a, b) => {
      const aValue = getValue(a, sortConfig.key);
      const bValue = getValue(b, sortConfig.key);
      const result = compareValues(aValue, bValue);
      return sortConfig.direction === "asc" ? result : -result;
    });
  }, [data, filterable, search, searchFields, sortConfig]);

  const handleSort = (column) => {
    if (!column.sortable) return;
    setSortConfig((current) => {
      if (current.key === column.field) {
        return {
          key: column.field,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: column.field, direction: "asc" };
    });
  };

  const handleRefresh = async () => {
    if (!onRefresh) return;
    setRefreshing(true);
    try {
      const result = onRefresh();
      if (result && typeof result.then === "function") {
        await result;
      }
    } finally {
      setRefreshing(false);
    }
  };

  const renderCell = (row, column) => {
    if (typeof column.render === "function") {
      return column.render(row);
    }
    return getValue(row, column.field);
  };

  const rowIdentifier = (row, index) => {
    const value = getValue(row, rowKey);
    return value != null ? value : index;
  };

  const hasActions = actions && actions.length > 0;

  return (
    <div className="generic-table">
      {(filterable || onRefresh) && (
        <div className="generic-table-toolbar">
          {filterable && (
            <input
              className="generic-table-search"
              value={search}
              placeholder={filterPlaceholder}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          {onRefresh && (
            <button
              className="generic-table-refresh"
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <span className="refresh-icon">↻</span>
              {refreshing ? " טוען..." : " רענן"}
            </button>
          )}
        </div>
      )}

      {!Array.isArray(data) ? (
        <div className="generic-table-empty">{emptyText}</div>
      ) : (
        <div className="generic-table-wrapper">
          {refreshing && (
            <div className="generic-table-loading-overlay">
              <div className="generic-table-spinner" />
              <span>טוען...</span>
            </div>
          )}
          <table className={className}>
            {!noHeader && (
              <thead>
              <tr>
                {columns.map((column) => {
                  const isActive = column.sortable && sortConfig.key === column.field;
                  const icon = isActive
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : "↕";

                  return (
                    <th
                      key={column.key || column.field || column.header}
                      className={column.sortable ? `sortable${isActive ? " active" : ""}` : ""}
                      onClick={() => handleSort(column)}
                    >
                      {column.header}
                      {column.sortable && (
                        <span className="sort-indicator">{icon}</span>
                      )}
                    </th>
                  );
                })}
                {hasActions && <th>פעולות</th>}
              </tr>
            </thead>
          )}

          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, index) => {
                const rowClass =
                  typeof rowClassName === "function"
                    ? rowClassName(row, index)
                    : rowClassName || "";

                return (
                  <tr key={rowIdentifier(row, index)} className={rowClass}>
                    {columns.map((column) => (
                      <td key={column.key || column.field || String(index)}>
                        {renderCell(row, column)}
                      </td>
                    ))}
                    {hasActions && (
                      <td className="generic-table-actions-cell">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            type="button"
                            className={action.className || "generic-table-action"}
                            onClick={() => action.onClick(row)}
                          >
                            {action.label}
                          </button>
                        ))}
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length + (hasActions ? 1 : 0)}>
                  <div className="generic-table-empty generic-table-empty-with-icon">
                    <span className="empty-icon">📭</span>
                    <span>{emptyText}</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )}
    </div>
  );
}
