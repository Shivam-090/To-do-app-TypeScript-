import api from "./axios";

export const getTodosAPI = ()=> api.get("/todos");
export const createTodoAPI = (data: any) => api.post("/todos", data);
export const updateTodoAPI = (id: string, data: any) => api.patch(`/todos/${id}`, data);
export const deleteTodoAPI = (id: string)=> api.delete(`/todos/${id}`)