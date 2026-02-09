"use client";

import React, { useEffect, useState } from "react";
import useTask from "../../hooks/useTask";
import TaskTable from "./TaskTable";
import TaskTableRow from "./TaskTableRow";
import TaskForm from "./TaskForm";
import Button from "../base/Button";

const TaskList = () => {
  const {
    tasks,
    fetchTasks,
    deleteTask,
    createTask,
    updateTask,
    loading,
    error,
  } = useTask();
  const [creating, setCreating] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const showForm = creating || selectedTask;

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = () => {
    setCreating(true);
    setSelectedTask(null);
  };

  const handleEdit = (task) => setSelectedTask(task);

  const handleCancelForm = () => {
    setSelectedTask(null);
    setCreating(false);
  };

  const handleSave = async (data) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, data);
      setSelectedTask(null);
    } else {
      await createTask(data);
      setCreating(false);
    }
  };

  return (
    <div className="max-w-full w-4xl mx-auto mt-4 bg-gray-50 py-3 px-4 rounded">
      <h2 className="text-xl font-bold mb-4">Tareas</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {showForm && (
        <TaskForm
          onSave={handleSave}
          task={selectedTask}
          onCancel={handleCancelForm}
        />
      )}
      {!showForm && (
        <>
          <Button className="mb-3" onClick={handleCreate}>
            Crear tarea
          </Button>
          <TaskTable>
            {tasks.map((task) => (
              <TaskTableRow
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={deleteTask}
              />
            ))}
          </TaskTable>
        </>
      )}
    </div>
  );
};

export default TaskList;
