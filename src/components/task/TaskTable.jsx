import React from "react";

const TaskTable = ({ children }) => (
  <table className="max-w-full w-3xl border border-gray-200 rounded">
    <thead>
      <tr className="bg-gray-100 text-left">
        <th className="px-4 py-2">Título</th>
        <th className="px-4 py-2">Descripción</th>
        <th className="px-4 py-2">Estado</th>
        <th className="px-4 py-2">Acciones</th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

export default TaskTable;
