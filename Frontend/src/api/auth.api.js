import { api } from './axios'

export const login = async (credentials) => {
 try{
 const response = await api.post("/api/auth/login", credentials, { skipRefresh: true });
  return response.data;
 }catch (error) {  
    log(error)
 }
}

export const register = async (details) => {
  try{
    const response = await api.post("/api/auth/register", details, { skipRefresh: true });
    return response.data;
  }catch (error) {
    log(error);
  }
}

export const logout = async () => {
  try{
    const response = await api.post("/api/auth/logout", {}, { skipRefresh: true });
    return response.data;
  }catch (error) {
    log(error);
  }
}

// implement refresh function
export const refresh = async () => {
  try{
    const response = await api.post("/api/auth/refresh",);
    return response.data;
  }catch (error) {
    log(error);
  }
}
