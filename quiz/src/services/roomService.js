import {post, get, del, patch} from '../utils/request'

   const roomService = async (data) =>{
    const result = await post("rooms", data)
    return result;
}

export const getListRoom = async () =>{
    const result = await get("rooms",)
    return result;
}
export const deleteRoom = async (id) =>{
    const result = await del(`rooms/${id}`);
    return result;
}
export const updateRoom = async(id, data) =>{
    const result = await patch(`rooms/${id}`, data);
    return result;
}
export default roomService;