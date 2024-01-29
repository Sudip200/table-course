import React from "react";

const Table = ({ filteredUsers}) => {
    return (
        <div>
    <table className="mt-4 w-full border-collapse">
    <thead>
      <tr>
        <th className="border p-2">Name</th>
        <th className="border p-2">Email</th>
        <th className="border p-2">Type</th>
      </tr>
    </thead>
    <tbody>
      {filteredUsers.map((user) => (
        <tr key={user.email}>
          <td className="border p-2">{user.name}</td>
          <td className="border p-2">{user.email}</td>
          <td className="border p-2">{user.type}</td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>);

}
export default Table;