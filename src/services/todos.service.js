import httpServise from "./http.service"
const todosEndepoint = 'todos/'
const todosService = {
    fetch: async () => {
        const { data } = await httpServise.get(todosEndepoint,{
           params: {
            _page: 1,
            _limit: 10
           } 
        })
        return data
    },
    create: async (payload) => {
        const { data } = await httpServise.post(todosEndepoint, payload)
        return data 
    }
}

export default todosService