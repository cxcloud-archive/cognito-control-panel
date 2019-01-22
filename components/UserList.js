import React from "react";
import ReactTable from "react-table";
import Link from "next/link";

const columnFields = ["Username", "name", "email", "custom:ssn"];

const columns = columnFields.map(column => {
  if (column === "Username") {
    return {
      Header: "Username",
      accessor: "Username",
      Cell: ({ value }) => (
        <Link href={`/user/${value}`}>
          <a>{value}</a>
        </Link>
      )
    };
  } else {
    return {
      id: column,
      Header: column,
      // Header: column.replace("custom:", ""),
      accessor: d => d.UserAttributes[column]
    };
  }
});

export default class extends React.Component {
  render() {
    return (
      <div>
        <ReactTable
          data={this.props.users}
          columns={columns}
          className='-striped -highlight'
        />
      </div>
    );
  }
}
