
import React, { useEffect, useState } from "react";
import Button from "../base/Button";
import Input from "../base/Input";
import useForm from "@/hooks/useForm";
import { TASK_STATUS } from "../../utils/constants";
import Select from "../base/Select";

const initialState = { title: "", description: "", status: "to_do" };

const TaskForm = ({ onSave, task, onCancel }) => {
  const { values, handleChange, handleResetToValues } = useForm(task || initialState);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!values.title.trim() || !values.description.trim()) return;

    onSave(values);
		handleResetToValues(initialState);
	};

  useEffect(() => {
    handleResetToValues(task || initialState);
  }, [task])

	return (
		<form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2 p-4 bg-gray-200 rounded max-w-full w-3xl">
      <h3 className="font-semibold">{task ? 'Editar tarea' : 'Crear tarea'}</h3>
			<div className="flex flex-col gap-2 mb-2">
				<Input
					id="title"
					placeholder="Título"
          label="Título:"
					value={values.title}
					onChange={handleChange}
					required
				/>
				<Input
					id="description"
					placeholder="Descripción"
          label="Descripción:"
					value={values.description}
					onChange={handleChange}
					required
				/>
        <Select label="Estado:" id="status" value={values.status} onChange={handleChange}>
          {
            Object.keys(TASK_STATUS).map(status => {
              return <option key={status} value={status}>{TASK_STATUS[status]}</option>
            })
          }
        </Select>
			</div>
			<div className="flex gap-2">
				<Button type="submit">
					{task ? "Actualizar" : "Crear"}
				</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
			</div>
		</form>
	);
};

export default TaskForm;
