import axios from 'axios'


const api=axios.create({
    // baseURL:process.env.REACT_APP_API_URL,
    baseURL:'https://filter-ara2.onrender.com',
    // baseURL:'http://localhost:5000',
    withCredentials: true,
    headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
    }
})

export const getData=(data)=>api.post('/getData',data)
export const getAllData=()=>api.get('/getAlldata')
export const downloadCSV=(data)=>api.post('/download',data)

export default api;

