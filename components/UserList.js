import React from "react";
import ReactTable from "react-table";
import Router from "next/router";

const columnValues = ["Username", "name", "email", "custom:ssn"];

const columns = columnValues.map(column => {
  if (column === "Username") {
    return {
      Header: "Username",
      accessor: "Username"
    };
  } else {
    return {
      id: column,
      Header: column,
      // Header: column.replace("custom:", ""),
      accessor: d => {
        const obj = d.Attributes.find(item => item.Name === column);
        return obj ? obj.Value : null;
      }
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
          getTrProps={(state, rowInfo) => ({
            onClick: () => {
              Router.push(`/user/${rowInfo.row.Username}`);
            }
          })}
        />
      </div>
    );
  }
}
