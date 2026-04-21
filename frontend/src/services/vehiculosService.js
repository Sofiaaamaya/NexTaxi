import axios from '@/lib/axios';

export const getVehiculos = async () => {
  const res = await axios.get('/vehiculos');
  return res.data;
};
