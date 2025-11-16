import api from "./axios";

export const signupAPI = (data: any)=> api.post("/auth/signup", data);
export const loginAPI = (data: any)=> api.post("/auth/login", data);

export const forgotAPI = (data: any)=> api.post("/auth/forgot-password", data);
export const resetAPI = (data: any)=> api.post("/auth/reset-password", data);