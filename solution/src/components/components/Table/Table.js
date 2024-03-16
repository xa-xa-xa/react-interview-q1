import React from "react";
import "./Table.css"; // Import your CSS

const Table = ({ tableData }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((entry) => (
          <tr key={entry.name + entry.location}>
            <td>{entry.name}</td>
            <td>{entry.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
