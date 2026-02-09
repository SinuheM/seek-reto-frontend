import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskList from "../../../components/task/TaskList";

const mockFetchTasks = jest.fn();
const mockDeleteTask = jest.fn();
const mockCreateTask = jest.fn();
const mockUpdateTask = jest.fn();

jest.mock("../../../hooks/useTask", () => ({
  __esModule: true,
  default: () => ({
    tasks: mockTasks,
    fetchTasks: mockFetchTasks,
    deleteTask: mockDeleteTask,
    createTask: mockCreateTask,
    updateTask: mockUpdateTask,
    loading: mockLoading,
    error: mockError,
  }),
}));

let mockTasks = [];
let mockLoading = false;
let mockError = null;

describe("TaskList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTasks = [];
    mockLoading = false;
    mockError = null;
  });

  describe("Loading state", () => {
    it("Muestra el mensaje de carga cuando loading es true", () => {
      mockLoading = true;
      render(<TaskList />);
      expect(screen.getByText("Cargando...")).toBeInTheDocument();
    });

    it("Llama a fetchTasks al montar el componente", () => {
      render(<TaskList />);
      expect(mockFetchTasks).toHaveBeenCalledTimes(1);
    });
  });

  describe("Error state", () => {
    it("Muestra el mensaje de error cuando existe un error", () => {
      mockError = "Failed to load tasks";
      render(<TaskList />);
      expect(screen.getByText(mockError)).toBeInTheDocument();
    });
  });

  describe("Tasks display", () => {
    it("Muestra el título de la lista de tareas", () => {
      render(<TaskList />);
      expect(screen.getByText("Tareas")).toBeInTheDocument();
    });

    it("Muestra el botón de crear tarea", () => {
      render(<TaskList />);
      expect(screen.getByRole("button", { name: "Crear tarea" })).toBeInTheDocument();
    });

    it("Muestra las tareas cuando el array de tareas tiene elementos", () => {
      mockTasks = [
        { id: 1, title: "Task 1", description: "Description 1", status: "in_progress" },
        { id: 2, title: "Task 2", description: "Description 2", status: "completed" },
      ];
      render(<TaskList />);
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
      expect(screen.getByText("En progreso")).toBeInTheDocument();
      expect(screen.getByText("Completada")).toBeInTheDocument();
    });
  });

  describe("Create task", () => {
    it("Muestra el formulario cuando se hace clic en el botón de crear tarea", () => {
      render(<TaskList />);
      const createButton = screen.getByRole("button", { name: "Crear tarea" });
      fireEvent.click(createButton);
      expect(screen.getByRole("button", { name: "Crear" })).toBeInTheDocument();
      expect(createButton).not.toBeInTheDocument();
    });

    it("Llama al API de guardar una nueva tarea", async () => {
      mockCreateTask.mockResolvedValue({});
      render(<TaskList />);
      
      fireEvent.click(screen.getByRole("button", { name: "Crear tarea" }));
      
      const titleInput = screen.getByLabelText(/título/i);
      const descriptionInput = screen.getByLabelText(/descripción/i);
      
      fireEvent.change(titleInput, { target: { value: "New Task" } });
      fireEvent.change(descriptionInput, { target: { value: "New Description" } });
      
      fireEvent.click(screen.getByRole("button", { name: "Crear" }));
      
      await waitFor(() => {
        expect(mockCreateTask).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Edit task", () => {
    beforeEach(() => {
      mockTasks = [
        { id: 1, title: "Task 1", description: "Description 1", status: "in_progress" },
      ];
    });

    it("Muestra el formulario con los datos de la tarea al hacer clic en editar", () => {
      render(<TaskList />);
      const editButton = screen.getByRole("button", { name: "Editar" });
      fireEvent.click(editButton);
      
      expect(screen.getByDisplayValue("Task 1")).toBeInTheDocument();
    });

    it("Llama al API de guardar una tarea editada", async () => {
      mockUpdateTask.mockResolvedValue({});
      render(<TaskList />);
      
      fireEvent.click(screen.getByRole("button", { name: "Editar" }));
      
      const titleInput = screen.getByDisplayValue("Task 1");
      fireEvent.change(titleInput, { target: { value: "Updated Task" } });
      
      fireEvent.click(screen.getByRole("button", { name: "Actualizar" }));
      
      await waitFor(() => {
        expect(mockUpdateTask).toHaveBeenCalledWith(1, expect.objectContaining({
          title: "Updated Task",
        }));
      });
    });
  });

  describe("Delete task", () => {
    beforeEach(() => {
      mockTasks = [
        { id: 1, title: "Task 1", description: "Description 1", status: "in_progress" },
      ];
    });

    it("Llama a API de eliminar una tarea al hacer clic en el botón de eliminar", () => {
      render(<TaskList />);
      const deleteButton = screen.getByRole("button", { name: "Eliminar" });
      fireEvent.click(deleteButton);
      
      expect(mockDeleteTask).toHaveBeenCalledWith(1);
    });

    it("Llama a API de eliminar con el id correcto de la tarea", () => {
      mockTasks = [
        { id: 1, title: "Task 1", description: "Description 1", status: "in_progress" },
        { id: 2, title: "Task 2", description: "Description 2", status: "completed" },
      ];
      render(<TaskList />);
      
      const deleteButtons = screen.getAllByRole("button", { name: "Eliminar" });
      fireEvent.click(deleteButtons[1]);
      
      expect(mockDeleteTask).toHaveBeenCalledWith(2);
    });
  });
});