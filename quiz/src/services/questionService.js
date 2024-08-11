import {get} from '../utils/request'
export const question = async(topicId) => {
    const result = await get(`questions?topicId=${topicId}`)
    return result
    
}
export const Answer = async(id) => {
    const result = await get(`answers/${id}`)
    return result
    
}