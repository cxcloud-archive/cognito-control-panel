import Link from "next/link";
import React from "react";
import ReactTable from "react-table";

const TABLE_COLUMNS = process.env.TABLE_COLUMNS.split(",");

const columns = TABLE_COLUMNS.map((columnName, key) => {
  const column = {
    id: columnName,
    Header: columnName,
    accessor: d =>
      d[columnName] ? d[columnName] : d.UserAttributes[columnName]
  };

  // Add line in the first column
  return key !== 0
    ? column
    : {
        ...column,
        Cell: ({ row, value }) => (
          <Link href={`/user/${row.Username}`}>
            <a>{value}</a>
          </Link>
        )
      };
});

export default ({ users }) => (
  <ReactTable data={users} columns={columns} className='-striped -highlight' />
);
