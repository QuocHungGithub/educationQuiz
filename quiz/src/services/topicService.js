import { get } from "../utils/request"

export const TopicList = async() => {
        const result = await get("topics")
        return result
}
export const Topic = async(id) => {
        const result = await get(`topics/${id}`)
        return result
}