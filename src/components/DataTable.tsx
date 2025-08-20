// src/components/DataTable.tsx
import React, { useState } from "react"

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  selectable?: boolean
  onRowSelect?: (rows: T[]) => void
}

export function DataTable<T extends { id: number }>({
  data,
  columns,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const handleSelectRow = (id: number) => {
    let newSelected: number[]
    if (selectedRows.includes(id)) {
      newSelected = selectedRows.filter((rowId) => rowId !== id)
    } else {
      newSelected = [...selectedRows, id]
    }
    setSelectedRows(newSelected)
    if (onRowSelect) {
      onRowSelect(data.filter((row) => newSelected.includes(row.id)))
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl shadow mx-auto w-11/12 my-8">
      <table className="min-w-full border-collapse">
        {/* Table Head */}
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            {selectable && <th className="p-3 text-left">Select</th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {selectable && (
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="p-3 text-sm text-gray-800 dark:text-gray-100"
                >
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
