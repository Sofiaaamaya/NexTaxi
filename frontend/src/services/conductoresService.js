import axios from '@/lib/axios';

export const getConductores = async () => {
  const res = await axios.get('/conductores');
  return res.data;
};

export const getConductor = async (id) => {
  const res = await axios.get(`/conductores/${id}`);
  return res.data;
};

export const createConductor = async (data) => {
  const res = await axios.post('/conductores', data);
  return res.data;
};

export const updateConductor = async (id, data) => {
  const res = await axios.put(`/conductores/${id}`, data);
  return res.data;
};

export const deleteConductor = async (id) => {
  const res = await axios.delete(`/conductores/${id}`);
  return res.data;
};
