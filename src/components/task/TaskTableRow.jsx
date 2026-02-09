import React from "react";
import IconDelete from "../base/icon/IconDelete";
import IconEdit from "../base/icon/IconEdit";
import { TASK_STATUS } from "../../utils/constants";

const TaskTableRow = ({ task, onEdit, onDelete }) => {
  return (
  <tr className="border-t">
    <td className="px-4 py-2">{task.title}</td>
    <td className="px-4 py-2">{task.description}</td>
    <td className="px-4 py-2">{ TASK_STATUS[task.status] }</td>
    <td className="px-4 py-2 flex gap-2">
      <button
        className="text-blue-600 hover:text-blue-900 cursor-pointer"
        aria-label="Editar"
        onClick={() => onEdit(task)}
      >
        <IconEdit />
      </button>
      <button
        className="text-red-600 hover:text-red-900 cursor-pointer"
        aria-label="Eliminar"
        onClick={() => onDelete(task.id)}
      >
        <IconDelete />
      </button>
    </td>
  </tr>
)};

export default TaskTableRow;
