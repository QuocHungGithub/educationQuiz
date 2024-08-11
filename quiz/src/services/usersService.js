import {get, post} from '../utils/request';

export const login = async (email, password) => {
   const result = await get(`users/?email=${email}&password=${password}`);
   return result;
};
export const register = async (data) => {
   const result = await post(`users`, data);
   return result;
};
export const checkExits = async (key, value) => {
   const result = await post(`users/?${key}=${value}`);
   return result;
};


