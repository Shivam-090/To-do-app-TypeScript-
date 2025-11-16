import api from "./axios";

export const signupAPI = (data: any)=> api.post("/api/auth/signup", data);
export const loginAPI = (data: any)=> api.post("/api/auth/login", data);

export const forgotAPI = (data: any)=> api.post("/api/auth/forgot-password", data);
export const resetAPI = (data: any)=> api.post("/api/auth/reset-password", data);
