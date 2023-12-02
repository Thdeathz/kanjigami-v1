import React, { ReactNode } from 'react'

type PropsType = {
  columns: {
    title: string
    dataIndex: string
    render?: (value: any, record: any) => ReactNode
  }[]
  dataSources: {
    [key: string]: ReactNode
  }[]
}

function Table({ columns, dataSources }: PropsType) {
  return (
    <table className="table w-full">
      <thead className="table-header-group align-middle">
        <tr className="table-row bg-table-header-light dark:bg-table-header-dark">
          <th className="px-6 py-2.5 font-semibold">Index</th>
          {columns.map(column => (
            <th key={column.dataIndex} className="px-12 py-2.5 font-semibold">
              {column.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="table-row-group align-middle">
        {dataSources.map((row, index) => (
          <tr
            key={`status-row-${index}`}
            className={`font-medium text-text-secondary-light dark:text-text-secondary-dark ${
              index % 2 !== 0 && 'bg-table-header-light dark:bg-table-header-dark'
            }`}
          >
            <td className="w-[3rem] px-2.5 text-center">
              <p className="">#{index + 1}</p>
            </td>
            {columns.map((column, index) => (
              <td key={`status-column-${index}`} className="px-2.5">
                {column.render ? column.render(row[column.dataIndex], row) : row[column.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
