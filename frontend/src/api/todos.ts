import api from "./axios";

export const getTodosAPI = ()=> api.get("/api/todos");
export const createTodoAPI = (data: any) => api.post("/api/todos", data);
export const updateTodoAPI = (id: string, data: any) => api.patch(`/api/todos/${id}`, data);
export const deleteTodoAPI = (id: string)=> api.delete(`/api/todos/${id}`);
