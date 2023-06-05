import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'
const httpServise = {
  get: axios.get
}

export default httpServise
