import { useState } from "react";
import useAuth from "./useAuth";

const API_URL = "/api/tasks";

const useTask = () => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
  const { getAccessToken } = useAuth()
	
	const fetchTasks = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(API_URL, { 
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
			const data = await res.json();
			setTasks(data);
		} catch (err) {
			setError("Error al obtener tareas");
		} finally {
			setLoading(false);
		}
	};

	const createTask = async (task) => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(API_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json", Authorization: `Bearer ${getAccessToken()}` },
				body: JSON.stringify(task),
			});
			const newTask = await res.json();
			setTasks((prev) => [...prev, newTask]);
			return newTask;
		} catch (err) {
			setError("Error al crear tarea");
		} finally {
			setLoading(false);
		}
	};

	const updateTask = async (id, updates) => {
		setLoading(true);
		setError(null);
		try {
			await fetch(API_URL, {
				method: "PUT",
				headers: { "Content-Type": "application/json", Authorization: `Bearer ${getAccessToken()}` },
				body: JSON.stringify({ id, ...updates }),
			});
			setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)));
		} catch (err) {
			setError("Error al actualizar tarea");
		} finally {
			setLoading(false);
		}
	};

	const deleteTask = async (id) => {
		setLoading(true);
		setError(null);
		try {
			await fetch(API_URL, {
				method: "DELETE",
				headers: { "Content-Type": "application/json", Authorization: `Bearer ${getAccessToken()}` },
				body: JSON.stringify({ id }),
			});
			setTasks((prev) => prev.filter((task) => task.id !== id));
		} catch (err) {
			setError("Error al eliminar tarea");
		} finally {
			setLoading(false);
		}
	};

	return {
		tasks,
		loading,
		error,
		fetchTasks,
		createTask,
		updateTask,
		deleteTask,
	};
};

export default useTask