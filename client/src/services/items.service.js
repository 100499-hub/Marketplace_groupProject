import axios from 'axios';

const ITEM_API = axios.create({
    baseURL: 'http://localhost:8000/v1/items',
    withCredentials: true
});

export const getAllItems   = () => ITEM_API.get('/').then(r => r.data);
export const createItem    = data => ITEM_API.post('/', data).then(r => r.data);
export const updateItem    = (id, data) => ITEM_API.put(`/${id}`, data).then(r => r.data);
export const deleteItem    = id => ITEM_API.delete(`/${id}`);
export const buyItem       = id => ITEM_API.post(`/${id}/buy`);
